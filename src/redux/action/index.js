// for categories

// import { LIMIT } from "../../constants";
// import request from "../../server";
// import {
//   CATEGORY_CONTROL_MODAL,
//   CATEGORY_FETCHING,
//   CATEGORY_LOADING,
//   CATEGORY_PAGE,
//   CATEGORY_SEARCH,
//   CATEGORY_TOTAL,
// } from "../type/categories";

// export const getCategories = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: CATEGORY_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("category", {
//         params: { page, limit: LIMIT, search },
//       });
//       console.log(data);
//       dispatch({ type: CATEGORY_FETCHING, payload: data });
//       dispatch({ type: CATEGORY_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: CATEGORY_LOADING, payload: false });
//     }
//   };
// };

// export const changePage = (page) => {
//   return (dispatch) => {
//     dispatch({ type: CATEGORY_PAGE, payload: page });
//     dispatch(getCategories(page));
//   };
// };

// export const SearchCategories = (search) => {
//   return (dispatch) => {
//     dispatch({ type: CATEGORY_SEARCH, payload: search });
//     // dispatch({ type: CATEGORY_SEARCH, payload: 1 });

//     dispatch(getCategories(1, search));
//   };
// };

// // FOR POSTS

// import {
//   POSTS_FETCHING,
//   POSTS_LOADING,
//   POSTS_PAGE,
//   POSTS_SEARCH,
//   POSTS_TOTAL,
// } from "../type/posts";

// export const getPosts = (page = 1, search = "") => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: POSTS_LOADING, payload: true });
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("post", {
//         params: { page, limit: LIMIT, search },
//       });
//       console.log(data);
//       dispatch({ type: POSTS_FETCHING, payload: data });
//       dispatch({ type: POSTS_TOTAL, payload: total });
//     } finally {
//       dispatch({ type: POSTS_LOADING, payload: false });
//     }
//   };
// };

// export const changePostspage = (page) => {
//   return (dispatch) => {
//     dispatch({ type: POSTS_PAGE, payload: page });
//     dispatch(changePostspage(page));
//   };
// };

// export const SearchPosts = (search) => {
//   return (dispatch) => {
//     dispatch({ type: POSTS_SEARCH, payload: search });
//     dispatch({ type: POSTS_SEARCH, payload: 1 });

//     dispatch(changePostspage(1, search));
//   };
// };

// export const controlModal = (payload) => {
//   return (dispatch) => {
//     dispatch({ type: CATEGORY_CONTROL_MODAL, payload });
//   };
// };

import { LIMIT } from "../../constants";
import request from "../../server";
import { CATEGORY_ACTIONS } from "../type/categories";

const updateChangeData = (payload) => {
  return { type: CATEGORY_ACTIONS, payload };
};

export const getCategories =
  (page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch(updateChangeData({ loading: true }));
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT, search },
      });
      const categories = data.map((el) => ({ ...el, key: el._id }));
      dispatch(updateChangeData({ categories }));
      dispatch(updateChangeData({ total }));
    } finally {
      dispatch(updateChangeData({ loading: false }));
    }
  };

export const changePage = (page, search) => (dispatch) => {
  dispatch(updateChangeData({ activePage: page }));
  dispatch(getCategories(page, search));
};

export const SearchCategories = (search) => (dispatch) => {
  dispatch(updateChangeData({ search }));
  dispatch(updateChangeData({ activePage: 1 }));

  dispatch(getCategories(1, search));
};

export const controlModal = (payload) => (dispatch) => {
  dispatch(updateChangeData({ isModalOpen: payload }));
};

export const uploadImage = (file) => async (dispatch) => {
  try {
    dispatch(updateChangeData({ imageLoading: true }));
    const formData = new FormData();
    formData.append("file", file);
    const { data } = request.post("upload", formData);
    // console.log(data);
    dispatch(updateChangeData({ imageUrl: data }));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(updateChangeData({ imageLoading: true, imageUrl: null }));
  }
};

