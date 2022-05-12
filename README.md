# Clone project
- `git clone https://github.com/guptayush02/file_upload_backend.git`

# Install dependency
- `npm install`

# Project config
- `Rename .env.example to .env`
`SALT=$2b$10$2p22aQ/.LqhQpbknw6U58u
TOKEN_SECRET=09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611`

# Database config
- `Rename config/config.json.example to config/config.json and change database username and password`

# Start server
- `node server.js` 
It will create a database and create all tables if not exists

# Create migration
- `sequelize model:create --name <table_name> --attributes name:string,emai:string,password:string`

# Run migration
- `sequelize-cli db:migrate`

# Undo migration
-  `sequelize-cli db:migrate:undo`

# Serve Project wirh frontend
- Create simlink with frontend build folder
- `ln -s ~/Documents/projects/file_upload_frontend/build public`
- move all files from build to public
- Then run `node server.js`

- `Open localhost:3000 to the browser`


# Curl:

- Signup:
`
curl --location --request POST 'localhost:3000/api/v1/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST' \
--data-raw '{
    "name": "ayush",
    "email": "ayush@gmail.com",
    "password": "ayush"
}'
`

- Login
`
curl --location --request POST 'localhost:3000/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST' \
--data-raw '{
    "email": "ayush@gmail.com",
    "password": "ayush"
}'
`

- File Upload
`
curl --location --request POST 'localhost:3000/api/v1/upload-file' \
--header 'Content-Type: application/json' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YXl1c2hAZ21haWwuY29t.iIteTxTYSFAR1wTx3LapIXYIjIfCARaMWJjEnFxgdec' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST' \
--data-raw '{
    "title": "test1",
    "description": "test d",
    "url": "https://jfjgj"
}'
`

- Get All Files
`
curl --location --request GET 'localhost:3000/api/v1/files' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YXl1c2hAZ21haWwuY29t.iIteTxTYSFAR1wTx3LapIXYIjIfCARaMWJjEnFxgdec' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST'
`

- Delete file
`
curl --location --request DELETE 'localhost:3000/api/v1/file/2' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YXl1c2hAZ21haWwuY29t.iIteTxTYSFAR1wTx3LapIXYIjIfCARaMWJjEnFxgdec' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST'
`

- Get Public file URL
`
curl --location --request GET 'localhost:3000/api/v1/public-file?id=1' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YXl1c2hAZ21haWwuY29t.iIteTxTYSFAR1wTx3LapIXYIjIfCARaMWJjEnFxgdec' \
--header 'Cookie: __profilin=p%3Dt; _session_id=b2e6a33b5cfdbd510d97543fafab7397; r=nfcZOqylvcT6Rrsv; request_method=POST'
`
