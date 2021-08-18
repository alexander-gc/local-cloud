import axios from 'axios';

//'http://localhost:5000'

class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://192.168.1.69:5000'
        });
    }

    async apiCall(request) {
        try {
            return (await request()).data;
        } catch (e) {
            console.log(e);
            return e.response.data;
        }
    }

    async getContent(path) {
        return await this.apiCall(() => this.api.get(`/content/${path}`));
    }

    async uploadFiles(path, files) {
        return await this.apiCall(() => this.api.post(`/upload/${path}`, files));
    }

    async mkDir(path, name) {
        return await this.apiCall(() => this.api.post(`/mkdir/${path}`, { name }));
    }
}

const api = new Api();
export default api;