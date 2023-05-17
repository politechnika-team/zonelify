import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NewsArticle from "./NewsArticle";
import axios from "axios";
import "../css/News.css";

function News() {
  const { darkMode, setDarkMode } = useContext(AuthContext);
  const [data, setData] = useState();
  const apiKey = "9f0f3f95afde4552b4c96b6ba22e2dd0";

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=tesla&from=2023-04-16&sortBy=publishedAt&apiKey=${apiKey}`
      )
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);

  return (
    <div className={`news-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="all__news">
        {data
          ? data.articles.map((news, index) => (
              <NewsArticle data={news} key={index} />
            ))
          : "Loading"}
      </div>
    </div>
  );
}

export default News;
