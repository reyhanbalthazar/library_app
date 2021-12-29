const INITIAL_STATE = {
    booksList: []
}

export const bookReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_DATA_BOOK":
            console.log("GET DATA BOOKS", action.payload)
            return { ...state, booksList: action.payload };
        default:
            return state
    }
}