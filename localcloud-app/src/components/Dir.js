import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillFolderAdd } from 'react-icons/ai';
import { BsArrow90DegUp } from 'react-icons/bs';
import { DropFilesForm } from '../forms/DropFilesForm';
import { FilesForm } from '../forms/FilesForm';
import { MkDirForm } from '../forms/MkDirForm';
import { PathForm } from '../forms/PathForm';
//import { apiFetch } from '../helpers/apiFetch';
import { Dirent } from './Dirent';
import { FormModal } from './FormModal';
import { Loading } from './Loading';
import { DirContext } from '../context/DirContext';

export const Dir = (props) => {

    const rowProps = { className: 'mx-auto mb-3' };
    const iconStyle = { color: '#FFF', size: 24, className: 'ml-2' };

    const [loading, setLoading] = useState(true);
    const [dir, setDir] = useState({});
    const [path] = useState(props.match.params.path);

    const { loadContent } = useContext(DirContext);

    const reload = () => {
        setLoading(true);
        loadContent(path, setDir, setLoading);
    }

    useEffect(() => {
        loadContent(path, setDir, setLoading);
    }, [path, loadContent]);

    const fillEntries = () => {

        loading && (<Loading text="Loading..." />)

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
                pathUrl={path}
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
                    pathUrl={path}
                />)
        );

        const files = content.files.map((file) => (
            <Dirent name={file} key={file} pathUrl={path} />
        ));

        return [...directories, ...files];

    }

    return (

        <>

            <Container>
                <Row {...rowProps}>
                    <Col>
                        <PathForm path={path} />
                    </Col>
                </Row>
                <h1 className="text-center">Content</h1>

                <Row {...rowProps}>
                    <Col>
                        <DropFilesForm uploadTo={path} reload={() => reload()} />
                    </Col>
                </Row>

                <Row {...rowProps}>
                    <Col>
                        <FormModal
                            btn="primary"
                            title="Upload Files"
                            icon={<BsArrow90DegUp {...iconStyle} />}
                        >
                            <FilesForm uploadTo={path} reload={() => reload()} />
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
                            <MkDirForm path={path} reload={() => reload()} />
                        </FormModal>
                    </Col>
                </Row>

                <Row {...rowProps}> {fillEntries()} </Row>

            </Container>
        </>
    )
}
