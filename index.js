const { ImageAnnotatorClient } = require('@google-cloud/vision');
const express = require('express');
const multer = require('multer');
const winston = require('winston');

require('dotenv').config();

const logger = winston.createLogger({
    transport: [
        new winston.transports.File({ filename: 'error.log', level: 'error'}),
        new winston.transports.File({ filename: 'all.log' })
    ]
});

//configuration
const app = express();
const upload = multer({ dest: 'upload/' });
const client = new ImageAnnotatorClient({
    keyFilename: process.env.KEY_FILE_PATH
});

//Middleware to log request
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
});

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something broke!');
});

// image analysis api
app.post('/analyze-image', upload.single('file'), async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({ error: 'No file uploaded' });
        }
        // get the file from request object & request to google vison api
        const [result] = await client.labelDetection(request.file.path);
        //get descriptions from result
        const labels = result.labelAnnotations.map(label => label.description);

        return response.json({ image_descriptions: labels });
    } catch (error) {
        console.log("Error analyzing image:", error);
        return response.status(500).json({ error: 'Error analyzing image' });
    }
});

module.exports = app;

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at port: ${port}`);
})