import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import request from "../../../server";
import AllPostsCard from "../../../components/card/AllPostsCard";

import "./index.scss";

const PostsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  async function getAllPosts(page) {
    try {
      setLoading(true);
      let res = await request.get(`post?page=${page}&limit=${10}`);
      setData(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(`post?search=${e.target.value}`);
      setData(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found");
    } finally {
      setLoading(false);
    }
  }

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getAllPosts(currentPage);
  }, [currentPage]);

  return (
    <section className="all-posts">
      <div className="container">
        <input type="text" placeholder="Searching..." onChange={handleSearch} />
        <h2>All posts</h2>

        <div className="posts-card-wrapper">
          {loading ? (
            <h3 className="enter-loading">Loading...</h3>
          ) : data.length ? (
            data.map((elm, i) => <AllPostsCard key={i} allPosts={elm} />)
          ) : (
            <div>
              <h3 className="err-not-found" style={{ textAlign: "center" }}>
                <img
                  style={{
                    width: "300px",
                    height: "300px",
                  }}
                  src="https://static.vecteezy.com/system/resources/previews/004/968/590/original/no-result-data-not-found-concept-illustration-flat-design-eps10-simple-and-modern-graphic-element-for-landing-page-empty-state-ui-infographic-etc-vector.jpg"
                  alt=""
                />
              </h3>
              <h3
                className="err-not-found"
                style={{ textAlign: "center", marginBottom: "30px" }}>
                data not found
              </h3>
            </div>
          )}
        </div>
        {data.length ? (
          <div className="pagination-buttons">
            <button
              className={
                currentPage === 1
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={prevPageFunc}>
              {"<"}
            </button>
            {Array.from({ length: maxPage }, (_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={
                  currentPage === index + 1
                    ? "pagination-button active-page"
                    : "pagination-button"
                }>
                {index + 1}
              </button>
            ))}
            <button
              className={
                currentPage === maxPage
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={nextPageFunc}>
              {">"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PostsPage;
