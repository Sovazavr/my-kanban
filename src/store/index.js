
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"

const rootReducer = combineReducers({
    user: userReducer,
})


const createStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}
const store = createStore()
export default store