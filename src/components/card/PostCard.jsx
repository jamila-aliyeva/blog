import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import request from "../../server";

function PostCard({ post, delFunc }) {
  const [errorImages, setErrorImages] = useState({});

  console.log(post);
  const navigate = useNavigate();

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };

  const deleteFunc = async (id) => {
    const del = window.confirm("Do you wantto delete this ?");
    if (del) {
      console.log(id);

      await request.delete("post/" + id);
    }
  };
  return (
    <div
      className="post"
      // onClick={() => redirectToBlog(post?._id)}
      key={post?._id}
      style={{ cursor: "pointer" }}>
      <div className="post-body">
        <p className="hero-category">
          {post?.category ? post?.category.name : "Coding"}
        </p>
        <h1 className="post-title">{post?.title}.</h1>
        <p className="post-descr">
          {post?.category
            ? post?.category
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
        </p>
        <div style={{ display: "flex" }}>
          <button type="button" onClick={() => deleteFunc(post._id)}>
            Delete
          </button>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
