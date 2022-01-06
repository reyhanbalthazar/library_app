import React from 'react';
import { connect } from 'react-redux';
import { getBookAction } from '../redux/actions/bookAction';
import { Card, CardBody, CardGroup, CardTitle, CardSubtitle, Button } from 'reactstrap'
import ModalEdit from '../component/ModalEdit';

class BookManagementPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailBook: {},
            selectedIdx: null,
            openModal: false,
            page: 1
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
                        </CardBody>
                    </Card>
                </CardGroup>
            </div>
        })
    }

    render() {
        return (
            <div style={{ marginTop: "100px" }}>
                <ModalEdit
                    detailBook={this.state.detailBook}
                    openModal={this.state.openModal}
                    toggleModal={() => this.setState({ openModal: !this.state.openModal })}
                />
                <div className="row" style={{ justifyContent: "center", width: "99vw" }} >
                    {this.printBooks()}
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