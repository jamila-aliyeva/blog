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
        <p className="hero-category">{post?.category}</p>
        <h1 className="post-title">{post?.title}.</h1>
        <p className="post-descr">{post?.category}</p>
        <div style={{ display: "flex" }}>
          {/* <button type="button" onClick={() => deleteFunc(post._id)}>
            Delete
          </button>
          <button>Edit</button> */}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
