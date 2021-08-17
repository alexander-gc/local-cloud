import React from 'react'
import { Col } from 'react-bootstrap';
import { DirCard } from './DirCard';
import { DirLink } from './DirLink';


export const Dirent = ({ name, isDirectory, parentDirectory, pathUrl }) => {

    if (!pathUrl && parentDirectory) {
        return <></>;
    }

    return (
        <Col lg={4} xl={3} className="mt-2">

            <DirLink
                {...isDirectory}
                {...parentDirectory}
                pathUrl={pathUrl}
                name={name}
            >

                <DirCard
                    {...isDirectory}
                    {...parentDirectory}
                    pathUrl={pathUrl}
                    name={name}
                />

            </DirLink>

        </Col >
    );
};



