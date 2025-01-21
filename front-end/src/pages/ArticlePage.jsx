import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import articles from "../article-content";
import CommentsList from "../commentsList";

export default function ArticlePage() {

    const { name } = useParams(); {/* same as const params = useParams()
                                        const name = params.name */}
    const { upvotes: initialUpvotes, comments } = useLoaderData();
    const [ upvotes, setUpvotes ] = useState(initialUpvotes)

    const article = articles.find(a => a.name === name);

    async function onUpvoteClicked() {
        const response = await axios.post('/api/articles/' + name + '/upvote');
        const updatedArticleData = response.data;
        setUpvotes(updatedArticleData.upvotes)
    }

    return (
        <>
            <h1>{article.title}</h1>
            <button onClick={onUpvoteClicked}>Upvote</button>
            <p>This article has {upvotes} upvotes!</p>
            {article.content.map(p => <p key={p}>{p}</p>)}
            <CommentsList comments={comments} />
        </>
        
    );
}

export async function loader ({params}) {
    const response = await axios.get('/api/articles/' + params.name);
    const { upvotes, comments } = response.data;
    return { upvotes, comments }    //referenced with useLoaderData hook in ArticlePage.jsx
}