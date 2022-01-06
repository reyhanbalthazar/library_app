import React from 'react'
import { Button, FormGroup, Input, Label, Modal, ModalBody } from 'reactstrap';

class ModalEdit extends React.Component {
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
                        <Input defaultValue={title} />
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Input defaultValue={author} />
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Input defaultValue={year} />
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Input defaultValue={category} />
                    </FormGroup>
                    <FormGroup className="border rounded p-3" className="row">
                        <Label style={{ fontWeight: "bold" }}>Description</Label>
                        <div>
                            <textarea style={{ height: "200px", width: "100%" }} defaultValue={desc} />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary">Save</Button>
                    </FormGroup>
                </ModalBody>
            </Modal>
        )
    }
}

export default ModalEdit;