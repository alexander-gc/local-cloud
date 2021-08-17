const processPath = require("../utils/path");
const fs = require('fs');
const path = require("path");

const createDir = async (req, res) => {

    try {

        const { body, params } = req;

        const { absolutePath, shortPath } = processPath(params.path);
        const name = body.name;

        if (!name) return res.status(400).send('Name is required');

        const pathDir = path.join(absolutePath, name);
        await fs.mkdirSync(pathDir);

        console.log(pathDir);

        res.status(201).send({ success: true, msg: 'Directory created succesfully', path: shortPath });
    } catch (error) {
        return res.status(404).send(error.message);
    }

}

module.exports = { createDir };