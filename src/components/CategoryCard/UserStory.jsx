import { useEffect, useState } from "react";
import "./categoryCard.css";
import { FaRegEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { openModal, closeModal } from "../../reducer/postSlice";
import ShowStory from "../ShowStory";
import Header from "../Header";
const UserStory = ({ data, user }) => {
  //   console.log(data);

  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname);

  let post = useSelector((state) => state.posts);
  let aboutUser = useSelector((state) => state.user);
  if (data == undefined) {
    data = post.postList;
  }
  if (user == undefined) {
    user = aboutUser;
  }
  const [userStory, setUserStory] = useState([]);
  const [activeStories, setActiveStories] = useState([]);
  const [showStories, setShowStories] = useState(false);

  const dispatch = useDispatch();

  const [visiblePosts, setVisiblePosts] = useState(4);

  const handleSeeMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 4);
  };

  const handleStoryClick = (clickedData) => {
    setActiveStories(clickedData.story.map((post) => post));
    setShowStories(true);
  };

  // console.log(post.addDataModal);

  useEffect(() => {
    const allPosts = data.flatMap((category) => category.posts);
    setUserStory(
      allPosts.filter((post) => post.postedBy === user.userDetails.userId)
    );
  }, [data, user.userDetails.userId]);

  const ClosePostModal = () => {
    dispatch(closeModal());
  };

  const editHandle = (data) => {
    // console.log(data);
    dispatch(openModal(data));
  };

  return (
    <>
      {pathname == "/userstory" && <Header />}
      {userStory && userStory.length > 0 && (
        <div className="categoryData__card">
          <h1 className="text-center categoryData__heading">Your Stories</h1>

          <span className="categoryData__container">
            {userStory.slice(0, visiblePosts).map((categoryData, index) => (
              <span
                className="categoryData__story"
                key={`${categoryData.story[0].indexNumber}_${index}`}
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
                  onClick={() => handleStoryClick(categoryData)}
                />
                <span
                  className="categoryData__edit"
                  onClick={() => editHandle(categoryData)}
                >
                  <FaRegEdit />
                  Edit
                </span>
              </span>
            ))}
          </span>
          {visiblePosts < userStory.length && (
            <button
              className="seeMoreButton btn bg-red mx-auto"
              onClick={handleSeeMore}
            >
              See More
            </button>
          )}
          {showStories && (
            <ShowStory
              storiesData={activeStories}
              closeModal={() => setShowStories(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default UserStory;
