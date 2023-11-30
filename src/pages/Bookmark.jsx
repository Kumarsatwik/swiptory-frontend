import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "./styles/bookmark.css";
import axios from "axios";
import ShowStory from "../components/ShowStory";
const Bookmark = () => {
  const [data, setData] = useState([]);
  const [activeStories, setActiveStories] = useState([]);
  const [showStories, setShowStories] = useState(false);
  useEffect(() => {
    axios
      .get("https://swiptory-fm06.onrender.com/bookmark/show", {
        headers: {
          token: localStorage.getItem("_token"),
        },
      })
      .then((res) => {
        // console.log(res.data.stories);
        setData(res.data.stories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleStoryClick = (clickedData) => {
    console.log(clickedData);
    // setPostId(clickedData.postId);
    setActiveStories(clickedData);
    setShowStories(true);
  };

  return (
    <>
      <Header />
      <div className="bookmark">
        <h1 className="bookmark__heading">Your Bookmarks</h1>
        <div className="bookmark__card">
          {data.length > 0 &&
            data.map((bookmark, index) => (
              <span
                className="bookmark__container"
                key={index}
                // onClick={() => handleStoryClick(bookmark)}
              >
                <span className="bookmark__story" key={bookmark.indexNumber}>
                  <h4 className="bookmark__story-heading">
                    {bookmark.heading}
                  </h4>
                  <p className="bookmark__story-description">
                    {bookmark.description}
                  </p>
                  <img
                    className="bookmark__image"
                    src={bookmark.image}
                    alt={`Image ${bookmark.indexNumber}`}
                  />
                </span>
              </span>
            ))}

          {showStories && (
            <ShowStory
              storiesData={activeStories}
              closeModal={() => setShowStories(false)}
            />
          )}
        </div>
        {data.length == 0 && <p className="text-center">No Bookmarks Found</p>}
      </div>
    </>
  );
};

export default Bookmark;
