import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { ENDPOINT } from "../../../constants";
import request from "../../../server";

import "./index.scss";

const PostPage = () => {
  const { postId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await request("post/" + postId);
    setData([res.data]);
    // console.log([res.data]);
  };

  return (
    <section className="post-card">
      <div className="container">
        {data.map((el, i) => (
          <>
            <div
              className="popular-img"
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}>
              <LazyLoadImage
                style={{
                  textAlign: "center",
                  width: "900px",
                  height: "500px",
                  marginTop: "40px",
                  objectFit: "cover",
                }}
                key={i}
                className="category-img"
                src={`${ENDPOINT}upload/${el.photo?._id}.jpg`}
                effect="blur"
              />
            </div>

            <div className="user">
              <img src={`${ENDPOINT}upload/${el.photo?._id}.jpg`} alt="" />
              <div className="user-fish">
                <h2>
                  {el.user.first_name}
                  {el.user.last_name}
                </h2>
                <h4>
                  Posted on{" "}
                  <span>
                    |{" "}
                    {new Date(el.category.updatedAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>{" "}
                </h4>
              </div>
            </div>
            <div className="popular-post">
              <h3>Step-by-step guide to choosing great font pairs</h3>
              <h4>Startup(#{el.tags[0]})</h4>
            </div>
            <div className="popular-desc">
              <p>{el.description}</p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus. Sociis natoque
                penatibus et magnis dis parturient montes. Ridiculus mus mauris
                vitae ultricies leo. Neque egestas congue quisque egestas diam.
                Risus in hendrerit gravida rutrum quisque non.
              </p>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default PostPage;
