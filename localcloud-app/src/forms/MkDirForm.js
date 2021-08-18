import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Loading } from '../components/Loading'
import { DirContext } from '../context/DirContext'
import api from '../helpers/api'
//import { apiFetch } from '../helpers/apiFetch'

export const MkDirForm = ({ reload, path }) => {

    const [name, setName] = useState('');
    const [creating, setCreating] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const onChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value);
    }

    const { openAlert } = useContext(DirContext);

    const onSubmit = async (e) => {

        if (path === undefined || path === 'undefined') path = "";

        e.preventDefault();

        setCreating(true);

        api.mkDir(path, name).then((response) => {
            setAlert(response)
            console.log(alert);
        });

        reload();

        setCreating(false);
        setShowAlert(true);

    }

    return (
        <>

            {!creating && !alert
                ? (<Loading title='Creating directory...' text='Creating directory...' />)
                : <></>
            }

            {openAlert(showAlert, setShowAlert, alert)}

            <Form onSubmit={(e) => onSubmit(e)}>

                <Form.Group controlId='mkdir'>

                    <Form.Label> Name </Form.Label>

                    <Form.Control
                        type='text'
                        className='mb-2'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => onChange(e)}
                    />

                    <Button size='lg' variant='success' type='submit'>
                        Create
                    </Button>

                </Form.Group>

            </Form>

        </>
    )
}


