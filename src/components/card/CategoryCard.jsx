import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import Cookies from "js-cookie";
import { useState } from "react";

const CategoryCard = ({ category }) => {
  const [emptyImg, setEmptyImg] = useState({});

  const EmptyImage = (imgId) => {
    setEmptyImg((errorImgs) => ({
      ...errorImgs,
      [imgId]: true,
    }));
  };
  return (
    <>
      <div className="category-card" style={{ marginRight: "50px" }}>
        <Link
          to={`category/${category._id}`}
          onClick={() => Cookies.set("category_name", category.name)}>
          <LazyLoadImage
            className="category-img"
            onError={() => EmptyImage(category._id)}
            src={
              emptyImg[category._id]
                ? "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
                : `${ENDPOINT}upload/${category.photo?._id}.jpg`
            }
            alt="img"
            effect="blur"
          />

          <h4>{category.name}</h4>
          <p>{category.description}</p>
        </Link>
      </div>
    </>
  );
};

CategoryCard.prototype = {
  category: PropTypes.object,
};

export default CategoryCard;
