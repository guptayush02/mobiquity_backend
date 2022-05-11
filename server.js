const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

const corsOptions = {
  origin: "http://localhost:8080"
}

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(express.static('public/'));

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

const db = require("./models")
db.sequelize.sync()

require("./app/routes/routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
