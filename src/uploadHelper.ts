import * as core from '@actions/core'
import {create, UploadOptions} from '@actions/artifact'


export async function uploadFile(fileName: string, filePath: string, rootDirectory: string): Promise<void> {
    try {
        const artifactClient = create();
        const options: UploadOptions = {
        continueOnError: false
        };

        const uploadResponse = await artifactClient.uploadArtifact(
            fileName,
            [filePath],
            rootDirectory,
            options
        );

        if (uploadResponse.failedItems.length > 0) {
            core.setFailed(
                `An error was encountered when uploading ${uploadResponse.artifactName}. There were ${uploadResponse.failedItems.length} items that failed to upload.`
            )
        } else {
            core.info(
                `Artifact ${uploadResponse.artifactName} has been successfully uploaded!`
            )
        }
    } catch (err) {
        core.setFailed(err.message)
    }
}