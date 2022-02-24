const INITIAL_STATE = {
    booksList: [],
    categoryList: []
}

export const bookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_BOOKS_SUCCESS":
            console.log("GET BOOK bookReducer", action.payload)
            return { ...state, booksList: action.payload };
        case "GET_DATA_CATEGORY":
            console.log("GET DATA categoryReducer", action.payload)
            return { ...state, categoryList: action.payload };
        default:
            return state;
    }
}