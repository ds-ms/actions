import * as toolCache from '@actions/tool-cache';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

let kubectlPath = toolCache.findAllVersions('kubectl')[0];
if (!kubectlPath) {
    core.setFailed('Kubectl is not installed');
}

let manifestsInput = core.getInput('manifests');
if (!manifestsInput) {
    core.setFailed('No manifests supplied to deploy');
}
let namespace = core.getInput('namespace');
if (!namespace) {
    namespace = 'default';
}
let manifests = manifestsInput.split('\n');
async function deploy(manifests: string[]) {
    for (var i = 0; i < manifests.length; i++) {
        let manifest = manifests[i];
        await exec.exec(kubectlPath, ['apply', '-f', manifest, '--namespace', namespace]);
    }
}

deploy(manifests).catch(core.setFailed);