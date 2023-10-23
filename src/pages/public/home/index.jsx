import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";

import PopularCard from "../../../components/card/PopularCard";
import CategoryCard from "../../../components/card/CategoryCard";

import "../../../components/card/PopularCard.scss";
import "../../../components/card/CategoryCard.scss";

import "./index.scss";
import "react-multi-carousel/lib/styles.css";

import backgroundImage from "../../../assets/images/lasted-post.png";
import request from "../../../server";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const redr = (id) => {
    window.location.href = "/posts/" + id;
  };

  useEffect(() => {
    getPosts();
    getPopularBlog();
    getCategory();
  }, []);
  async function getPosts() {
    try {
      setLoading(true);
      let { data } = await request.get("post/lastone");
      console.log(data);
      setData([data]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function getPopularBlog() {
    try {
      setLoading(true);
      let res = await request.get("post/lastones");
      setPost(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function getCategory() {
    try {
      let res = await request.get("category");
      setCategory(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1029 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: { max: 1029, min: 830 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 830, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };
  return (
    <>
      {/* lastest ones */}
      <section
        className="lasted-one"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          height: "880px",
        }}>
        <div className="container">
          {loading ? (
            <>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="enter-loading">LOADING...</div>
            </>
          ) : (
            data.map((el) => (
              <Fragment key={el._id}>
                <p className="hero-category">
                  Posted on <b>{el.category.name}</b>
                </p>
                <h1 className="hero-title">
                  {/* {el.category.description.slice(0, 36)}. */}
                  {el.title}
                </h1>
                <p className="hero-detail">
                  By{" "}
                  <span className="text-yellow">
                    {/* {el.user.first_name} {el.user.last_name} */}
                  </span>{" "}
                  |{" "}
                  {new Date(el.category.updatedAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p className="hero-descr">{el.category.description}</p>

                <Link onClick={() => redr(el._id)} className="btn btn-yellow">
                  Read More {">"}
                </Link>
              </Fragment>
            ))
          )}
        </div>
      </section>

      {/* popularPosts */}

      <section className="popularPost">
        <div className="container">
          <h2>Popular blogs</h2>
          <div className="popularCard-wrappper">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={100}
              keyBoardControl={true}>
              {loading ? (
                <div className="enter-loading">Loading...</div>
              ) : (
                post.map((item, i) => <PopularCard key={i} item={item} />)
              )}
            </Carousel>
          </div>
        </div>
      </section>

      {/* categories */}

      <section className="categories">
        <div className="container">
          <h2>Choose A Catagory</h2>
          <div className="category-wrappper">
            <Carousel
              responsive={responsive}
              showDots={false}
              infinite={true}
              autoPlay={false}
              autoPlaySpeed={100}
              keyBoardControl={true}>
              {loading ? (
                <div className="enter-loading">Loading...</div>
              ) : (
                category.map(
                  (category, i) => <CategoryCard key={i} category={category} />
                  // console.log(category)
                )
              )}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
