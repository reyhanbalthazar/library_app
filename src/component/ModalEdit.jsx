import axios from 'axios';
import React from 'react'
import { connect } from 'react-redux';
import { Button, FormGroup, Input, Label, Modal, ModalBody } from 'reactstrap';
import { API_URL } from '../helper';
import { getBookAction } from '../redux/actions/bookAction';

class ModalEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
    }

    btSave = () => {
        let data = {
            title: this.inTitle.value,
            author: this.inAuthor.value,
            idcategory: this.inCategory.value,
            year: this.inYear.value,
            description: this.inDesc.value,
        }
        console.log("TESTING SAVE : ", data)
        axios.patch(`${API_URL}/books/${this.props.detailBook.id}`, data)
            .then((res) => {
                this.props.getBookAction();
                this.props.toggleModal()
                this.setState({ edit: !this.state.edit })
            }).catch((err) => {
                console.log(err)
            })
    }

    render() {
        console.log("categorylist", this.props.categoryList)
        let { title, author, image, category, description, year, idcategory } = this.props.detailBook
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.toggleModal} size="xl">
                <ModalBody style={{ textAlign: "center" }}>
                    <div style={{ display: "flex" }}>
                        <div>
                            <img alt='...' src={image} width="700vh" />
                        </div>
                        <div style={{ margin: "auto", paddingRight: "60px" }}>
                            <FormGroup>
                                <Input disabled={!this.state.edit} defaultValue={title} innerRef={elemen => this.inTitle = elemen} />
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Input disabled={!this.state.edit} defaultValue={author} innerRef={elemen => this.inAuthor = elemen} />
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Input disabled={!this.state.edit} defaultValue={year} innerRef={elemen => this.inYear = elemen} />
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Label for="textKategori">Kategori</Label>
                                <Input type="select" id="selectCategory" innerRef={elemen => this.inCategory = elemen} defaultValue={category}>
                                    <option value={idcategory} >{category}</option>
                                    {
                                        this.props.categoryList &&
                                        this.props.categoryList.map((val, index) => {
                                            if (idcategory !== val.idcategory) {
                                                return <option value={val.idcategory} key={val.idcategory}>{val.category}</option>
                                            }
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup className="border rounded p-3 row">
                                <Label style={{ fontWeight: "bold" }}>Description</Label>
                                <div>
                                    <Input disabled={!this.state.edit} style={{ height: "200px", width: "100%" }} defaultValue={description} innerRef={elemen => this.inDesc = elemen} />
                                </div>
                            </FormGroup>
                            <FormGroup>
                                {
                                    this.state.edit ?
                                        <Button color="primary" onClick={this.btSave}>Save</Button>
                                        :
                                        <Button
                                            onClick={() => {
                                                this.setState({ edit: !this.state.edit })
                                            }}
                                            color="primary">Edit</Button>

                                }
                                <Button
                                    onClick={() => {
                                        this.props.toggleModal()
                                    }}
                                    color="primary">Cancel</Button>
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

const mapToProps = (state) => {
    return {
        categoryList: state.bookReducer.categoryList
    }
}

export default connect(mapToProps, { getBookAction })(ModalEdit);