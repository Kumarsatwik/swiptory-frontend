import React, { useEffect, useRef, useState } from "react";
import "./showStory.css";
import { MdOutlineClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaBookmark } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import axios from "axios";
import { toast } from "react-hot-toast";

const ShowStory = ({ storiesData, closeModal }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [likedStories, setLikedStories] = useState(
    Array(storiesData.length).fill(false)
  );
  const [bookmarkedStories, setBookmarkedStories] = useState(
    Array(storiesData.length).fill(false)
  );
  const progressRef = Array.from({ length: storiesData.length }, () =>
    useRef(null)
  );

  const token = localStorage.getItem("_token");

  // console.log(storiesData[currentStoryIndex].likes.length)

  useEffect(() => {
    const storyDuration = 3000; // Change the duration as needed (in milliseconds)
    const interval = 50; // Update the progress every 50 milliseconds
    const steps = storyDuration / interval;

    let progressInterval;
    let progressCount = 0;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        setProgress((progressCount / steps) * 100);
        progressCount += 1;

        if (progressCount >= steps) {
          clearInterval(progressInterval);
          setProgress(0);

          // Move to the next story after the specified duration
          if (currentStoryIndex < storiesData.length - 1) {
            setCurrentStoryIndex((prevIndex) => prevIndex + 1);
          } else {
            closeModal();
          }
        }
      }, interval);
    };

    startProgress();

    return () => {
      clearInterval(progressInterval);
    };
  }, [currentStoryIndex, storiesData.length, closeModal]);

  useEffect(() => {
    progressRef.forEach((ref, index) => {
      if (index < currentStoryIndex) {
        ref.current.classList.add("add");
      } else if (index === currentStoryIndex) {
        ref.current.style.width = `${progress}%`;
      } else {
        ref.current.style.width = "0%";
      }
    });
  }, [currentStoryIndex, progress]);

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${storiesData.length}, 1fr)`,
    gap: "10px",
    padding: "0 10px",
    width: "95%",
    position: "absolute",
    top: "10px",
    height: "3px",
  };

  const handleLikeClick = () => {
    // console.log(localStorage.getItem("_token"));
    axios
      .post(
        `https://swiptory-fm06.onrender.com/post/like/${storiesData[currentStoryIndex]._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Post Liked");
        setLikedStories((prevLikedStories) => {
          const updatedLikedStories = [...prevLikedStories];
          updatedLikedStories[currentStoryIndex] = true;
          return updatedLikedStories;
        });
      })
      .catch((err) => {
        console.log(err.response);
        setLikedStories((prevLikedStories) => {
          const updatedLikedStories = [...prevLikedStories];
          updatedLikedStories[currentStoryIndex] = true;
          return updatedLikedStories;
        });
        toast.error(err.response.data.message);
      });
  };

  const handleBookmarkClick = () => {
    // console.log(localStorage.getItem("_token"));
    axios
      .post(
        `https://swiptory-fm06.onrender.com/bookmark/${storiesData[currentStoryIndex]._id}`,
        {},
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        toast.success(res.data.message);
        setBookmarkedStories((prevBookmarkedStories) => {
          const updatedBookmarkedStories = [...prevBookmarkedStories];
          updatedBookmarkedStories[currentStoryIndex] =
            !updatedBookmarkedStories[currentStoryIndex];
          return updatedBookmarkedStories;
        });
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response.status === 401) {
          toast.error("Please login");
          localStorage.clear();
          window.location.reload();
        }
        toast.error(err.response.data.message);
      });
  };

  const handleStoryPrevious = () => {
    if (currentStoryIndex <= storiesData.length - 1 && currentStoryIndex > 0) {
      progressRef.forEach((ref, index) => {
        if (currentStoryIndex === index) {
          ref.current.style.width = "100%";
        }
      });

      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleStoryNext = () => {
    if (currentStoryIndex < storiesData.length - 1) {
      progressRef.forEach((ref, index) => {
        if (currentStoryIndex === index) {
          ref.current.style.width = "100%";
        }
      });

      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else {
      closeModal();
    }
  };

  const handleSendClick = async () => {
    try {
      await navigator.clipboard.writeText(
        "http://localhost:5173/post/getStory/" +
          storiesData[currentStoryIndex]._id
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  };

  return (
    <>
      <div className="background">
        <IoIosArrowBack
          className="story-previous"
          onClick={handleStoryPrevious}
        />
        <IoIosArrowForward className="story-next" onClick={handleStoryNext} />
      </div>
      <div className="instagram-stories">
        <div className={`story`}>
          <div className="progress-bar-container" style={{ ...gridStyle }}>
            {progressRef.map((ref, index) => (
              <div
                key={index}
                ref={ref}
                className="progress-bar"
                id={index}
              ></div>
            ))}
          </div>

          <MdOutlineClose
            className="story-close-icon text-xl"
            onClick={closeModal}
          />
          <IoIosSend className="story-send-icon " onClick={handleSendClick} />

          <img
            className="story-image"
            src={storiesData[currentStoryIndex].image}
            alt={`${storiesData[currentStoryIndex]._id}`}
          />

          <span className="story-text">
            <h1 className="story-heading">
              {storiesData[currentStoryIndex].heading}
            </h1>
            <h4 className="story-description">
              {storiesData[currentStoryIndex].description}
            </h4>
          </span>

          <FaHeart
            className={`story-heart-icon ${
              likedStories[currentStoryIndex] ? "liked" : ""
            }`}
            onClick={handleLikeClick}
          />
          <span className="story-likes">
            <FaBookmark
              className={`story-bookmark-icon ${
                bookmarkedStories[currentStoryIndex] ? "bookmarked" : ""
              }`}
              onClick={handleBookmarkClick}
            />
            <p>{storiesData[currentStoryIndex].likes.length}</p>
          </span>
        </div>

        {/* <div className="progress-bar" style={{ width: `${progress}%` }}></div> */}
      </div>
    </>
  );
};

export default ShowStory;
