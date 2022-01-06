### React Project

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.


### `node server`
Runs the app in the development mode.<br />
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

for run the application hit these commands:
-npm install
-npm start
-node server

### For Login
Request:
url:'https://devcore02.cimet.io/v1/generate-token'
type:'GET'
 headers: { 'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301' }

 Response:get a token

 ## For Search Address (serach something unit)
 Request:
 url:'https://devcore02.cimet.io/v1/search-address'
 type:'POST'
 headers:{
     'Api-key': '4NKQ3-815C2-8T5Q2-16318-55301',
            'Auth-token': 'vdshghsgdyshgfyh', //get from login service
            'content-type': 'application/json'
 }