import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getBookAction } from '../redux/actions/bookAction';
import { Card, CardBody, CardGroup, CardTitle, CardSubtitle, Button, ButtonGroup } from 'reactstrap'
import ModalEdit from '../component/ModalEdit';
import ModalAdd from '../component/ModalAdd';
import { API_URL } from '../helper';


class BookManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailBook: {},
            selectedIdx: null,
            openModal: false,
            openModalAdd: false,
            page: 1
        }
    }

    onBtDelete = (index) => {
        let confirm = window.confirm("Are you sure Delete this books?")
        if (confirm) {
            axios.delete(`${API_URL}/books/${index}`)
                .then((res) => {
                    this.props.getBookAction();
                }).catch((err) => {
                    console.log(err)
                })
        } else {
            alert("cancel delete")
        }
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
                            <Button onClick={() => this.setState({ detailBook: value, openModal: !this.state.openModal, selectedIdx: index })}>Edit Book</Button>
                            <Button onClick={() => this.onBtDelete(value.id)}>Delete</Button>
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
            <div style={{ marginTop: "100px" }}>
                <ModalEdit
                    detailBook={this.state.detailBook}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <ModalAdd
                    openModalAdd={this.state.openModalAdd}
                    toggleModal={() => this.setState({ openModalAdd: !this.state.openModalAdd })}
                    btClose={() => this.setState({ modalAddOpen: !this.state.modalAddOpen })}
                />
                <div className='container btn'>
                    <Button onClick={() => this.setState({ openModalAdd: !this.state.openModalAdd })} color='primary'>ADD</Button>
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
        )
    }
}

const mapToProps = ({ bookReducer }) => {
    return {
        booksList: bookReducer.booksList
    }
}

export default connect(mapToProps, { getBookAction })(BookManagementPage);