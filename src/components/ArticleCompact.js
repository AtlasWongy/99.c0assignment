import React from 'react';



function ArticleCompact(props){

    const unixTime = props.article.created;
    const date = new Date(unixTime*1000).toString();
    

    return(
        <article class="designCard" style ={{backgroundColor: "green", margin: "20, 20, 20, 20" }}>
            <p>Compact</p>
            <p>{props.article.title}</p>
            <p>{props.article.author}</p>
            <button class='btn btn-primary'>Compact</button>
            <p>{date}</p> 
        </article>
    )
}


export default ArticleCompact;