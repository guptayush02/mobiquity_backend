# Clone project
- `git clone https://github.com/guptayush02/mobiquity_backend.git`

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

# Serve Project with frontend
- Create simlink with frontend build folder
- ` ln -s ~/Documents/projects/mobiquity/frontend/build/ public/`
- move all files from build to public
- Then run `node server.js`

- `Open localhost:3000 to the browser`


# Deployment
- ssh to aws ec2 server.
- Go to the frontend and backend project.
- Take pull from frontend and backend repo,
- Make build on frontend project
- Create simlink `ln -s <path_to_your_frontend_project>/build/ <path_to_your_backend_project>/public/`
- Restart backend server


# Curl:

- Signup:
`
curl --location --request POST 'localhost:3000/api/v1/signup' \
--header 'Content-Type: application/json' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv' \
--data-raw '{
    "name": "admin",
    "email": "admin1@admin.com",
    "password": "qwerty@123"
}'
`

- Login
`
curl --location --request POST 'localhost:3000/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv' \
--data-raw '{
    "email": "admin@admin.com",
    "password": "qwerty@123"
}'
`

- Get atm list
`
curl --location --request GET 'localhost:3000/api/v1/atm-lists?city=Berlin' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.1s1C2OmieDsVf1hOSt0ygeZk6WYXf9nX2uzTbDwbR4Q' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv' \
--data-raw ''
`

- Create atm
`
curl --location --request POST 'localhost:3000/api/v1/atm' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.1s1C2OmieDsVf1hOSt0ygeZk6WYXf9nX2uzTbDwbR4Q' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv' \
--header 'Content-Type: application/json' \
--data-raw '[
  {
    "bigger_location": "Wegedorn-Zentrum",
    "zipcode": "12524",
    "city": "Berlin1",
    "street": "Semmelweißstraße 105",
    "location": "Outdoor Eingangsbereich",
    "type": "atm"
  }
]
'
`

- Delete atm
`
curl --location --request DELETE 'localhost:3000/api/v1/atm/1794' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.1s1C2OmieDsVf1hOSt0ygeZk6WYXf9nX2uzTbDwbR4Q' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv' \
--data-raw ''
`

- Update atm
`
curl --location --request PUT 'localhost:3000/api/v1/atm/1' \
--header 'token: eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.1s1C2OmieDsVf1hOSt0ygeZk6WYXf9nX2uzTbDwbR4Q' \
--header 'Cookie: r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv; r=nfcZOqylvcT6Rrsv' \
--header 'Content-Type: application/json' \
--data-raw '{
    "bigger_location": "Wegedorn-Zentrum",
    "zipcode": "12521",
    "city": "Berlin",
    "street": "Semmelweißstraße 105",
    "location": "Outdoor Eingangsbereich",
    "type": "atm"
}'
`
