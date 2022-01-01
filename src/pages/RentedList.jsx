import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import ModalDetail from '../component/ModalDetail';
import { API_URL } from '../helper';


class RentedListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            books: [],
            selectedIdx: null,
            openModal: false
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/dataUser/${this.props.iduser}`)
            .then((response) => {
                this.setState({ detail: response.data })
                this.setState({ books: this.state.detail.book })
                console.log("detail", this.state.detail)
                console.log("books Array", this.state.books)
            }).catch((err) => {
                console.log(err)
            })
    }

    printMyBook = () => {
        let { number } = this.state
        number = 0
        return this.state.detail.book &&
            this.state.detail.book.map((value, index) => {
                return (
                    <tbody style={{ textAlign: "center", margin: "auto" }}>
                        <tr>
                            <td width="50px">
                                {number += 1}
                            </td>
                            <td width="200px">
                                {value.title}
                            </td>
                            <td width="200px">
                                {value.author}
                            </td>
                            <td width="200px">
                                {value.category}
                            </td>
                            <td width="200px">
                                {value.day} Day
                            </td>
                            <td width="200px">
                                {value.startDate}
                            </td>
                            <td width="200px">
                                {value.endDate}
                            </td>
                            <td width="200px">
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Button onClick={() => this.setState({ books: value, openModal: !this.state.openModal, selectedIdx: index })}>Detail Book</Button>
                                    <Button>Return Book</Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                )
            })
    }

    render() {
        return (
            <div>
                <ModalDetail
                    books={this.state.books}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <div className='container' style={{ marginTop: "20vh", width: "99vw" }}>
                    <Table bordered>
                        <thead style={{ textAlign: "center" }}>
                            <tr>
                                <th>
                                    No
                                </th>
                                <th>
                                    Title
                                </th>
                                <th>
                                    Author
                                </th>
                                <th>
                                    Category
                                </th>
                                <th>
                                    Day Rent
                                </th>
                                <th>
                                    Start Date
                                </th>
                                <th>
                                    End Date
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {this.printMyBook()}
                    </Table>
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        iduser: state.userReducer.id
    }
}

export default connect(mapToProps)(RentedListPage);