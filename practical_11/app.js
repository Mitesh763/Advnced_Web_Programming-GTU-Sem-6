const fs = require('fs');
const readline = require('readline-sync');

function createFile(fileName) {
    fs.writeFile(fileName, '', (err) => {
        if (err) {
            console.error('Error creating file:', err);
        } else {
            console.log(`File "${fileName}" created successfully.`);
        }
    });
}
function readFile(fileName) {
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            console.log(`Contents of "${fileName}":`);
            console.log(data);
        }
    });
}
function writeFile(fileName, content) {
    fs.writeFile(fileName, content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Data written to "${fileName}" successfully.`);
        }
    });
}
function deleteFile(fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log(`File "${fileName}" deleted successfully.`);
        }
    });
}
function main() {
    const operation = readline.question('Enter operation (c,r,w,d): ');

    switch (operation) {
        case 'c':
            const createFileName = readline.question('Enter file name to create: ');
            createFile(createFileName);
            break;
        case 'r':
            const readFileName = readline.question('Enter file name to read: ');
            readFile(readFileName);
            break;
        case 'w':
            const writeFileName = readline.question('Enter file name to write: ');
            const content = readline.question('Enter content to write: ');
            fs.appendFileSync(writeFileName, content);
            break;
        case 'd':
            const deleteFileName = readline.question('Enter file name to delete: ');
            deleteFile(deleteFileName);
            break;
        default:
            console.log('Invalid operation.');
    }
}
main();
