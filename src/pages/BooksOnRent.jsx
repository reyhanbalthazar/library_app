import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { API_URL } from "../helper";

class BooksOnRentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksOnRent: []
        }
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((response) => {
                console.log("getData books", response.data)
                this.setState({ booksOnRent: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div style={{ marginTop: "70px" }}>
                books on rent
                role = admin
            </div>
        )
    }
}

const mapToProps = (state) => {
    return {
        book: state.userReducer.book
    }
}

export default connect(mapToProps)(BooksOnRentPage);