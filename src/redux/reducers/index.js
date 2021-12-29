import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { bookReducer } from "./bookReducer";

export const rootReducers = combineReducers({
    userReducer,
    bookReducer
})