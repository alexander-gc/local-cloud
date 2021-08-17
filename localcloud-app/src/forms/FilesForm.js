import React, { useState } from 'react'
import { Loading } from '../components/Loading'
import { apiFetch } from '../helpers/apiFetch'
import api from '../helpers/api'
import { Alert } from '../components/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const FilesForm = ({ uploadTo, reload }) => {

    console.log(uploadTo);

    const [files, setFiles] = useState([])
    const [uploading, setUploading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState();

    const onChange = (e) => {

        setFiles(e.target.files);

        /*   if (e.target.files) {
              setFiles(e.target.files);
          } */

    };

    const openAlert = (alertusd) => {
        console.log(alertusd);
        if (showAlert) {
            return (
                <Alert
                    alert={alertusd}
                    onClose={() => setShowAlert(false)} />
            )
        }
    }

    const onSubmit = (e) => {

        e.preventDefault();

        setUploading(true);

        console.log(uploading);

        const data = new FormData();
        for (const file of files) {

            data.append('file', file);
        }

        //response = await apiFetch(uploadTo || '', data, 'POST');

        if (uploadTo === undefined || uploadTo === 'undefined') uploadTo = "";

        api.uploadFiles(uploadTo, data).then((response) => {
            setAlert(response)
            console.log(alert);
        });

        reload();

        setUploading(false)
        setShowAlert(true);

        console.log(uploading);

    }

    return (
        <>

            {!uploading && !alert
                ? (<Loading title='Uploading files...' text='Uploading' />)
                : <></>
            }

            {alert && openAlert(alert)}

            <Form className="mb-3" onSubmit={(e) => onSubmit(e)}>

                <Form.Label >Upload File</Form.Label>

                <Form.Control
                    type="file"
                    multiple
                    className='mb-2'
                    onChange={(e) => onChange(e)}
                />

                <Button variant="primary" type="submit">
                    Upload
                </Button>
            </Form>

        </>
    );
}