import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../../server";

const Onecategory = () => {
  const { oneCategoryId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await request("category/" + oneCategoryId);
      setData([res.data]);
      // console.log([res.data]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="post-card">
      <div className="container">
        {loading ? (
          <div className="enter-loading">LOADING...</div>
        ) : (
          data.map((el) => (
            <>
              <div className="user"></div>
              <div className="popular-post">
                <h3>{el.name}</h3>
              </div>
              <div className="popular-desc">
                <p>{el.description}</p>
                <br />
              </div>
            </>
          ))
        )}
      </div>
    </section>
  );
};

export default Onecategory;
