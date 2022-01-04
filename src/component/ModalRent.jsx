import React from 'react'
import { FormGroup, Label, Modal, ModalBody } from 'reactstrap';

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
                <ModalBody style={{ textAlign: "center" }}>
                    <div>
                        <img alt='...' src={image} width="100%" />
                    </div>
                    <hr />
                    <FormGroup>
                        <Label style={{ fontWeight: "bold", fontSize: "25px" }}>{title}</Label>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label>{author}</Label>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label>{year}</Label>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label>{category}</Label>
                    </FormGroup>
                    <FormGroup className="border rounded p-3">
                        <Label style={{ fontWeight: "bold" }}>Description</Label>
                        <Label>{desc}</Label>
                    </FormGroup>
                </ModalBody>
            </Modal>
        )
    }
}

export default ModalRent;