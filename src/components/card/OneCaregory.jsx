import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { ENDPOINT } from "../../constants";

function CategoryCard({ onecategory }) {
  console.log(onecategory);
  const redr = (id) => {
    window.location.href = "/posts/" + id;
  };

  return (
    <>
      <div className="posts-card">
        <div className="card-img">
          <Link onClick={() => redr(onecategory._id)}>
            <LazyLoadImage
              className="category-img"
              src={`${ENDPOINT}/upload/${onecategory.photo._id}.${
                onecategory.photo.name.split(".")[1]
              }`}
              effect="blur"
            />
          </Link>
        </div>
        <div className="posts-content">
          <h3>{onecategory.description}</h3>
        </div>
      </div>
    </>
  );
}

CategoryCard.prototype = {
  onecategory: PropTypes.object,
};

export default CategoryCard;
