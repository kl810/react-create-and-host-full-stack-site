import express from 'express';

const app = express();

app.get('/hello', function(req, res) { //(request, response)
    res.send('Hello!');
});