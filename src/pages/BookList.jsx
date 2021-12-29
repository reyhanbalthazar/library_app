import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardGroup, CardImg, Button, Row, Col } from 'reactstrap'
import { connect } from 'react-redux';
import ModalRent from '../component/ModalRent';

class BookListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            detailBook: {},
            selectedIdx: null,
            openModal: false
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/books`)
            .then((response) => {
                console.log("GET DATA BOOKS", response.data)
                this.setState({ books: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    printBooks = () => {
        return this.state.books.map((value, index) => {
            return <div className="col-3 m-5" style={{ textAlign: "center" }}>
                <CardGroup>
                    <Card>
                        <div>
                            <img src={value.image} width="100%" />
                        </div>
                        <CardBody>
                            <CardTitle tag="h5">
                                {value.title}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {value.category}
                            </CardSubtitle>
                            {
                                this.props.username
                                    ?
                                    <Button
                                    color="primary"
                                        onClick={() => this.setState({ detailBook: value, openModal: !this.state.openModal, selectedIdx:index })}
                                    >
                                        Rent
                                    </Button>
                                    :
                                    <></>
                            }
                        </CardBody>
                    </Card>
                </CardGroup>
            </div>

        })
    }

    render() {
        return (
            <div style={{ marginTop: "100px" }}>
                <ModalRent
                    detailBook={this.state.detailBook}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <div className="row" style={{ justifyContent: "center" }} >
                    {this.printBooks()}
                </div>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username
    }
}

export default connect(mapToProps)(BookListPage);