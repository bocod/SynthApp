import React from 'react'
import { useState, useEffect } from "react";

const FetchNews = () => {

    const [reqData, setReqData] = useState([]);
  
    useEffect(() => {
      fetch("https://inshorts.deta.dev/news?category=world")
        .then((res) => {
          return res.json();
        })
        .then((info) => {
          setReqData(
            info.data
          );
        });
    }, []);

  return (
    <>
      {reqData.map(e => {
        return (
            <span key={e.id}> {e.author} : "{e.title}" - </span>
          )
        })}
    </>
  )

}

export default FetchNews;