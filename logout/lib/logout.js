"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("@actions/io");
const ioUtil = require("@actions/io/lib/io-util");
const core = require("@actions/core");
const command_1 = require("@actions/core/lib/command");
function run() {
    let pathToKubeconfig = process.env['KUBECONFIG'];
    if (pathToKubeconfig && ioUtil.exists(pathToKubeconfig)) {
        io.rmRF(pathToKubeconfig); // Deleting the kubeconfig file
        core.debug(`${pathToKubeconfig} has been successfully deleted`);
    }
    ;
    command_1.issueCommand('set-env', { name: 'KUBECONFIG' }, '');
    console.log('KUBECONFIG environment variable unset');
}
run();
