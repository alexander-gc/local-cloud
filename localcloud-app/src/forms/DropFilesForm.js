import React, { useState } from 'react'
//import Jumbotron from 'react-bootstrap';
import { Alert } from '../components/Alert';
import { apiFetch } from '../helpers/apiFetch';
import Jumbotron, { Card } from 'react-bootstrap';
import api from '../helpers/api';

export const DropFilesForm = ({ reload, uploadTo }) => {

    const [uploading, setUploading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState({});

    const openAlert = (alert) => {
        if (showAlert) {
            return (
                <Alert
                    alert={alert}
                    onClose={() => setShowAlert(false)}
                />
            );
        };
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        console.log(e);

        if (!e.dataTransfer.files.length || uploading) {
            return
        };

        setUploading(true);

        const data = new FormData();
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            data.append('file', e.dataTransfer.files[i]);
        }

        //response = await api.uploadFiles(uploadTo || '', data);
        //response = await apiFetch(uploadTo || '', data, 'POST');

        api.uploadFiles(uploadTo, data).then((response) => {
            console.log(response);
            setAlert(response)
        });

        reload();

        setUploading(false);
        setShowAlert(true);

    }

    const preventAndStop = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <>
            {openAlert(alert)}
            <Card style={{ border: '2px dashed #aaa' }} className="m-0 p-0">
                <p
                    onDrop={(e) => onSubmit(e)}
                    onDragEnter={(e) => preventAndStop(e)}
                    onDragLeave={(e) => preventAndStop(e)}
                    onDragOver={(e) => preventAndStop(e)}
                    style={{
                        color: '#777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '120px',
                    }}
                    className="m-0"
                >

                    {uploading ? 'Uploading file(s)...' : 'Drop File(s) Here to Upload'}


                </p>
            </Card>
        </>
    )
}
