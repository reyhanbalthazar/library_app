import axios from "axios";
import { API_URL } from "../../helper";

export const getBookAction = (data) => {
    console.log("GET DATA BOOKS ACTION", data)
    return {
        type:"GET_BOOKS_SUCCESS",
        payload:data
    }
}