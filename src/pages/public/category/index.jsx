import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import request from "../../../server";
import CategoryCard from "../../../components/card/OneCaregory";

import "./index.scss";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPost, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  console.log(categoryId);

  async function getCategory() {
    try {
      setLoading(true);
      let res = await request.get(`post?page=${currentPage}$&limit=10`);
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

  // const name = window.location.search.split("=")[1];

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
    getCategory(currentPage);
  }, [currentPage]);

  return (
    <section className="one-category">
      <div className="category-name">
        <h1>{Cookies.get("category_name")}</h1>
        <p className="one-category-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
        <div className="category-break">
          <Link to="/">
            Home {">"} {Cookies.get("category_name")}
          </Link>
        </div>
      </div>
      <div className="category-searching">
        <input type="text" placeholder="Searching..." onChange={handleSearch} />
      </div>
      <div className="category-wrapper">
        <div className="container">
          {loading ? (
            <h3 className="enter-loading">Loading...</h3>
          ) : (
            data.map((el) => <CategoryCard key={el._id} onecategory={el} />)
          )}
        </div>
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
    </section>
  );
};

export default CategoryPage;
