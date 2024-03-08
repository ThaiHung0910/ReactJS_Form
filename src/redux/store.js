import { configureStore } from "@reduxjs/toolkit";
import ManageStudentReducer from "./reducers/ManageStudentReducer";

export const store = configureStore({
    reducer : {
        form: ManageStudentReducer,
    }
})