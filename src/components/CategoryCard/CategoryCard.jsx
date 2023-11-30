import { useState } from "react";
import "./categoryCard.css";
import ShowStory from "../ShowStory";

const CategoryCard = ({ data, category }) => {
  // console.log(data);
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [activeStories, setActiveStories] = useState([]);
  const [showStories, setShowStories] = useState(false);

  const handleSeeMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
  };

  const handleStoryClick = (clickedData) => {
    // console.log(clickedData.postId);
    // setPostId(clickedData.postId);
    setActiveStories(clickedData.story.map((post) => post));
    setShowStories(true);
  };
  // console.log(data);

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="categoryData__card">
            <h1 className="text-center categoryData__heading">
              Top Stories {category}
            </h1>

            <span className="categoryData__container">
              {data.slice(0, visiblePosts).map((categoryData, index) => (
                <span
                  className="categoryData__story"
                  key={index}
                  onClick={() => handleStoryClick(categoryData)}
                >
                  <h4 className="categoryData__story-heading">
                    {categoryData.story[0].heading}
                  </h4>
                  <p className="categoryData__story-description">
                    {categoryData.story[0].description}
                  </p>
                  <img
                    className="categoryData__image"
                    src={categoryData.story[0].image}
                    alt={`Image ${categoryData.story[0].indexNumber}`}
                  />
                </span>
              ))}
            </span>
            {visiblePosts < data.length && (
              <button
                className="seeMoreButton btn bg-red mx-auto"
                onClick={handleSeeMore}
              >
                See More
              </button>
            )}
          </div>
          {showStories && (
            <ShowStory
              storiesData={activeStories}
              closeModal={() => setShowStories(false)}
            />
          )}
        </>
      ) : (
        <>
          <h1 className="text-center categoryData__heading">
            No Data Avalilable
          </h1>
        </>
      )}
    </>
  );
};

export default CategoryCard;
