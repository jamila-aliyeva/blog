import {
  CATEGORY_FETCHING,
  CATEGORY_LOADING,
  CATEGORY_PAGE,
  CATEGORY_SEARCH,
  CATEGORY_TOTAL,
} from "../type/categories";

const initialState = {
  categories: [],
  total: 0,
  ActivePage: 1,
  loading: false,
  error: null,
  search: "",
};
const categoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORY_LOADING:
      return { ...state, loading: payload };
    case CATEGORY_FETCHING:
      return { ...state, categories: payload };
    case CATEGORY_TOTAL:
      return { ...state, total: payload };
    case CATEGORY_PAGE:
      return { ...state, activePage: payload };
    case CATEGORY_SEARCH:
      return { ...state, search: payload };
  }
  return state;
};
export default categoriesReducer;
