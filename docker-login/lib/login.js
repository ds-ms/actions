"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const command_1 = require("@actions/core/lib/command");
const path = require("path");
const fs = require("fs");
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function run() {
    let username = core.getInput('username');
    let password = core.getInput('password');
    let loginServer = core.getInput('loginServer');
    let email = core.getInput('email');
    let authenticationToken = new Buffer(`${username}:${password}`).toString('base64');
    let config = {
        "auths": {
            [loginServer]: {
                auth: authenticationToken,
                email: email
            }
        }
    };
    const runnerTempDirectory = process.env['RUNNER_TEMPDIRECTORY']; // Using process.env until the core libs are updated
    const dockerConfigPath = path.join(runnerTempDirectory, `dockerconfig_${getRandomInt(100)}.json`);
    core.debug(`Writing docker config contents to ${dockerConfigPath}`);
    fs.writeFileSync(dockerConfigPath, JSON.stringify(config));
    command_1.issueCommand('set-env', { name: 'DOCKER_CONFIG' }, dockerConfigPath);
    console.log('DOCKER_CONFIG environment variable is set');
}
run();
