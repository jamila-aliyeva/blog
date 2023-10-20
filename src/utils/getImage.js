import { ENDPOINT } from "../constants";

const getAdminImage = (photo) => {
  return `${ENDPOINT}upload/${photo?._id}.${photo?.name.split(".")[1]}`;
};

const getImage = (photo) => {
  return `${ENDPOINT}upload/${photo}`;
};

export default { getImage, getAdminImage };
