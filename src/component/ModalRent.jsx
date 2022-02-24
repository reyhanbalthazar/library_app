import React from 'react'
import { FormGroup, Label, Modal, ModalBody, Button } from 'reactstrap';

class ModalRent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        let { title, author, image, description, year, category } = this.props.detailBook
        return (
            <Modal isOpen={this.props.openModal} toggle={this.props.toggleModal} size="xl">
                <ModalBody style={{ textAlign: "center" }}>
                    <div style={{ display: "flex" }}>
                        <div>
                            <img alt='...' src={image} height="700vh" />
                        </div>
                        <div style={{ margin: "auto", paddingRight: "60px" }}>
                            <FormGroup>
                                <Label style={{ fontWeight: "bold", fontSize: "25px" }}>{title}</Label>
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Label>{author}, {year}</Label>
                            </FormGroup>
                            <hr />
                            <FormGroup>
                                <Button outline style={{ width: "100px", borderRadius: 45 }}>{category}</Button>
                                {/* <Label>{category}</Label> */}
                            </FormGroup>
                            <hr />
                            <FormGroup className="border rounded p-3">
                                <Label style={{ fontWeight: "bold" }}>Description</Label>
                                <Label>{description}</Label>
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}

export default ModalRent;