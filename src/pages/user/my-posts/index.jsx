import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// import request from "../../../server";

import "./index.scss";
import PostCard from "../../../components/card/PostCard";
import request from "../../../server";
import { Button, Modal, Upload } from "antd";

function Myposts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({ photo: "652d5f505b81cf248eaa1b04" });

  async function getPosts(page) {
    try {
      setLoading(true);
      const res = await request.get(`post/user?page=${page}&limit=10`);
      console.log();
      setPosts([res.data.data]);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found");
    } finally {
      setLoading(false);
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const maxPage = Math.ceil(totalPost / 5);

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

  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(`post/user?search=${e.target.value}`);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleInput(e) {
    const dateNow = new Date();
    setValues({
      ...values,
      [e.target.name]: e.target.value,
      updatedAt: dateNow,
      createdAt: dateNow,
    });
    console.log(values);
  }

  // async function upLoadImage(e) {
  //   try {
  //     let form = new FormData();
  //     form.append("file", e.target.files[0]);
  //     let { data } = await request.post("upload", form);
  //     setValues({ ...values, photo: data });
  //     console.log(values);
  //   } catch (err) {
  //     toast.error("Server Error");
  //   }
  // }

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}>
  //       Upload
  //     </div>
  //   </div>
  // );

  async function handleOk(e) {
    try {
      setLoading(true);
      e.preventDefault();
      console.log(values);
      const res = await request.post("post", values);
      setPosts(res.data.data);
      setTotalPage(res.data.pagination.total);
      getPosts(currentPage);

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    getPosts(currentPage);
    console.log(posts);
  }, [currentPage]);

  return (
    <section>
      <div className="container">
        <input
          style={{ marginTop: "100px" }}
          type="search"
          onChange={handleSearch}
          placeholder="Search"
          className="post-search"
        />
        <div className="my-posts-header">
          <h2 className="section-title">My Posts </h2>
          <button onClick={showModal} className="btn-yellow">
            Add Post
          </button>
        </div>

        {/* modal */}
        <Modal
          title="My Blog Post"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <form onSubmit={handleOk}>
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="title"
              placeholder="Post Title"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="category"
              placeholder="Post Category"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="description"
              placeholder="Post Description"
            />
            <input
              className="modal-input"
              onChange={handleInput}
              type="text"
              name="tags"
              placeholder="Post Tags"
            />
          </form>
        </Modal>
        {/* modal */}

        {loading ? (
          <h3 className="enter-loading">Loading...</h3>
        ) : posts.length ? (
          posts.map((post) => (
            <div key={post._id}>
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <h3 className="err-not-found">Not Found</h3>
        )}
        {posts.length ? (
          <div className="pagination-buttons">
            <button
              className={
                currentPage === 1
                  ? "disabled pagination-button"
                  : "pagination-button"
              }
              onClick={prevPageFunc}>
              {"< Prev"}
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
              {"Next >"}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default Myposts;
