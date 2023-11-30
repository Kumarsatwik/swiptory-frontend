import React, { useEffect, useState } from "react";
import "./addstory.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import categoryData from "../../constantData/CategoryList";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// { onClose, editData }
const AddStory = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [modalDetails, setModalDetails] = useState([
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
    { heading: "", description: "", image: "", category: "" },
  ]);
  const [countSlide, setCountSlide] = useState(1);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);

  const post = useSelector((state) => state.posts);
  const postId = post.addDataModal.postId;
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
    if (props.editData || windowWidth < 768) {
      setModalDetails(props.editData);
      setEdit(true);
    }
  }, [props.editData]);

  const handleAddSlide = (index) => {
    setModalDetails([
      ...modalDetails.slice(0, index),
      { heading: "", description: "", image: "", category: "" },
      ...modalDetails.slice(index),
    ]);
  };
  const handleRemoveSlide = (index) => {
    const updatedModalDetails = [...modalDetails];
    updatedModalDetails.splice(index, 1);
    setModalDetails(updatedModalDetails);
  };

  const handleInputChange = (e, index, field) => {
    setModalDetails((prevModalDetails) => {
      const updatedModalDetails = [...prevModalDetails];
      updatedModalDetails[index - 1] = {
        ...updatedModalDetails[index - 1],
        [field]: e.target.value,
      };
      return updatedModalDetails;
    });
  };

  const canProceed = () => {
    // console.log(modalDetails);
    return modalDetails.every((slide) => {
      // console.log(slide);
      Object.values(slide).every((value) => {
        console.log(value);
        value.trim() !== "";
      });
    });
  };

  const handlePost = () => {
    console.log(canProceed());
    if (!canProceed()) {
      setError(true);
      //   return;
    } else {
      setError(false);
    }

    if (edit) {
      axios
        .put(
          `https://swiptory-fm06.onrender.com/post/edit-post/${postId}`,
          { story: modalDetails },
          {
            headers: {
              token: localStorage.getItem("_token"),
            },
          }
        )
        .then((res) => {
          // console.log(res);
          toast.success("Updated Successfully");
          props.onClose();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          "https://swiptory-fm06.onrender.com/post/create-post",
          { story: modalDetails },
          {
            headers: {
              token: localStorage.getItem("_token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          toast.success(res.data.message);
          props.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="addStory__modal"></div>
      <div className="addStory__content">
        <IoCloseCircleOutline
          className="addStory__close"
          onClick={props.onClose}
        />
        <h1 className="addStory__title">Add Story to feed</h1>
        <p>Add upto 6 slides</p>
        <div className="addStory__container">
          <div className="addStory__slides">
            {modalDetails.map((slide, index) => {
              return (
                <>
                  <div
                    key={`${slide.uniqueIdentifier}_${index}`}
                    className="addStory__slide "
                  >
                    <div
                      className={`addStory__slide-content ${
                        countSlide == index + 1 ? "active" : ""
                      }`}
                      onClick={() => setCountSlide(index + 1)}
                    >
                      <p>Slide {index + 1}</p>
                      {index + 1 > 3 && (
                        <IoCloseCircleOutline
                          className="slide_close"
                          onClick={() => handleRemoveSlide(index)}
                        />
                      )}
                    </div>
                  </div>
                </>
              );
            })}
            {modalDetails.length < 6 && (
              <div className="addStory__slide">
                <div
                  className={`addStory__slide-content`}
                  onClick={() => handleAddSlide(countSlide)}
                >
                  <p>
                    Add <AiOutlinePlus />
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="addStory__form-container">
            <form className="addStory__form">
              <div>
                <label htmlFor="heading">Heading:</label>
                <input
                  type="text"
                  placeholder="Your Heading"
                  value={modalDetails[countSlide - 1]?.heading || ""}
                  onChange={(e) => handleInputChange(e, countSlide, "heading")}
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  placeholder="Story Description"
                  value={modalDetails[countSlide - 1]?.description || ""}
                  onChange={(e) =>
                    handleInputChange(e, countSlide, "description")
                  }
                />
              </div>
              <div>
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  placeholder="Add Image url"
                  value={modalDetails[countSlide - 1]?.image || ""}
                  onChange={(e) => handleInputChange(e, countSlide, "image")}
                />
              </div>
              <div>
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  id="category"
                  value={modalDetails[countSlide - 1]?.category || "none"}
                  onChange={(e) => handleInputChange(e, countSlide, "category")}
                >
                  <option value="none">Select Category</option>
                  {categoryData.map((category) => (
                    <>
                      {category.name != "All" ? (
                        <option value={category.name}>{category.name}</option>
                      ) : null}
                    </>
                  ))}
                </select>
              </div>
              {error && (
                <label className="form__error" htmlFor="">
                  Please Fill out all fields
                </label>
              )}
            </form>
          </div>
        </div>

        <div className="addStory__btn">
          <span>
            {countSlide > 1 && (
              <button
                className="btn bg-green previous-btn"
                onClick={() => setCountSlide(countSlide - 1)}
              >
                Previous
              </button>
            )}
            {countSlide < modalDetails.length && (
              <button
                className="btn bg-blue next-btn"
                onClick={() => setCountSlide(countSlide + 1)}
              >
                Next
              </button>
            )}
          </span>

          <button className="btn bg-red post-btn" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
};

export default AddStory;
