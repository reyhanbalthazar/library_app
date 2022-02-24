import axios from "axios";
import { API_URL } from "../../helper";

export const getBookAction = (search = null, searchCategory = null) => {
    // console.log("GET DATA BOOKS ACTION", search)
    return async (dispatch) => {
        try {
            let res;
            console.log("cek SEARCH Title", search)
            console.log("cek SEARCH Category", searchCategory)


            // if (search) {
            //     if (searchCategory) {
            //         res = await axios.get(`${API_URL}/books?category=${searchCategory}`)
            //     } else {
            //         res = await axios.get(`${API_URL}/books?title=${search}`)
            //     }
            // } else {
            //     res = await axios.get(`${API_URL}/books`)
            // }

            if (search) {
                console.log("cek SEARCH Title", search)
                res = await axios.get(`${API_URL}/books?title=${search}`)
            } else if (searchCategory) {
                console.log("cek search category", searchCategory)
                res = await axios.get(`${API_URL}/books?category=${searchCategory}`)
            } else {
                res = await axios.get(`${API_URL}/books`)
            }

            if (search) {
                if (search.namaAsc) {
                    console.log("cek namaAsc", search.namaAsc)
                    res = await axios.get(`${API_URL}/books?_sort=title&_order=asc`)
                }
                if (search.namaDesc) {
                    console.log("cek namaDesc", search.namaDesc)
                    res = await axios.get(`${API_URL}/books?_sort=title&_order=desc`)
                }
            }
            dispatch({
                type: "GET_BOOKS_SUCCESS",
                payload: res.data.dataBooks
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const getCategory = () => {
    return async (dispatch) => {
        try {
            let resCategory = await axios.get(`${API_URL}/books/getcategory`);
            dispatch({
                type: "GET_DATA_CATEGORY",
                payload: resCategory.data.categoryList 
            })
        } catch (error) {
            console.log(error)
        }
    }
}