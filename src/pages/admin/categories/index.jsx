import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Flex,
  // Image,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
  Upload,
  // Upload,
  // imageUrl,
  // imageLoading,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  SearchCategories,
  changePage,
  controlModal,
  deleteCategory,
  editCategory,
  getCategories,
  sentCategory,
  showModal,
  uploadImage,
} from "../../../redux/action";
import { LIMIT } from "../../../constants";
import getImage from "../../../utils/getImage";
// import { getImageUser } from "../../../utils/getImageUser";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const {
    categories,
    total,
    loading,
    activePage,
    search,
    isModalOpen,
    selected,
    isModalLoading,
    imageUrl,
    imageLoading,
  } = useSelector((state) => state.categories);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleOk = async () => {
    const values = await form.validateFields();
    // values.photo = imageUrl._id;
    dispatch(sentCategory({ values, selected, activePage, search, form }));
  };

  const closeModal = () => {
    dispatch(controlModal(false));
  };

  // const uploadImage = (e) => {
  //   console.log(e.target.files[0]);
  // };

  const columns = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      // render: (data) => <Image height={50} src={getImageUser(data)} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data) => <p>{data.slice(0, 50)}...</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (data) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => dispatch(editCategory(form, data))}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => dispatch(deleteCategory({ id: data, search }))}>
            Delete
          </Button>
          <Link to={`/categories/${data}`} type="primary">
            See posts
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex
            justify="space-between"
            gap={36}
            align="center"
            style={{ marginTop: "60px" }}>
            <h1>Categories ({total})</h1>

            <Input
              value={search}
              onChange={(e) => dispatch(SearchCategories(e.target.value))}
              style={{ width: "auto", flexGrow: 1 }}
              placeholder="Searching..."
            />
            <Button type="dashed" onClick={() => dispatch(showModal())}>
              Add category
            </Button>
          </Flex>
        )}
        pagination={false}
        loading={loading}
        dataSource={categories}
        columns={columns}
      />
      {total > LIMIT ? (
        <Pagination
          total={total}
          pageSize={LIMIT}
          current={activePage}
          onChange={(page) => dispatch(changePage(page, search))}
        />
      ) : null}

      <Modal
        title="Category data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add category" : "Save category"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}>
        <Form
          name="category"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={(e) => dispatch(uploadImage(e.file.originFileObj))}>
            <div>
              {imageLoading ? (
                <LoadingOutlined />
              ) : imageUrl ? (
                <img
                  // src={getImage(imageUrl)}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}>
                    Upload
                  </div>
                </div>
              )}
            </div>
          </Upload>
          {/* <input type="file" onChange={uploadImage} /> */}
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CategoriesPage;
