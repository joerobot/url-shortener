#!/usr/bin/env node
const fs = require('fs-extra');
const { argv } = require('yargs');
const nowConfig = require('../now.json');

const [shortcut, url] = argv._;
const newConfig = {...nowConfig };

const newRedirect = {
    src: `/${shortcut}`,
    status: 301,
    headers: { Location: url },
};

newConfig.routes.splice(newConfig.routes.length - 1, 0, newRedirect);

if (!argv.test) {
    fs.writeFileSync(
        '../now.json',
        JSON.stringify(newConfig, null, 4)
    );
}
else {
    console.log(JSON.stringify(newConfig, null, 4));
}
