const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const requestEndpoint = "https://devcore02.cimet.io/v1/generate-token";

const searchEndPoint = "https://devcore02.cimet.io/v1/search-address";

app.use(express.static(path.join(__dirname, 'build')));

// app.get('/https://devcore02.cimet.io', function (req, res) {
//  return res.send('pong');
// });

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})

app.post('/getToken', cors(corsOptions), async (req, res) => {
    const fetchOptions = {
        method: 'POST',
        headers: { 'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301' }
    }
    const response = await fetch(requestEndpoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.post('/getSearchAddress', cors(corsOptions), async (req, res) => {
    console.log("request Data", req.body.search_address);

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Api-key': req.header('api-key'),
            'Auth-token': req.header('auth-token'),
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'search_address': req.body.search_address
        })
    }

    const response = await fetch(searchEndPoint, fetchOptions);
    const jsonResponse = await response.json();
    res.json(jsonResponse);
});

app.listen(3030, () => {
    console.log('listening on port 3030')
})