const express = require('express');
const { json } = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./server/routes/index');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT | '5000';

        this.server = http.createServer(this.app);
    }

    middlewares() {
        this.app.use(morgan("dev"));
        this.app.use(json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/', routes);
    }

    execute() {
        this.middlewares();

        this.routes();

        this.server.listen(this.port, () => {
            console.log('Listening at port: ' + this.port);
        });
    }

}

module.exports = Server;