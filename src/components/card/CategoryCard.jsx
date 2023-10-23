import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../constants";
import Cookies from "js-cookie";
import { useState } from "react";

import icon from "../../assets/images/Icon.svg";
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
                ? icon
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
