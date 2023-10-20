import { applyMiddleware, combineReducers, createStore } from "redux";
import categoriesReducer from "../reducer/categories";
import thunk from "redux-thunk";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import postsReducer from "../reducer/posts";

const rootReducer = combineReducers({
  categories: categoriesReducer,
  posts: postsReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));

const StoreProvider = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

StoreProvider.prototype = {
  children: PropTypes.node,
};
export default StoreProvider;
