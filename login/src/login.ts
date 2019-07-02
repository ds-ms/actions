import * as core from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';
import * as path from 'path';
import * as fs from 'fs';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function run() {
    let kubeconfig = core.getInput('kubeconfig');
    if (!kubeconfig) {
        core.setFailed('Kubeconfig not received');
    }
    const runnerTempDirectory = process.env['RUNNER_TEMPDIRECTORY']; // Using process.env until the core libs are updated
    const kubeconfigPath = path.join(runnerTempDirectory, `kubeconfig_${getRandomInt(100)}`);
    core.debug(`Writing kubeconfig contents to ${kubeconfigPath}`);
    fs.writeFileSync(kubeconfigPath, kubeconfig);
    issueCommand('set-env', { name: 'KUBECONFIG' }, kubeconfigPath);
    console.log('KUBECONFIG environment variable is set');
}

run();