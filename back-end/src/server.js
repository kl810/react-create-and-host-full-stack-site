import express from 'express';

const app = express();

app.use(express.json()) //to use json body for 'req.body'

app.get('/hello', function(req, res) { //(request, response)
    res.send('Hello from a GET endpoint!');
});

app.get('/hello/:name', function(req, res) {
    res.send('Hello, ' + req.params.name) //'name' derived from /hello/:name
})

app.post('/hello', function(req, res) {
    res.send('Hello, ' + req.body.name + ' from a POST endpoint!')
})

app.listen(8000, function() {
    console.log('Server is listening on port 8000')
});