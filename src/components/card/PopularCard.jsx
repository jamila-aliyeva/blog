import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ENDPOINT } from "../../constants";
import { useState } from "react";

const PopularCard = ({ item }) => {
  console.log(item);
  const [emptyImg, setEmptyImg] = useState({});

  const EmptyImage = (imgId) => {
    setEmptyImg((errorImgs) => ({
      ...errorImgs,
      [imgId]: true,
    }));
  };
  return (
    <div className="popular-card">
      <Link to={`posts/${item._id}`}>
        <LazyLoadImage
          className="category-img"
          onError={() => EmptyImage(item._id)}
          src={
            emptyImg[item._id]
              ? "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
              : `${ENDPOINT}upload/${item.photo?._id}.jpg`
          }
          effect="blur"
        />

        <h4>
          By
          <span className="created">
            {item.user.first_name} {item.user.last_name}
          </span>{" "}
          |{" "}
          {new Date(item.category.updatedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>

        <h5>{item.category.description.slice(0, 35) + "..."}</h5>

        {/* <p>{item.category.description}</p> */}
      </Link>
    </div>
  );
};

PopularCard.prototype = {
  item: PropTypes.object,
};

export default PopularCard;
