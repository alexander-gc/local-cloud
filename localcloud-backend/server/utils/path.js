const path = require('path');

const slash = process.platform === 'win32' ? '\\' : '/';
const pathCloud = '/home/idoru/Escritorio/VS Code/local-cloud/host-cloud/'

const processPath = (urlPath) => {

    const shortPath = urlPath ? urlPath.replace(/-/g, slash) : slash;
    const absolutePath = path.join(pathCloud, shortPath);

    return { shortPath, absolutePath }

}

module.exports = processPath