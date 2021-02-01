import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditCatModal extends Component {
    //Initializing states
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); //To prevent page reload
        //Put request for updating data
        fetch(process.env.REACT_APP_API + 'productcategory', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CategoryId: event.target.CategoryId.value,
                CategoryName: event.target.CategoryName.value,
                Description: event.target.Description.value,
                Status: event.target.Status.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Category
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="CategoryId">
                                        <Form.Label>CategoryId</Form.Label>
                                        <Form.Control type="text" name="CategoryId" required
                                            disabled
                                            defaultValue={this.props.catid} />
                                    </Form.Group>

                                    <Form.Group controlId="CategoryName">
                                        <Form.Label>CategoryName</Form.Label>
                                        <Form.Control type="text" name="CategoryName" required
                                            defaultValue={this.props.catname}
                                            placeholder="CategoryName" />
                                    </Form.Group>
                                    <Form.Group controlId="Description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control as="textarea" name="Description" required
                                            defaultValue={this.props.catdes}
                                            placeholder="Description" />
                                    </Form.Group>
                                    <Form.Group controlId="Status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.catsts}  >
                                            <option key="Active">Active</option>
                                            <option key="In Active">In Active</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Category
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}