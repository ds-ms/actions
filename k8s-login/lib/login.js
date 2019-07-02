"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
function run() {
    let kubeconfig = core.getInput('kubeconfig');
    if (!kubeconfig) {
        throw 'Kubeconfig not received';
    }
    console.log(`kubeconfig: ${kubeconfig}`);
}
run();
