import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillFolderAdd } from 'react-icons/ai';
import { BsArrow90DegUp } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { DropFilesForm } from '../forms/DropFilesForm';
import { FilesForm } from '../forms/FilesForm';
import { MkDirForm } from '../forms/MkDirForm';
import { PathForm } from '../forms/PathForm';
//import { apiFetch } from '../helpers/apiFetch';
import { Dirent } from './Dirent';
import { FormModal } from './FormModal';
import { Loading } from './Loading';
import api from '../helpers/api';

export const Dir = (props) => {

    const rowProps = { className: 'mx-auto mb-3' };
    const iconStyle = { color: '#FFF', size: 24, className: 'ml-2' };

    const [loading, setLoading] = useState(true);
    const [dir, setDir] = useState({});


    const { path: pathUrl } = useParams();
    const [url] = useState(pathUrl);

    let path = props.match.params.path;

    const reload = () => {
        setLoading(true);
        loadContent();
    }

    const loadContent = () => {

        if (path === undefined || path === 'undefined') path = "";

        //apiFetch(`content/${path}`).then(data => setDir(data));
        api.getContent(path).then(data => setDir(data));
        setLoading(false);
    }

    useEffect(() => {
        if (path === undefined || path === 'undefined') path = "";

        /* apiFetch(`content/${path}`).then(data => setDir(data));
        setLoading(false); */

        api.getContent(path).then(data => {
            setDir(data)
        });
        setLoading(false);

    }, [path]);

    const fillEntries = () => {


        /*        if (loading) {
                   (<Loading text="Loading..." />)
               } */

        loading && <Loading text="Loading..." />

        let content;

        if (dir.content) {
            content = dir.content;
            console.log(content)
        } else {
            content = {
                files: ["prueba.txt"],
                directories: ["prueba"]
            }
        }

        const directories = [
            < Dirent
                name='Up a dir...'
                key='parent'
                isDirectory
                parentDirectory
                pathUrl={url}
            />
        ];

        /* content.directories.forEach((dir) =>
        directories.push(<Dirent name={dir} isDirectory key={dir} pathUrl={url} />)
        );
        
        const files = content.files.map((file) => (
            <Dirent name={file} key={file} pathUrl={url} />
            )); */

        content.directories.forEach((dir) =>
            directories.push
                (< Dirent
                    name={dir}
                    key={dir}
                    isDirectory
                    pathUrl={url}
                />)
        );

        const files = content.files.map((file) => (
            <Dirent name={file} key={file} pathUrl={url} />
        ));

        return [...directories, ...files];

    }

    return (

        <>

            <Container>
                <Row {...rowProps}>
                    <Col>
                        <PathForm path={url} />
                    </Col>
                </Row>
                <h1 className="text-center">Content</h1>

                <Row {...rowProps}>
                    <Col>
                        <DropFilesForm uploadTo={url} reload={() => reload()} />
                    </Col>
                </Row>

                <Row {...rowProps}>
                    <Col>
                        <FormModal
                            btn="primary"
                            title="Upload Files"
                            icon={<BsArrow90DegUp {...iconStyle} />}
                        >
                            <FilesForm uploadTo={url} reload={() => reload()} />
                        </FormModal>
                    </Col>
                </Row>

                <Row {...rowProps}>
                    <Col>
                        <FormModal
                            btn="success"
                            title="Create Directory"
                            icon={<AiFillFolderAdd {...iconStyle} />}
                        >
                            <MkDirForm path={url} reload={() => reload()} />
                        </FormModal>
                    </Col>
                </Row>

                <Row {...rowProps}> {fillEntries()} </Row>

            </Container>
        </>
    )
}
