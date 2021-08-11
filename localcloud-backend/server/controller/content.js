const fs = require('fs');
const processPath = require('../utils/path');

const getContent = async (req, res) => {

    try {

        const { shortPath, absolutePath } = processPath(req.params.path);

        const dirExists = fs.existsSync(absolutePath);
        if (!dirExists) return res.status(404).send('Dir o file not found!');

        const dir = fs.opendirSync(absolutePath);

        const content = {
            files: [],
            directories: []
        };

        for await (const element of dir) {
            if (element.isDirectory()) {
                content.directories.push(element.name);
            } else {
                content.files.push(element.name);
            }
        }

        content.files.sort();
        content.directories.sort();

        res.status(200).send({
            path: shortPath,
            success: true,
            content
        });

    } catch (error) {
        res.status(404).send(error.message);
    }

}

module.exports = { getContent };