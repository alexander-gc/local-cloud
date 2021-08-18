import React, { useContext, useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DirContext } from '../context/DirContext'

export const PathForm = ({ path }) => {

    const [normalPath, setNormalPath] = useState(path)
    const [apiPath, setApiPath] = useState(path)

    const { onChange } = useContext(DirContext);

    useEffect(() => {
        if (apiPath === 'undefined' || apiPath === undefined) {
            setNormalPath('');
            setApiPath('');
        }
    }, [apiPath, normalPath]);

    const transformPath = (path) => {
        setNormalPath(path ? path.replace(/-/g, '/') : '');
        setApiPath(path ? path.replace(/\//g, '-') : '');
    }

    /*  const onChange = (e) => {
         transformPath(e.target.value);
     } */

    return (
        <Form>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Path</Form.Label>
                <Form.Control
                    type="text"
                    className="mb-2"
                    value={normalPath}
                    onChange={(e) => onChange(e, transformPath)}
                /*onChange={(e) => { transformPath(e.target.value) }*/
                />

                <Link to={`/content/${apiPath}`}>

                    <Button size="lg" variant="primary" type="submit">
                        Jump
                    </Button>

                </Link>
            </Form.Group >
        </Form >
    )
}
