import React from 'react';
import { FormGroup, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';

class ModalDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let { title, image, category, description } = this.props.books
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.toggleModal}>
                <ModalHeader style={{ justifyContent: "center" }}>Book Detail</ModalHeader>
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
                        <Label>{category}</Label>
                    </FormGroup>
                    <hr />
                    <FormGroup className="border rounded p-3">
                        <Label style={{ fontWeight: "bold" }}>Description</Label>
                        <Label>{description}</Label>
                    </FormGroup>
                </ModalBody>
            </Modal>
        );
    }
}

export default ModalDetail;