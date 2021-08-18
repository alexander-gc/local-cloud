import React, { createContext } from 'react'
import { Alert } from '../components/Alert';
import api from '../helpers/api';

export const DirContext = createContext();

export const DirProvider = ({ children }) => {

    const openAlert = (showAlert, setShowAlert, alert) => {
        if (showAlert) {
            return (
                <Alert alert={alert} onClose={() => setShowAlert(false)} />
            );
        };

    };

    const loadContent = (path, setDir, setLoading) => {
        if (path === undefined || path === 'undefined') path = "";

        api.getContent(path).then(data => setDir(data));
        setLoading(false);
    }

    const onChange = (e, setState) => {
        if (e.target.files) {
            setState(e.target.files);
        } else {
            console.log(e.target.value);
            setState(e.target.value);
        }
    };

    return (
        <DirContext.Provider value={{
            openAlert,
            loadContent,
            onChange
        }}>
            {children}
        </DirContext.Provider>
    )

};
