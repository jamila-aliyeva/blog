import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cookies from "js-cookie";

import request from "../../../server";
import CategoryCard from "../../../components/card/OneCaregory";

import "./index.scss";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();
  console.log(categoryId);

  async function getCategory() {
    try {
      let res = await request.get(`post?category=${categoryId}`);
      setData(res.data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(
        `post?search=${e.target.value}&category=${categoryId}`
      );
      setData(res.data.data);
    } catch (error) {
      toast.error("Not Found");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

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
            <h3 className="err-loading">Loading...</h3>
          ) : (
            data.map((el) => <CategoryCard key={el._id} onecategory={el} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
