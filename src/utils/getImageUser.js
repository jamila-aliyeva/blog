import { ENDPOINT } from "../constants";

const getImageUser = (photo) => {
  return `${ENDPOINT}upload/${photo?._id}.${photo?.name.split(".")[1]}`;
};
export default { getImageUser };
