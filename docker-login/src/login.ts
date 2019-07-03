import * as core from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';
import * as path from 'path';
import * as fs from 'fs';

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
    }

    const runnerTempDirectory = process.env['RUNNER_TEMPDIRECTORY']; // Using process.env until the core libs are updated
    const dockerConfigPath = path.join(runnerTempDirectory, `dockerconfig_${getRandomInt(100)}.json`);
    core.debug(`Writing docker config contents to ${dockerConfigPath}`);
    fs.writeFileSync(dockerConfigPath, JSON.stringify(config));
    issueCommand('set-env', { name: 'DOCKER_CONFIG' }, dockerConfigPath);
    console.log('DOCKER_CONFIG environment variable is set');
}

run();