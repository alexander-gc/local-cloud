const path = require('path');
const fs = require('fs');

const moveFile = async (file, pathCloud) => {

    const filePath = path.join(pathCloud, file.name);

    if (fs.existsSync(filePath)) {

        throw new Error(`File ${file.name} already exists`);

    } else {

        await file.mv(filePath, (e) => { if (e) throw new Error(e) });

    }

};

module.exports = moveFile;