const request = require('supertest');
const app = require('../index');

describe('POST /analyze-image', () => {
    it('should return a JSON object with the image analysis results when successful', async () => {
        const response = await request(app)
        .post('/analyze-image')
        .attach('file', "upload/test.jpg");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('image_descriptions');
    }, 10000)
});