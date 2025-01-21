import { useParams, useLoaderData } from "react-router-dom";
import articles from "../article-content";

export default function ArticlePage() {

    const { name } = useParams(); {/* same as const params = useParams()
                                        const name = params.name */}
    const { upvotes, comments } = useLoaderData();

    const article = articles.find(a => a.name === name);

    return (
        <>
            <h1>{article.title}</h1>
            <p>This article has {upvotes} upvotes!</p>
            {article.content.map(p => <p key={p}>{p}</p>)}
        </>
        
    );
}