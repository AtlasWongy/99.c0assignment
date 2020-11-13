import React from 'react';
import '../App.css';



function ArticleCard(props){

    const unixTime = props.article.created;
    const date = new Date(unixTime*1000).toString();
    

    return(
        <div className="designBox">
            <div className="voteBox">
                <button class='btn btn-primary'>up</button>
                <p></p>
                <button class='btn btn-primary'>down</button>
            </div>
            <article class="designCard" style ={{backgroundColor: "white", margin: "20, 20, 20, 20" }}>
                <p>Card</p>
                <p>{props.article.title}</p>
                <p>Posted by {props.article.author} <strong>{date}</strong> </p>
                <p>{props.article.num_comments}</p>
            </article>
        </div>

    )
}


export default ArticleCard;