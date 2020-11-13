import './App.css';
import logo from './assets/reddit_logo.jpg';
import React, {useState, useEffect} from 'react';
import ArticleCompact from './components/ArticleCompact';
import ArticleCard from './components/ArticleCard';
import ArticleClassic from './components/ArticleClassic';


function App() {

  const [articles, setArticles] = useState([]);
  const [switchView, setSwitchView] = useState("Card");
  const [scrollNum, setScrollNum] = useState(10); //storing initial state of 100 into scroll num.
  const [subreddit, setSubreddit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  window.onscroll = function(ev){
      if(parseInt(window.innerHeight + window.pageYOffset) >= document.body.offsetHeight){
        console.log("bottom");
        if(!isLoading) { 
          console.log("fetch new data");
          setIsLoading(true);
          var tempNum = scrollNum + 10;
          setScrollNum(tempNum);
          subreddit ? setSubreddit(false) : setSubreddit(true);
        }
      }

  }

  useEffect(async () => {
    await fetch(`https://www.reddit.com/r/webdev.json?limit=${scrollNum}`).then(res => {
      if (res.status !== 200) {
        console.log("Error");
        setIsLoading(false);
        return;
      }

      res.json().then(data => {
        if(data !=null){
          setArticles(data.data.children);
          console.log(data.data.children);
          setIsLoading(false);
        }
      });
    })
  }, [subreddit]);

  const _switchView = (e) => {
    console.log(e.target.value);
    setSwitchView(e.target.value);
    
  }

  const _sortData = (e) => {
    switch(e.target.value){
      case "Top":
        alert("top");
        console.log("top");
        break;
      
      case "New":
        var temp = articles.sort(function(a, b){
          return b.data.created - a.data.created;
        });
        console.log(temp);
        setArticles(temp);
        subreddit ? setSubreddit(false) : setSubreddit(true);
        break;

      case "Hot":
        console.log("hot");
        break;

      default: {
        break;
      }
      
    }
  }

  return (
    <body>
      <div class="navbar">
        <button class="btn btn-primary" value = "Card" onClick= {_switchView}>Card</button>
        <button class="btn btn-primary" value = "Compact" onClick = {_switchView}>Compact</button>
        <button class="btn btn-primary" value = "Classic" onClick = {_switchView}>Classic</button>
        <div class="logo">
          <img src={logo} alt = "Logo"/>
          <span>reddit</span>
        </div>
        <div class="searchbar">
          <label forHTML="searchbar">

          </label>
          <input id="searchbar" placeholder="Search"/>
        </div>
      </div>
      <div class = "arrangement">
        <button class="btn btn-primary" value = "Hot" onClick= {_sortData}>Hot</button>
        <button class="btn btn-primary" value = "Top" onClick = {_sortData}>Top</button>
        <button class="btn btn-primary" value = "New" onClick = {_sortData}>New</button>
      </div>
        <div class="articles">
            {
              (articles != null) ? articles.map((article, index) => switchView === "Card" ? <ArticleCard key={index} article={article.data} />: switchView === "Compact" ? <ArticleCompact key={index} article={article.data} /> : <ArticleClassic key={index} article={article.data} />) : ''
            }
          </div>
    </body>
  );
}

export default App;
