import React from 'react'
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
                        <img alt='...' src={image} width="50%" />
                    </div>
                    <hr/>
                    <FormGroup>
                        <Label style={{fontWeight:"bold", fontSize:"25px"}}>{title}</Label>
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <Label>{author}</Label>
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <Label>{year}</Label>
                    </FormGroup>
                    <hr/>
                    <FormGroup>
                        <Label>{category}</Label>
                    </FormGroup>
                    <FormGroup className="border rounded p-3">
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