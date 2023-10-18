import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PropTypes from "prop-types";

import { ENDPOINT } from "../../constants";

const AllPostsCard = ({ allPosts }) => {
  const redr = (id) => {
    window.location.href = "/posts/" + id;
  };

  const [emptyImg, setEmptyImg] = useState({});

  const EmptyImage = (imgId) => {
    setEmptyImg((errorImgs) => ({
      ...errorImgs,
      [imgId]: true,
    }));
  };
  return (
    <div
      onClick={() => redr(allPosts._id)}
      style={{ cursor: "pointer" }}
      className="posts-card">
      <div className="card-img">
        <LazyLoadImage
          className="category-img"
          onError={() => EmptyImage(allPosts._id)}
          src={
            emptyImg[allPosts._id]
              ? "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
              : `${ENDPOINT}upload/${allPosts.photo?._id}.jpg`
          }
          effect="blur"
        />
      </div>
      <div className="posts-content">
        <h4>{allPosts.category.name}</h4>
        <h3>{allPosts.description.slice(0, 70)}</h3>
        <p>{allPosts.description}</p>
      </div>
    </div>
  );
};

AllPostsCard.prototype = {
  allPosts: PropTypes.object,
};
export default AllPostsCard;
