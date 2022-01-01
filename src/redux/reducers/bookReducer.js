const INITIAL_STATE = {
    booksList: []
}

export const bookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_BOOKS_SUCCESS":
            console.log("GET BOOK bookReducer", action.payload)
            return { ...state, booksList: action.payload };
        default:
            return state;
    }
}