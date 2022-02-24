import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { API_URL } from '../helper';

class ModalAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        }
    }

    btSave = () => {
        let formData = new FormData();
        let data = {
            title: this.inTitle.value,
            author: this.inAuthor.value,
            idcategory: this.inCategory.value,
            year: this.inYear.value,
            desc: this.inDesc.value,
            status: "Active",
            images: this.state.images
        }
        console.log("TESTING SAVE : ", data)
        formData.append('data', JSON.stringify(data));
        formData.append('images', this.state.images.file)
        axios.post(`${API_URL}/books`, formData)
            .then(res => {
                console.log("res.data", res.data)
                alert("Add Product Success")
            }).catch(err => {
                console.log(err)
            })
    }

    printImages = () => {
        if (this.state.images.length > 0) {
            return this.state.images.map((item, index) => {
                console.log("item", item)
                return <Row>
                    <Col>
                        {
                            item.file ?
                                <img alt="img" style={{ width: "100px", height: "100px" }} src={URL.createObjectURL(item.file)} />
                                :
                                <img alt="img" style={{ width: "100px", height: "100px" }} src='https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png' />
                        }
                        <Input type="file"
                            onChange={(e) => this.handleImages(e, index)} />
                    </Col>
                </Row>
            })
        }
    }

    handleImages = (e) => {
        let temp = [...this.state.images]
        temp = { name: e.target.files[0].name, file: e.target.files[0] }
        this.setState({ images: temp })
    }

    render() {
        return (
            <Modal isOpen={this.props.openModalAdd} toggle={this.props.toggleModal} size="xl">
                <ModalHeader toggle={this.props.toggleModal}>Add Books</ModalHeader>
                <ModalBody style={{ textAlign: "center" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ margin: "auto", paddingRight: "60px" }}>
                            <FormGroup>
                                <Label for="textTitle">Title</Label>
                                <Input type="text" id="textNama" style={{width:"400px"}} innerRef={elemen => this.inTitle = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="textAuthor">Author</Label>
                                <Input type="text" id="textDes" innerRef={elemen => this.inAuthor = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="textYear">Year</Label>
                                <Input type="text" id="textDes" innerRef={elemen => this.inYear = elemen} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="textDesc">Desc</Label>
                                <Input type="textarea" id="textDes" innerRef={elemen => this.inDesc = elemen} />
                            </FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="textKategori">Kategori</Label>
                                        <Input type="select" id="selectCategory" innerRef={elemen => this.inCategory = elemen} >
                                            <option> </option>
                                            {
                                                this.props.categoryList &&
                                                this.props.categoryList.map((val, index) => {
                                                    return <option value={val.idcategory} key={index}>{val.category}</option>
                                                })
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <hr />
                            <Button type="button" color="primary" onClick={this.btSave}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.onBtCancel}>Cancel</Button>
                        </div>
                        <div>
                            <FormGroup>
                                <Label>Images</Label>
                                {
                                    this.state.images.file ?
                                    <img alt="img" width="600vh" src={URL.createObjectURL(this.state.images.file)} />
                                    :
                                    <img alt="img" width="600vh" src='https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png' />
                                }
                                {this.printImages()}
                                <Input style={{marginTop:"20px"}} type='file' onChange={(e) => this.handleImages(e)} >Browse Image</Input>
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

const mapToProps = (state) => {
    return {
        categoryList: state.bookReducer.categoryList
    }
}

export default connect(mapToProps)(ModalAdd);