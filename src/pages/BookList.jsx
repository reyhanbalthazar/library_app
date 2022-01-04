import React from 'react';
import axios from 'axios';
import { API_URL } from '../helper';
import { Card, CardBody, CardTitle, CardSubtitle, CardGroup, Button, ButtonGroup, Input, InputGroup, Label, Collapse } from 'reactstrap'
import { connect } from 'react-redux';
import ModalRent from '../component/ModalRent';
import { Link } from 'react-router-dom';
import { getBookAction } from '../redux/actions/bookAction';

class BookListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksCategory: [],
            detailBook: {},
            selectedIdx: null,
            openModal: false,
            page: 1,
            collapseIsOpen: false
        }
    }


    getData = () => {
        axios.get(`${API_URL}/booksCategory`)
            .then((response) => {
                console.log("response.data booksCategory", response.data)
                this.setState({ booksCategory: response.data })
                console.log("this.state.booksCategory", this.state.booksCategory)
            }).catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getData()
    }

    btSort = () => {
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
        this.inSearchSort.value = ""
    }

    btSearch = () => {
        this.props.getBookAction(this.inSearchName.value, this.inSearchCategory.value)
        this.setState({ page: 1 })
    }

    printSort = () => {
        return (
            <div className='container' style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <Label style={{ width: "250px" }}>Search by Title</Label>
                    <Label style={{ width: "250px" }}>Filter By Category</Label>
                    <Label style={{ width: "250px" }}>Sort</Label>
                    <Label></Label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div style={{ width: "250px", display: "flex" }}>
                        <InputGroup style={{ width: "250px", float: "left" }}>
                            <Input type="text" id="text" placeholder="Search By Title"
                                innerRef={(element) => this.inSearchName = element} />
                        </InputGroup>
                        <Button color="primary" onClick={this.btSearch}>Search</Button>
                    </div>
                    <div style={{ width: "250px", display: "flex" }}>
                        <Input type="select" style={{ width: "250px", float: "right" }} innerRef={(element) => this.inSearchCategory = element}>
                            <option> </option>
                            {
                                this.state.booksCategory &&
                                this.state.booksCategory.map((value, index) => {
                                    return <>
                                        <option key={index} value={value.category}>{value.category}</option>
                                    </>

                                })
                            }
                        </Input>
                        <Button color="primary" onClick={this.btSearch}>Filter</Button>
                    </div>
                    <div style={{ width: "250px", display: "flex" }}>
                        <Input type="select" innerRef={(element) => this.inSearchSort = element}>
                            <option> </option>
                            <option value="nama-asc">A-Z</option>
                            <option value="nama-desc">Z-A</option>
                            <option value="id-asc">Reset</option>
                        </Input>
                        <Button style={{ marginLeft: "10px" }} color="primary" onClick={this.btSort}>Sort</Button>
                    </div>
                    <div>
                        <Button outline color="warning" onClick={this.btReset}>Reset</Button>
                    </div>
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
        for (let i = 0; i < Math.ceil(this.props.booksList.length / 6); i++) {
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
                <div className="row" style={{ justifyContent: "center", width: "99vw" }} >
                    <div style={{ justifyContent: "center", display: "flex" }}>
                        <p style={{ marginTop: "30px" }} onClick={() => this.setState({ collapseIsOpen: !this.state.collapseIsOpen })}>
                            {
                                this.state.collapseIsOpen === true
                                    ?
                                    <Button onClick={this.btReset} color='warning' >
                                        Close Search
                                    </Button>
                                    :
                                    <Button color='primary'>
                                        Seach Book
                                    </Button>

                            }
                        </p>
                    </div>
                    <Collapse isOpen={this.state.collapseIsOpen}>
                        {this.printSort()}
                    </Collapse>
                    {this.printBooks()}
                </div>
                <div className="text-center">
                    <ButtonGroup>
                        {this.printBtPagination()}
                    </ButtonGroup>
                </div>
            </div >
        );
    }
}

const mapToProps = ({ bookReducer }) => {
    return {
        booksList: bookReducer.booksList
    }
}

export default connect(mapToProps, { getBookAction })(BookListPage);