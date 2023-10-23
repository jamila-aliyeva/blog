import {
  // CATEGORY_CONTROL_MODAL,
  // CATEGORY_FETCHING,
  // CATEGORY_LOADING,
  // CATEGORY_PAGE,
  // CATEGORY_SEARCH,
  // CATEGORY_TOTAL,
  CATEGORY_ACTIONS,
} from "../type/categories";

const initialState = {
  categories: [],
  total: 0,
  ActivePage: 1,
  loading: false,
  error: null,
  search: "",
  selected: null,
  isModalOpen: false,
  isModalLoading: false,
  imageUrl: null,
  imageLoading: false,
};
// const categoriesReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case CATEGORY_LOADING:
//       return { ...state, loading: payload };
//     case CATEGORY_FETCHING:
//       return { ...state, categories: payload };
//     case CATEGORY_TOTAL:
//       return { ...state, total: payload };
//     case CATEGORY_PAGE:
//       return { ...state, activePage: payload };
//     case CATEGORY_SEARCH:
//       return { ...state, search: payload };
//     case CATEGORY_CONTROL_MODAL:
//       return { ...state, isModalOpen: payload };
//   }
//   return state;
const categoriesReducer = (state = initialState, { type, payload }) => {
  ///payload obj sifasida keladi va pastga payload'ni mapping qilamiz
  switch (type) {
    case CATEGORY_ACTIONS:
      return { ...state, ...payload };
  }
  return state;
};
export default categoriesReducer;
