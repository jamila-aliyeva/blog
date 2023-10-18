import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const [errorImages, setErrorImages] = useState({});

  const navigate = useNavigate();

  const handleImageError = (postId) => {
    setErrorImages((prevErrors) => ({
      ...prevErrors,
      [postId]: true,
    }));
  };
  const redirectToBlog = (id) => {
    navigate("/blog/" + id);
  };

  return (
    <div
      className="post"
      onClick={() => redirectToBlog(post?._id)}
      key={post?._id}
      style={{ cursor: "pointer" }}>
      <div className="post-header">
        <LazyLoadImage
          effect="blur"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            cursor: "pointer",
          }}
          onError={() => handleImageError(post?._id)}
          src={
            errorImages[post?._id]
              ? "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
              : `https://blog-backend-production-a0a8.up.railway.app/upload/${
                  post?.photo._id
                }.${post?.photo.name.slice(-3)}`
          }
        />
      </div>
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
      </div>
    </div>
  );
}

export default PostCard;
