import React from 'react';
import { Alert as Aler } from 'react-bootstrap';

export const Alert = ({ alert, onClose }) => {

    console.log(alert);

    return (
        <Aler
            variant={alert.success === true ? 'success' : 'danger'}
            onClose={onClose}
            dismissible
        >

            {alert.msg ? alert.msg : alert}

        </Aler>

    )
}
