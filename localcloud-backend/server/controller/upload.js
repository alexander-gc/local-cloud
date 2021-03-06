const moveFile = require("../utils/move");
const processPath = require("../utils/path");

const postUpload = async (req, res) => {

    try {

        const { params } = req;


        const { absolutePath, shortPath } = processPath(params.path);

        let files = req.files.file;

        if (!files) return res.status(400).send({ success: false, msg: 'Files not found' });

        if (!Array.isArray(files)) files = [files];

        for (const file of files) await moveFile(file, absolutePath);

        res.status(201).send({

            success: true,
            msg: 'Files successfully uploaded',
            path: shortPath

        });

    } catch (error) {
        return res.status(404).send(error.message);
    }

}

module.exports = {
    postUpload
}
