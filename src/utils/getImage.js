import { ENDPOINT } from "../constants";

const getImage = (photo) => {
  return `${ENDPOINT}upload/${photo}`;
};

export default getImage;
