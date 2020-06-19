// src/hello-world.ts
import * as core from '@actions/core';
import * as fileHelper from './file-helper'
import * as uploadHelper from './uploadHelper'
import {dirname} from 'path'

async function run() {
  try {
    const nameToGreet = core.getInput('who-to-greet');
    if (nameToGreet == 'Octocat') {
        // the Octocat doesn't want to be greeted here!
        throw new Error("No Octocat greetings, please.");
    } else {
        console.log(`Hello ${nameToGreet}!`);
        const time = (new Date()).toTimeString();
        core.setOutput("time", time);
    }

    let fileName = "temp.txt"
    fileHelper.writeToFile("test content of file", fileName);

    await uploadHelper.uploadFile(
      fileName,
      fileHelper.getFilePath(fileName),
      dirname(fileHelper.getFilePath(fileName))
    );

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();