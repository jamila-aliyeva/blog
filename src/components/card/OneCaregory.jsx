import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import { useState } from "react";

function CategoryCard({ onecategory }) {
  console.log(onecategory);
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
    <>
      <div className="posts-card">
        <div className="card-img">
          <Link onClick={() => redr(onecategory._id)}>
            <LazyLoadImage
              className="category-img"
              // src={`${ENDPOINT}/upload/${onecategory.photo._id}.${
              //   onecategory.photo.name.split(".")[1]
              // }`}
              onError={() => EmptyImage(onecategory._id)}
              src={
                emptyImg[onecategory._id]
                  ? "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
                  : `${ENDPOINT}upload/${onecategory.photo?._id}.jpg`
              }
              effect="blur"
            />
          </Link>
        </div>
        <div className="posts-content">
          <h4>{onecategory.title}</h4>
          <p>{onecategory.description.slice(0, 30)}...</p>
        </div>
      </div>
    </>
  );
}

CategoryCard.prototype = {
  onecategory: PropTypes.object,
};

export default CategoryCard;
