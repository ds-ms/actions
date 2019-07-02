import * as io from '@actions/io';
import * as ioUtil from '@actions/io/lib/io-util';
import * as core from '@actions/core';
import { issueCommand } from '@actions/core/lib/command';

function run() {
    let pathToKubeconfig = process.env['KUBECONFIG'];
    if (pathToKubeconfig && ioUtil.exists(pathToKubeconfig)) {
        io.rmRF(pathToKubeconfig); // Deleting the kubeconfig file
        core.debug(`${pathToKubeconfig} has been successfully deleted`)
    };
    issueCommand('set-env', { name: 'KUBECONFIG' }, '');
    console.log('KUBECONFIG environment variable unset');
}

run();