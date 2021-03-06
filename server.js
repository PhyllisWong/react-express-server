/* eslint-disable semi */
const express = require('express')
const bodyParser = require('body-parser')

const { random, randomD, randomRolls } = require('./utils')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ** Proxy from React can't get at '/' for some reason?
// Apparently this is expected behavior... **
// Test this route with: localhost:4000/
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// A simple route that returns a JSON object
// Test this route with:
app.get('/about', (req, res) => {
  // This Object is converted to JSON and returned.
  res.json({ about: 'this service generates a random numbers.' })
})

// Random number route
// Test this route with: http://localhost:4000/random?n=99
// Where n=99 sets the range of the random number returned
app.get('/random', (req, res) => {
  const { n } = req.query
  const value = random(n - 1)
  res.json({ value, message: `Random number between 0 and ${n}, upperbound exclusive.` })
})

app.get('/roll-dice', (req, res) => {
  const { n } = req.query
  const diceValue = randomD(n);
  res.json({ diceValue, message: `Random ${n} sided dice roll` });
})

const port = 4000
app.listen(port, () => console.log(`LISTENING ON PORT ${port}`))
