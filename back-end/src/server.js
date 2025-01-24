import express from 'express';
import { MongoClient, ReturnDocument, ServerApiVersion } from 'mongodb';
import admin from 'firebase-admin';
import fs from 'fs';

const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

// const articleInfo = [
//     { name: 'learn-node', upvotes: 0, comments: []},
//     { name: 'learn-react', upvotes: 0, comments: []},
//     { name: 'learn-mongodb', upvotes: 0, comments: []},
// ]

const app = express();

app.use(express.json()) //to use json body for 'req.body'

// app.get('/hello', function(req, res) { //(request, response)
//     res.send('Hello from a GET endpoint!');
// });

// app.get('/hello/:name', function(req, res) {
//     res.send('Hello, ' + req.params.name) //'name' derived from /hello/:name
// })

// app.post('/hello', function(req, res) {
//     res.send('Hello, ' + req.body.name + ' from a POST endpoint!')
// })
let db;

async function connectToDB() {
    const uri = 'mongodb://localhost:27017/';

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    db = client.db('full-stack-react-db')

}

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;
    const article = await db.collection('articles').findOne({ name });
    res.json(article)
});

app.use(async function(req, res, next) {
    const { authtoken } = req.headers;

    if (authtoken) {
        const user = await admin.auth().verifyIdToken(authtoken);
        req.user = user;
    } else {
        res.sendStatus(400);
    }
    
    next();
})


app.post('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;
    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $inc: { upvotes: 1 } //MongoDB syntax - inc = increment
    }, {
        ReturnDocument: 'after',
    })

    // res.send('Success! The article ' + req.params.name + ' now has ' + article.upvotes + ' upvotes!')

    res.json(updatedArticle);
})

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;
    const newComment = { postedBy, text }

    const updatedArticle = await db.collection('articles').findOneAndUpdate({ name }, {
        $push: { comments: newComment }
    }, {
        ReturnDocument: 'after',
    })

    res.json(updatedArticle)
});

async function start() {        //call connectToDB before starting up server
    await connectToDB();

    app.listen(8000, function() {
        console.log('Server is listening on port 8000')
    });
}

start();

