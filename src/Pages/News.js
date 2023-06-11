import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import NewsArticle from "./NewsArticle";
import axios from "axios";
import "../css/News.css";
import { RotatingLines } from "react-loader-spinner";
import newsData from "../news.json"

function News() {
  const { darkMode, setDarkMode } = useContext(AuthContext);
  

  console.log(newsData);

  return (
    <div className={`news-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* <button onClick={handleDownload}>Download JSON</button> */}
      <div className="all__news">
        {newsData ? (
          newsData.articles.map((news, index) => (
            <NewsArticle data={news} key={index} />
          ))
        ) : (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        )}
      </div>
    </div>
  );
}

export default News;
