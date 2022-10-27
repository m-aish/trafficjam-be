To run auth server, run `node auth.js`, Spotify authentication service will run on port 8888,
Angular application must send GET request to `[serverip]:8888/login`
To run basic app with one single room as demonstrated in review 1, first make sure Redis is running on port 6379, run `node index.js`, and navigate to `http://localhost:3000/` on browser