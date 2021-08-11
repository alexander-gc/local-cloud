const moveFile = require("../utils/move");
const processPath = require("../utils/path");

const postUpload = async (req, res) => {

    try {

        res.status(200).send('Upload get');
    } catch (error) {
        res.status(404).send(error.message);
    }

}

module.exports = {
    postUpload
}
