const fs = require('fs');
const { google } = require('googleapis');
const apikeys = require('./apikey.json'); // Path to your API key JSON file
const SCOPE = ['https://www.googleapis.com/auth/drive'];
const { Readable } = require('stream');

// A function that can provide access to the Google Drive API
async function authorize() {
    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();

    return jwtClient;
}

// A function that will upload the file to Google Drive
async function uploadFileToDrive(authClient, fileBuffer, fileMetadata) {
    const drive = google.drive({ version: 'v3', auth: authClient });

    // Convert the file buffer into a readable stream
    const readableStream = new Readable();
    readableStream.push(fileBuffer);
    readableStream.push(null); // End of stream

    const media = {
        mimeType: fileMetadata.mimeType,
        body: readableStream, // Use the readable stream as the body
    };

    return new Promise((resolve, reject) => {
        drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        }, (error, file) => {
            if (error) {
                return reject(error);
            }
            resolve(file);
        });
    });
}

module.exports = { authorize, uploadFileToDrive };