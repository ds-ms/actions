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
    let kubeconfig = core.getInput('kubeconfig');
    if (!kubeconfig) {
        throw 'Kubeconfig not received';
    }
    const runnerTempDirectory = process.env['RUNNER_TEMPDIRECTORY']; // Using process.env until the core libs are updated
    const kubeconfigPath = path.join(runnerTempDirectory, `kubeconfig_${getRandomInt(100)}`);
    core.debug(`Writing kubeconfig contents to ${kubeconfigPath}`);
    fs.writeFileSync(kubeconfigPath, kubeconfig);
    command_1.issueCommand('set-env', { name: 'KUBECONFIG' }, kubeconfigPath);
    console.log('KUBECONFIG environment variable is set');
}
run();
