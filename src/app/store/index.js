import { combineReducers } from "redux";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import data from "./data";


const rootReducer = combineReducers({
  data: persistReducer({ key: "data", storage, blacklist: ['rates', 'date'] }, data)
});

export default rootReducer;
