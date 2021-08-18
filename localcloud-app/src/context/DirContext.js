import React, { createContext, useState } from 'react'
import { Alert } from '../components/Alert';

export const DirContext = createContext();

export const DirProvider = ({ children }) => {

    const openAlert = (showAlert, setShowAlert, alert) => {

        if (showAlert) {
            return (
                <Alert
                    alert={alert}
                    onClose={() => setShowAlert(false)}
                />
            );
        };

    };

    return (
        <DirContext.Provider value={{
            openAlert
        }}>
            {children}
        </DirContext.Provider>
    )

};
