// for categories

import { LIMIT } from "../../constants";
import request from "../../server";
import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_PAGE,
  CATEGORY_SEARCH,
  CATEGORY_TOTAL,
} from "../type/categories";

export const getCategories = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("category", {
        params: { page, limit: LIMIT, search },
      });
      console.log(data);
      dispatch({ type: CATEGORY_FETCHING, payload: data });
      dispatch({ type: CATEGORY_TOTAL, payload: total });
    } finally {
      dispatch({ type: CATEGORY_LOADING, payload: false });
    }
  };
};

export const changePage = (page) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_PAGE, payload: page });
    dispatch(getCategories(page));
  };
};

export const SearchCategories = (search) => {
  return (dispatch) => {
    dispatch({ type: CATEGORY_SEARCH, payload: search });
    dispatch({ type: CATEGORY_SEARCH, payload: 1 });

    dispatch(getCategories(1, search));
  };
};

// FOR POSTS

import {
  POSTS_FETCHING,
  POSTS_LOADING,
  POSTS_PAGE,
  POSTS_SEARCH,
  POSTS_TOTAL,
} from "../type/posts";

export const getPosts = (page = 1, search = "") => {
  return async (dispatch) => {
    try {
      dispatch({ type: POSTS_LOADING, payload: true });
      const {
        data: {
          data,
          pagination: { total },
        },
      } = await request.get("post", {
        params: { page, limit: LIMIT, search },
      });
      console.log(data);
      dispatch({ type: POSTS_FETCHING, payload: data });
      dispatch({ type: POSTS_TOTAL, payload: total });
    } finally {
      dispatch({ type: POSTS_LOADING, payload: false });
    }
  };
};

export const changePostspage = (page) => {
  return (dispatch) => {
    dispatch({ type: POSTS_PAGE, payload: page });
    dispatch(changePostspage(page));
  };
};

export const SearchPosts = (search) => {
  return (dispatch) => {
    dispatch({ type: POSTS_SEARCH, payload: search });
    dispatch({ type: POSTS_SEARCH, payload: 1 });

    dispatch(changePostspage(1, search));
  };
};
