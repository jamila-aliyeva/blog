// import {
//   // POSTS_FETCHING,
//   // POSTS_LOADING,
//   // POSTS_PAGE,
//   // POSTS_SEARCH,
//   // POSTS_TOTAL,
//   POSTS_ACTIONS,
// } from "../type/posts";

// const initialState = {
//   categories: [],
//   total: 0,
//   ActivePage: 1,
//   loading: false,
//   error: null,
//   search: "",
//   selected: null,
//   isModalOpen: false,
//   isModalLoading: false,
//   imageUrl: null,
//   imageLoading: false,
// };
// const postsReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case POSTS_LOADING:
//       return { ...state, loading: payload };
//     case POSTS_FETCHING:
//       return { ...state, categories: payload };
//     case POSTS_TOTAL:
//       return { ...state, total: payload };
//     case POSTS_PAGE:
//       return { ...state, activePage: payload };
//     case POSTS_SEARCH:
//       return { ...state, search: payload };
//   }
//   return state;

// const postsReducer = (state = initialState, { type, payload }) => {
//   switch (type) {
//     case POSTS_ACTIONS:
//       return { ...state, ...payload };
//   }
//   return state;
// };
// export default postsReducer;
