import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

import "./style.scss";

import { TOKEN } from "../../constants";
import { AuthContext } from "../../context/AuthContext";
import request from "../../server";
import getImage from "../../utils/getImage";

const Accout = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [changedData, setChangedData] = useState({});
  const [changedPassword, setChangedPassword] = useState({});
  const [loading, setLoading] = useState(false);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoID, setPhotoId] = useState([]);
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove(TOKEN);
    navigate("/login");
  };

  const getInfo = async () => {
    try {
      setLoading(true);
      const res = await request.get("auth/me");
      console.log(res.data);
      setData(res.data);
      setChangedData(res.data);
      setPhoto(res.data?.photo);
      setChangedPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await request.put("auth/details", changedData);
      toast.success("Successfull changed");
    } catch (error) {
      toast.error("Invalid");
    }
  };

  const upDatePassword = async (e) => {
    e.preventDefault();
    console.log(changedPassword);
    try {
      await request.put("auth/password", changedPassword);
      toast.success("Successfull changed");
      setChangedPassword("");
    } catch (error) {
      if (
        changedPassword.currentPassword === "" ||
        changedPassword.newPassword === ""
      ) {
        toast.error("Please Fill");
      } else if (
        changedPassword.currentPassword === changedPassword.newPassword
      ) {
        toast.error("Enter new Password");
      } else {
        toast.error("Current password is incorrect");
      }
    }
  };

  const uploadPhoto = async (e) => {
    try {
      setPhotoLoading(true);
      let formData;
      new FormData();
      formData.append(e.file.originFileObj);
      console.log(e.file.originFileObj);
      let response = await request.post("auth/upload", formData);
      setPhotoId(response.data.split(".")[0].split("_")[1]);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="container">
      <h1 className="form-title">Account </h1>
      <div className="account-row">
        <Spin spinning={loading}>
          <form className="form" onSubmit={submit}>
            <input
              type="text"
              onChange={(e) => {
                setChangedData({ ...data, first_name: e.target.value });
              }}
              value={changedData?.first_name}
              name="first_name"
              placeholder="Firstname"
              className="form-input"
            />
            <input
              type="text"
              onChange={(e) => {
                setChangedData({ ...data, last_name: e.target.value });
              }}
              value={changedData?.last_name}
              name="last_name"
              placeholder="Lastname"
              className="form-input"
            />
            <input
              type="text"
              onChange={(e) => {
                setChangedData({ ...data, username: e.target.value });
              }}
              value={changedData?.username}
              name="username"
              placeholder="Username"
              className="form-input"
            />
            <input
              type="text"
              onChange={(e) => {
                setChangedData({ ...data, info: e.target.value });
              }}
              value={changedData?.info}
              name="info"
              placeholder="info"
              className="form-input"
            />
            <input
              type="number"
              onChange={(e) => {
                setChangedData({ ...data, phoneNumber: e.target.value });
              }}
              value={changedData?.phoneNumber}
              name="phoneNumber"
              placeholder="Number"
              className="form-input"
            />
            <input
              type="text"
              value={changedData?.address}
              onChange={(e) => {
                setChangedData({ ...data, address: e.target.value });
              }}
              name="address"
              placeholder="Address"
              className="form-input"
            />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={uploadPhoto}>
              {/* {photo ? (
                <img
                  src={getImage(photo)}
                  alt="avatar"
                  style={{
                    width: "100%",
                  }}
                />
              ) : (
                <div>
                  {photoLoading ? <LoadingOutlined /> : <PlusOutlined />}
                  <div
                    style={{
                      marginTop: 8,
                    }}>
                    Upload
                  </div>
                </div>
              )} */}
            </Upload>
            <center>
              <button
                type="submit"
                className="btn-yellow"
                style={{ marginTop: "30px" }}>
                Save
              </button>
            </center>
          </form>
          <form className="form" onSubmit={upDatePassword}>
            <center>
              {" "}
              <h1 className="post-title">Update Password</h1>
            </center>

            <input
              type="text"
              onChange={(e) => {
                setChangedPassword({
                  ...changedPassword,
                  currentPassword: e.target.value,
                });
              }}
              name="currentPassword"
              placeholder="Current Password"
              className="form-input"
            />
            <input
              type="text"
              onChange={(e) => {
                setChangedPassword({
                  ...changedPassword,
                  newPassword: e.target.value,
                });
              }}
              name="newPassword"
              placeholder="New Password"
              className="form-input"
            />
            <center style={{ margin: "30px" }}>
              <button type="submit" className="btn-yellow">
                Change Password
              </button>{" "}
              <button className="btn-yellow" onClick={logout}>
                Log out
              </button>
            </center>
          </form>
        </Spin>
      </div>
    </div>
  );
};

export default Accout;
