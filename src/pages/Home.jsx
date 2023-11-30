import { useEffect, useState } from "react";
import Header from "../components/Header";
import FilterCard from "../components/Filter/FilterCard";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import axios from "axios";
import categoryData from "../constantData/CategoryList";
import { useSelector, useDispatch } from "react-redux";
import UserStory from "../components/CategoryCard/UserStory";
import { listPost } from "../reducer/postSlice";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [userStory, setUserStory] = useState([]);
  const [allData, setAllData] = useState([]);

  // opening add and edit modal
  const [newPostModal, setNewPostModal] = useState(false);

  let user = useSelector((state) => state.user);
  let post = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  // console.log(window.innerWidth);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set the initial window width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let url = "https://swiptory-fm06.onrender.com/post/allposts";
    axios
      .get(url)
      .then((res) => {
        setAllData(res.data.posts);
        dispatch(listPost(res.data.posts));
        localStorage.setItem("_post", JSON.stringify(res.data.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "All") {
      if (user.loggedIn) {
        const allPosts = filteredData.flatMap((category) => category.posts);
        setUserStory(
          allPosts.filter((post) => post.postedBy === user.userDetails.userId)
        );
      }
    } else {
      setFilteredData(
        allData.filter((post) => post.category === selectedCategory)
      );
      setUserStory([]);
    }
  }, [selectedCategory]);

  return (
    <>
      <Header newPostModal={newPostModal} setNewPostModal={setNewPostModal} />
      <FilterCard
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Showing Filtered Category Data */}

      {selectedCategory == "All" ? (
        <>
          {/* user story */}
          {user.loggedIn &&  windowWidth > 768 && (
            <UserStory
              key={0}
              data={allData}
              user={user}
              newPostModal={newPostModal}
              setNewPostModal={setNewPostModal}
            />
          )}

          {categoryData.map((data) => (
            <>
              {allData
                .filter((item) => item.category === data.name)
                .map((post) => (
                  <CategoryCard
                    key={post.id}
                    data={post.posts}
                    category={data.name}
                  />
                ))}
            </>
          ))}
        </>
      ) : (
        <>
          {/* Showing Filtered Category Data */}
          {filteredData.length > 0 ? (
            filteredData.map((post) => (
              <CategoryCard
                key={post.id}
                data={post.posts}
                category={selectedCategory}
              />
            ))
          ) : (
            <CategoryCard
              // key={post.someUniqueIdentifier}
              data={[]}
              category={selectedCategory}
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
