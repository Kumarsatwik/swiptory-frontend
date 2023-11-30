import React, { useEffect, useState } from "react";
import "./getStory.css"
import { useParams } from "react-router-dom";
import axios from "axios";
const GetStory = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState("");
  useEffect(() => {
    axios.get("https://swiptory-fm06.onrender.com/post/getStory/" + storyId).then((res) => {
      // console.log(res.data.heading);
      setStory(res.data);
    });
  }, []);

  return (
    <div className="getStory">
      <h1 className="getStory__heading">{story.heading}</h1>
      <p className="getStory__description">{story.description}</p>
      <img src={story.image} className="getStory__image" alt="" />
    </div>
  );
};

export default GetStory;
