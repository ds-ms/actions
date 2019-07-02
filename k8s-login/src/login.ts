import * as core from "@actions/core";

function run() {
    let kubeconfig = core.getInput('kubeConfig');
    if (!kubeconfig) {
        throw 'Kubeconfig not received';
    }
    console.log(`kubeconfig: ${kubeconfig}`);
}

run();