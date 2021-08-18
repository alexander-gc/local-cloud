import React, { useContext, useState } from 'react'
import { Loading } from '../components/Loading'
//import { apiFetch } from '../helpers/apiFetch'
import api from '../helpers/api'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { DirContext } from '../context/DirContext'

export const FilesForm = ({ uploadTo, reload }) => {

    console.log(uploadTo);

    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState();

    const { openAlert, onChange } = useContext(DirContext);

    const onSubmit = (e) => {

        e.preventDefault();

        setUploading(true);

        console.log(uploading);

        const data = new FormData();
        for (const file of files) {

            data.append('file', file);
        }

        if (uploadTo === undefined || uploadTo === 'undefined') uploadTo = "";

        api.uploadFiles(uploadTo, data).then((response) => {
            setAlert(response)
        });

        reload();

        setUploading(false)
        setShowAlert(true);

    }

    return (
        <>

            {!uploading && !alert
                ? (<Loading title='Uploading files...' text='Uploading' />)
                : <></>
            }

            {alert && openAlert(showAlert, setShowAlert, alert)}

            <Form className="mb-3" onSubmit={(e) => onSubmit(e)}>

                <Form.Label >Upload File</Form.Label>

                <Form.Control
                    type="file"
                    multiple
                    className='mb-2'
                    onChange={(e) => onChange(e, setFiles)}
                />

                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>

        </>
    );
}
