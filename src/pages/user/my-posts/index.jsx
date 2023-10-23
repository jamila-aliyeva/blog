import { Fragment, useCallback, useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../context/AuthContext";
import { UploadOutlined } from "@ant-design/icons";

import "./index.scss";
import { toast } from "react-toastify";
import request from "../../../server";
import { ENDPOINT } from "../../../constants";
import { Button, Form, Input, Modal, Select, Upload } from "antd";

const MyPostsPage = () => {
  const { loading, setLoading } = useContext(AuthContext);

  const [category, setCategory] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    let options;
    options = categories?.map((category) => {
      return {
        value: category?._id,
        label: category?.name,
      };
    });
    setSortedCategories(options);
  }, [categories]);

  const [form] = Form.useForm();

  const getUserPost = useCallback(async (page) => {
    try {
      let { data } = await request.get(`post/user?page=${page}&limit=${10}`);
      // console.log(data?.data);
      setUserPost(data?.data);
      setTotalPage(data.pagination.total);
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
  }, []);

  async function handleSearch(e) {
    try {
      setDataLoading(true);
      const res = await request.get(`post/user?search=${e.target.value}`);
      setUserPost(res.data.data);
      setTotalPage(res.data.pagination.total);
    } catch (error) {
      toast.error("Not Found");
    } finally {
      setDataLoading(false);
    }
  }

  const getCategories = useCallback(async () => {
    try {
      let { data } = await request.get("category");
      // console.log(data);
      setCategories(data?.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  }, []);

  useEffect(() => {
    getCategories();
    getUserPost();
  }, [getUserPost, getCategories]);

  const uploadPhoto = useCallback(async (e) => {
    try {
      let formData = new FormData();
      formData.append("file", e.file.originFileObj);
      // console.log(e.file.originFileObj);
      let { data } = await request.post("upload", formData);
      setPhotoId(data._id);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      console.log(values);
      if (selected === null) {
        await request.post("post", {
          ...values,
          photo: photoId,
        });
      } else {
        await request.put(`post/${selected}`, { ...values, photo: photoId });
      }
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
    setIsModalOpen(false);
  };

  const showModal = useCallback(() => {
    form.resetFields();
    setIsModalOpen(true);
  }, [form]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelected(null);
  };

  const handleChange = (value) => {
    console.log(value);
    setCategory(value);
  };

  useEffect(() => {
    deletePost();
  }, []);

  const deletePost = (id) => {
    try {
      request.delete(`post/${id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  // const editPost = async (id) => {
  //   console.log(id);
  //   try {
  //     showModal(true);
  //     setSelected(id);
  //     let { data } = await request.get(`post/${id}`);
  //     form.setFieldsValue(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log(selected);

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
    getCategories(currentPage);
  }, [currentPage, getCategories]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section id="my-posts">
          <div className="container my-posts">
            <div className="my-posts__header">
              <h1 className="my-posts__title">My posts</h1>
              <button onClick={showModal} className="add-post-btn">
                Add post
              </button>
            </div>
            <input
              onChange={handleSearch}
              name="search"
              placeholder="Searching..."
              className="search-input"
              type="text"
            />
            <div className="line"></div>
            <div className="posts-row">
              {dataLoading ? (
                <h3 className="enter-loading">Loading...</h3>
              ) : userPost.length ? (
                userPost?.map((post) => (
                  <div key={post?._id} className="post-card">
                    <div>
                      <img
                        src={
                          post?.photo
                            ? `${ENDPOINT}upload/${post?.photo._id}.${
                                post?.photo.name.split(".")[1]
                              }`
                            : "https://static.wixstatic.com/media/bb1bd6_f221ad0f4d6f4103bf1d37b68b04492e~mv2.png/v1/fit/w_1000%2Ch_608%2Cal_c%2Cq_80,enc_auto/file.jpg"
                        }
                        alt=""
                      />
                    </div>
                    <div className="post-info">
                      <div>
                        <p className="post-subtitle">{post?.category.name}</p>
                        <h3 className="post-title">{post?.title}</h3>
                        <p className="post-desc">{post?.description}</p>
                      </div>
                      <div className="post-btn">
                        <button className="edit-btn">Edit</button>
                        <button className="delete-btn" onClick={deletePost}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
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
            {userPost.length ? (
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

            <Modal
              title={selected === null ? "Create your post" : "Edit your post"}
              open={isModalOpen}
              onOk={handleOk}
              okText={selected === null ? `Add post` : "Save post"}
              onCancel={handleCancel}>
              <Form
                id="post-form"
                name="Post"
                form={form}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                style={{
                  maxWidth: 700,
                }}
                autoComplete="off">
                <Form.Item
                  label="Post title"
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please include your title!",
                    },
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: "Please include your title!",
                    },
                  ]}>
                  <Select
                    value={category}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
                    options={sortedCategories}
                  />
                </Form.Item>
                <Form.Item label="Popular tags" name="tags">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please include description!",
                    },
                  ]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Upload an image" name="photo">
                  <Upload
                    name="avatar"
                    className="avatar-uploader"
                    showUploadList={true}
                    onChange={uploadPhoto}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default MyPostsPage;
