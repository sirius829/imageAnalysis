#Image Analysis API
This api allows you to upload an image and receive a description using an external image analysis service.

## Setup

1. Install dependencies using `npm install`.
2. Set up environment variable:
    - Create a `.env` file and add necessary environment variables(e.g. KEY_FILE_PATH).
3. Run the application using `npm start`.

## API Usage

- **Endpoint:** `/analyze-image`
- **Method:** `POST`
- **Request:** Send a Post request with an iamge file attached.
- **Response:** Returns a JSON object with a description of the uploaded image.

## Environment Variable

- `KEY_FILE_PATH` : API key json file for the Google vison API service.
- `PORT`: port of the server.

## Tests
To run tests, use the following commands: `npm run test`

## Dockerization

1. Create a Dockerfile.
2. Build the Docker image using `docker build -t image-analysis-api .`.
3. Run the Docker container using `docker run -p 3000:3000 image-analysis-api`.

### Logging

Logging is implemented using the Winston library to track requests and errors. Logs can be found in the `logs` directory.
