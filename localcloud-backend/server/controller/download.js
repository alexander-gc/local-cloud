const processPath = require("../utils/path");
const mimetype = require('mime-types');

const getDownload = async (req, res) => {

    try {

        const { params } = req;

        const { absolutePath } = processPath(params.path);
        console.log(absolutePath);

        const type = mimetype.lookup(absolutePath);
        console.log(type);

        res.setHeader('Content-Disposition', `attachment: filename=${absolutePath}`);
        res.setHeader('Content-Type', type);
        res.download(absolutePath);

    } catch (error) {
        return res.status(404).send(error.message);
    }

}

module.exports = { getDownload }