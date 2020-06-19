'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';
import * as os from 'os';

export function getTempDirectory(): string {
    return process.env['runner.tempDirectory'] || os.tmpdir();
}

export function writeToFile(inputObjectString: string, name: string): string {
    if (inputObjectString) {
        try {
            const fileName = getFilePath(name);
            fs.writeFileSync(path.join(fileName), inputObjectString);
            return fileName;
        } catch (ex) {
            core.debug('Exception occurred while writing object to file : ' + inputObjectString + ' . Exception: ' + ex);
        }
    }
    return '';
}

export function getFilePath(name: string) {
    const tempDirectory = getTempDirectory();
    const fileName = path.join(tempDirectory, path.basename(name));
    return fileName;
}