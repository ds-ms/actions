import * as core from "@actions/core";
let fs = require('fs');

function run() {
    let kubeconfig = core.getInput('kubeconfig');
    if (!kubeconfig) {
        throw 'Kubeconfig not received';
    }
    console.log(`kubeconfig: ${kubeconfig}`);
}

run();