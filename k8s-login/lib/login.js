"use strict";
exports.__esModule = true;
var core = require("@actions/core");
function run() {
    var kubeconfig = core.getInput('kubeconfig');
    if (!kubeconfig) {
        throw 'Kubeconfig not received';
    }
    console.log("kubeconfig: " + kubeconfig);
}
run();
