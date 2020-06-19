'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilePath = exports.writeToFile = exports.getTempDirectory = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const core = __importStar(require("@actions/core"));
const os = __importStar(require("os"));
function getTempDirectory() {
    return process.env['runner.tempDirectory'] || os.tmpdir();
}
exports.getTempDirectory = getTempDirectory;
function writeToFile(inputObjectString, name) {
    if (inputObjectString) {
        try {
            const fileName = getFilePath(name);
            fs.writeFileSync(path.join(fileName), inputObjectString);
            return fileName;
        }
        catch (ex) {
            core.debug('Exception occurred while writing object to file : ' + inputObjectString + ' . Exception: ' + ex);
        }
    }
    return '';
}
exports.writeToFile = writeToFile;
function getFilePath(name) {
    const tempDirectory = getTempDirectory();
    const fileName = path.join(tempDirectory, path.basename(name));
    return fileName;
}
exports.getFilePath = getFilePath;
