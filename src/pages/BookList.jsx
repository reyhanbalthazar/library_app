import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { Card, CardBody, CardTitle, CardSubtitle, CardGroup, Button, ButtonGroup, Input, InputGroup } from 'reactstrap'
import { connect } from 'react-redux';
import ModalRent from '../component/ModalRent';
import { Link } from 'react-router-dom';
import { getBookAction } from '../redux/actions/bookAction';

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
        console.log("book list", this.props.booksList)
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

    btSort = () => {
        console.log(this.inSearchSort.value)
        if (this.inSearchSort.value === "nama-asc") {
            this.props.getBookAction({
                namaAsc: this.inSearchSort.value
            })
        } else if (this.inSearchSort.value === "nama-desc") {
            this.props.getBookAction({
                namaDesc: this.inSearchSort.value
            })
        } else {
            this.props.getBookAction()
        }
    }

    btReset = () => {
        this.props.getBookAction()
        this.inSearchName.value = ""
        this.inSearchCategory.value = ""
    }

    btSearch = () => {
        this.props.getBookAction(this.inSearchName.value, this.inSearchCategory.value)
        this.setState({ page: 1 })
    }

    printSort = () => {
        return (
            <div className='container'>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "100px" }}>
                    <InputGroup style={{ width: "350px", float: "left" }}>
                        <Input type="text" id="text" placeholder="Search By Title"
                            innerRef={(element) => this.inSearchName = element} />
                        <Input type="text" id="text" placeholder="Search By Category"
                            innerRef={(element) => this.inSearchCategory = element} />
                    </InputGroup>
                    <Input type="select" style={{ width: "250px", float: "right" }} innerRef={(element) => this.inSearchSort = element}>
                        <option value="nama-asc">A-Z</option>
                        <option value="nama-desc">Z-A</option>
                        <option value="id-asc">Reset</option>
                    </Input>
                    <Button color="primary" onClick={this.btSort}>Sort</Button>
                </div>
                <div style={{ float: "right", marginTop: "5px" }}>
                    <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                    <Button color="primary" onClick={this.btSearch}>Filter</Button>
                </div>
            </div>
        )
    }

    printBooks = () => {
        let { page } = this.state
        return this.props.booksList.slice(page > 1 ? (page - 1) * 6 : page - 1, page * 6).map((value, index) => {
            return <div className="col-3 m-4" style={{ textAlign: "center" }}>
                <CardGroup>
                    <Card className="shadow">
                        <div style={{ padding: "20px" }}>
                            <img onClick={() => this.setState({ detailBook: value, openModal: !this.state.openModal, selectedIdx: index })} alt='...' src={value.image} width="50%" />
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
                                    <></>
                                    :
                                    <></>
                            }
                            <Link to={`/rent?id=${value.id}`}>
                                <Button color="primary">Click here to Rent this Book</Button>
                            </Link>
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
            <div style={{ marginTop: "70px", marginBottom: "70px" }}>
                <ModalRent
                    detailBook={this.state.detailBook}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <div>
                    {this.printSort()}
                </div>
                <div className="row" style={{ justifyContent: "center", width: "99vw" }} >
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

const mapToProps = ({ bookReducer }) => {
    console.table(bookReducer.booksList)
    return {
        booksList: bookReducer.booksList
    }
}

export default connect(mapToProps, { getBookAction })(BookListPage);