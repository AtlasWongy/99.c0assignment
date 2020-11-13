import React from 'react';



function ArticleClassic(props){

    const unixTime = props.article.created;
    const date = new Date(unixTime*1000).toString();
    

    return(
        <article class="designCard">
            <p>Classic</p>
            <p>{props.article.title}</p>
            <p>{props.article.author}</p>
            <button class='btn btn-primary'>Classic</button>
            <p>{date}</p> 
        </article>
    )
}


export default ArticleClassic;