const path = require('path');
const fs = require('fs');

const moveFile = (file, pathCloud) => {

    const filePath = path.join(pathCloud, file.name);

    if (fs.existsSync(pathCloud)) {
        return res.status(404).send(`File ${file.name} already exists`);
    } else {
        file.mv(pathCloud)
            .then(() => res.status(201).send(`File ${file.name} move successfully`))
            .cath((e) => res.status(404).send(e.message));
    }

};

module.exports = moveFile;