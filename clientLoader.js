const path = require('path');

const clientLoader = () => {
    const clientBuild = path.join(__dirname, 'client', 'build', 'index.html');
    return clientBuild;
}

const assetLoader = () => {
    const clientBuild = path.join(__dirname, 'client', 'build');
    return clientBuild;
}

module.exports = {
    clientLoader,
    assetLoader
}