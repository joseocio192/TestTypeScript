import { readFile, readFileSync } from 'fs';
import { join, dirname } from 'path';

// Get Homepage
function getHomePage(req, res) {
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, '../resources/html/index.html');
    readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Internal Server Error' + err);
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            try {
                const fileContents = readFileSync(join(__dirname, '../resources/html/css/styles.css'), { encoding: 'utf8' });
                res.write('<style>' + fileContents + '</style>');
            } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error' + err);
                return;
            }
            res.end(data);
        }
    });
}
export {
    getHomePage
};