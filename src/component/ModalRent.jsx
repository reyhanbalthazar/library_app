import React from 'react'
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

class ModalRent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let { title, author, image, category, desc, year } = this.props.detailBook
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.toggleModal}>
                <ModalHeader style={{justifyContent:"center"}}>Rent This Book?</ModalHeader>
                <ModalBody style={{textAlign:"center"}}>
                    <div>
                        <img src={image} width="100%" />
                    </div>
                    <FormGroup>
                        <Label style={{fontWeight:"bold", fontSize:"20"}}>{title}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>{author}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>{year}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Label>{category}</Label>
                    </FormGroup>
                    <FormGroup className="border rounded p-5">
                        <Label style={{fontWeight:"bold"}}>Description</Label>
                        <Label>{desc}</Label>
                    </FormGroup>
                    <FormGroup>
                        <Button>Rent</Button>
                    </FormGroup>
                </ModalBody>
            </Modal>
        )
    }
}

export default connect(null)(ModalRent);