export const sentCategory =
  ({ values, selected, activePage, search, form }) =>
  async (dispatch) => {
    try {
      dispatch(updateChangeData({ isModalLoading: true }));
      selected === null
        ? await request.post("category", values)
        : await request.put(`category/${selected}`, values);
      dispatch(updateChangeData({ isModalOpen: false }));
      dispatch(getCategories(activePage, search));

      form.resetFields();
    } finally {
      dispatch(updateChangeData({ isModalLoading: false }));
    }
  };

export const editCategory = (form, id) => async (dispatch) => {
  dispatch(updateChangeData({ selected: id, isModalOpen: true }));
  const { data } = await request.get(`category/${id}`);
  dispatch(updateChangeData({ imageUrl: data.photo }));

  form.setFieldsValue(data);
};

export const showModal = (form) => async (dispatch) => {
  dispatch(
    updateChangeData({ selected: null, imageUrl: null, isModalOpen: true })
  );
  form.resetFields();
};

export const deleteCategory =
  ({ id, search }) =>
  async (dispatch) => {
    await request.delete(`category/${id}`);
    dispatch(getCategories(1, search));
    dispatch(getCategories({ activePage: 1 }));
  };

// for posts

// import { POSTS_ACTIONS } from "../type/posts";

// const updateChangeDataPosts = (payload) => {
//   return { type: POSTS_ACTIONS, payload };
// };

// export const getPosts =
//   (page = 1, search = "") =>
//   async (dispatch) => {
//     try {
//       dispatch(updateChangeDataPosts({ loading: true }));
//       const {
//         data: {
//           data,
//           pagination: { total },
//         },
//       } = await request.get("post", {
//         params: { page, limit: LIMIT, search },
//       });
//       const posts = data.map((el) => ({ ...el, key: el._id }));
//       dispatch(updateChangeDataPosts({ posts }));
//       dispatch(updateChangeDataPosts({ total }));
//     } finally {
//       dispatch(updateChangeDataPosts({ loading: false }));
//     }
//   };

// export const changePostPage = (page, search) => (dispatch) => {
//   dispatch(updateChangeDataPosts({ activePage: page }));
//   dispatch(getCategories(page, search));
// };

// export const SearchPosts = (search) => (dispatch) => {
//   dispatch(updateChangeDataPosts({ search }));
//   dispatch(updateChangeDataPosts({ activePage: 1 }));

//   dispatch(getCategories(1, search));
// };

// export const controlPostModal = (payload) => (dispatch) => {
//   dispatch(updateChangeDataPosts({ isModalOpen: payload }));
// };

// export const uploadPostImage = (file) => async (dispatch) => {
//   try {
//     dispatch(updateChangeDataPosts({ imageLoading: true }));
//     const formData = new FormData();
//     formData.append("file", file);
//     const { data } = request.post("upload", formData);
//     // console.log(data);
//     dispatch(updateChangeDataPosts({ imageUrl: data }));
//   } catch (err) {
//     console.log(err);
//   } finally {
//     dispatch(updateChangeDataPosts({ imageLoading: true, imageUrl: null }));
//   }
// };

// export const sentPost =
//   ({ values, selected, activePage, search, form }) =>
//   async (dispatch) => {
//     try {
//       dispatch(updateChangeDataPosts({ isModalLoading: true }));
//       selected === null
//         ? await request.post("post", values)
//         : await request.put(`post/${selected}`, values);
//       dispatch(updateChangeDataPosts({ isModalOpen: false }));
//       dispatch(getCategories(activePage, search));

//       form.resetFields();
//     } finally {
//       dispatch(updateChangeDataPosts({ isModalLoading: false }));
//     }
//   };

// export const editPost = (form, id) => async (dispatch) => {
//   dispatch(updateChangeDataPosts({ selected: id, isModalOpen: true }));
//   const { data } = await request.get(`category/${id}`);
//   dispatch(updateChangeDataPosts({ imageUrl: data.photo }));

//   form.setFieldsValue(data);
// };

// export const showModalPost = (form) => async (dispatch) => {
//   dispatch(
//     updateChangeDataPosts({ selected: null, imageUrl: null, isModalOpen: true })
//   );
//   form.resetFields();
// };

// export const deletePost =
//   ({ id, search }) =>
//   async (dispatch) => {
//     await request.delete(`category/${id}`);
//     dispatch(getCategories(1, search));
//     dispatch(getCategories({ activePage: 1 }));
//   };
