import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { Card, CardBody, CardTitle, CardSubtitle, CardGroup, Button, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux';
import ModalRent from '../component/ModalRent';

class BookListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            detailBook: {},
            selectedIdx: null,
            openModal: false,
            page: 1
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
        let { page } = this.state
        return this.state.books.slice(page > 1 ? (page - 1) * 6 : page - 1, page * 6).map((value, index) => {
            return <div className="col-3 m-5" style={{ textAlign: "center" }}>
                <CardGroup>
                    <Card className="shadow">
                        <div style={{padding:"20px"}}>
                            <img alt='...' src={value.image} width="100%" />
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
                                        onClick={() => this.setState({ detailBook: value, openModal: !this.state.openModal, selectedIdx: index })}
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

    printBtPagination = () => {
        let btn = []
        for (let i = 0; i < Math.ceil(this.state.books.length / 6); i++) {
            btn.push(<Button outline color="primary"
                disabled={this.state.page === i + 1 ? true : false}
                onClick={() => this.setState({ page: i + 1 })} >
                {i + 1}
            </Button>)
        }
        return btn
    }

    render() {
        return (
            <div style={{ marginTop: "70px", marginBottom:"70px" }}>
                <ModalRent
                    detailBook={this.state.detailBook}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <div className="row" style={{ justifyContent: "center", width:"99vw" }} >
                    {this.printBooks()}
                </div>
                <div className="text-center">
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
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