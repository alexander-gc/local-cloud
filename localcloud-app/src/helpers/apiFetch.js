import fetch from "node-fetch";

const urlAPi = 'http://localhost:5000';

export const apiFetch = async (end, data, method = 'GET') => {

    let body;
    let resp;
    let urlAbsolute = `${urlAPi}/${end}`

    if (method === 'GET') {
        body = await fetch(urlAbsolute);
    } else {
        body = await fetch(urlAbsolute, {
            method,
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)

        });

    }

    resp = await body.json();

    return resp;

}



