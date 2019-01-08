const bodyParser = require('body-parser')
const request = require('request')
const express = require('express')

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {kAZ4ck2JWYQsU9Hpd0xqOqEA/te7uAqoN4uWZjCRWA9lpuYtiBBq+5/1DWzS/P2izEadIgMsTzaS7hKyLzvVkCH2iGKELU+KYL8g30ejEfCFxHv3dGhvx99uuSrNXHMV4M4uomZ4IF2lV9DFJPAHDQdB04t89/1O/w1cDnyilFU=}'
}

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Push
app.get('/webhook', (req, res) => {
  // push block
  let msg = 'Hello I am Jurina Matsui!'
  push(msg)
  res.send(msg)
})

// Reply
app.post('/webhook', (req, res) => {
  // reply block
  let reply_token = req.body.events[0].replyToken
  let msg = req.body.events[0].message.text
  reply(reply_token, msg)
  // res.send(msg)
  res.sendStatus(200)
  console.log(msg)
})

// app.post('/webhook', (req, res) => { // reply block 
//   let reply_token = req.body.events[0].replyToken
//   reply(reply_token, 'Hello I love TESA')
//   res.sendStatus(200)
// })

function push(msg) {
  let body = JSON.stringify({
    // push body
    to: 'U84499a6b6a18dddd28dc255e44a9b669',
    messages: [{
      type: 'text',
      text: msg
    }]
  })
  // curl
  curl('push', body)
}

function reply(reply_token, msg) {
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [{
      type: 'text',
      text: 'I reply you'
    }]
  })
  curl('reply', body)
}

function curl(method, body) {
  console.log('method:' + method)
  request.post({
    url: 'https://api.line.me/v2/bot/message/' + method,
    headers: HEADERS,
    body: body
  }, (err, res, body) => {
    console.log('status = ' + res.statusCode)
    console.log(err);

  })
}

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
