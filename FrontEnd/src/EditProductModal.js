import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form, Image } from 'react-bootstrap';

export class EditProductModal extends Component {
    //Initializing states
    constructor(props) {
        super(props);
        this.state = { cats: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Setting state values
    componentDidMount() {
        fetch(process.env.REACT_APP_API + 'productcategory')
            .then(response => response.json())
            .then(data => {
                this.setState({ cats: data });
            });
    }

    handleSubmit(event) {
        event.preventDefault(); //To prevent page reload
        //Put request for updating data
        fetch(process.env.REACT_APP_API + 'product', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ProductId: event.target.ProductId.value,
                ProductName: event.target.ProductName.value,
                Category: event.target.Category.value,
                Cost: event.target.Cost.value,
                ProductDescription: event.target.ProductDescription.value,
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
                            Edit Product
                </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={3}>
                            </Col>
                            <Col sm={7}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="ProductId">
                                        <Form.Label>ProductId</Form.Label>
                                        <Form.Control type="text" name="ProductId" required
                                            disabled
                                            defaultValue={this.props.productid} />
                                    </Form.Group>
                                    <Form.Group controlId="ProductName">
                                        <Form.Label>ProductName</Form.Label>
                                        <Form.Control type="text" name="ProductName" required
                                            defaultValue={this.props.productname}
                                            placeholder="ProductName" />
                                    </Form.Group>
                                    <Form.Group controlId="Category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.cat} >
                                            {this.state.cats.map(cat =>
                                                <option key={cat.CategoryId}>{cat.CategoryName}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="Cost">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control type="text" name="Cost" required
                                            defaultValue={this.props.cost}
                                            placeholder="Cost" />
                                    </Form.Group>
                                    <Form.Group controlId="ProductDescription">
                                        <Form.Label>ProductDescription</Form.Label>
                                        <Form.Control as="textarea" name="ProductDescription" required
                                            defaultValue={this.props.des}
                                            placeholder="ProductDescription" />
                                    </Form.Group>
                                    <Form.Group controlId="Status">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control as="select" defaultValue={this.props.sts}  >
                                            <option key="Active">Active</option>
                                            <option key="In Active">In Active</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Product
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