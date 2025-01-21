import { useParams, useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import articles from "../article-content";
import CommentsList from "../commentsList";
import AddCommentForm from "../AddCommentForm";

export default function ArticlePage() {

    const { name } = useParams(); {/* same as const params = useParams()
                                        const name = params.name */}
    const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
    const [ upvotes, setUpvotes ] = useState(initialUpvotes);
    const [ comments, setComments ] = useState(initialComments)

    const article = articles.find(a => a.name === name);

    async function onAddComment({ nameText, commentText }) {
        const response = await axios.post('/api/articles/' + name + '/comments', {
            postedBy: nameText,
            text: commentText,
        });
        const updatedArticleData = response.data;
        setComments(updatedArticleData.comments)
    }

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
            <AddCommentForm onAddComment={onAddComment} />
            <CommentsList comments={comments} />
        </>
        
    );
}

export async function loader ({params}) {
    const response = await axios.get('/api/articles/' + params.name);
    const { upvotes, comments } = response.data;
    return { upvotes, comments }    //referenced with useLoaderData hook in ArticlePage.jsx
}