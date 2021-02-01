import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddProductModal } from './AddProductModal';
import { EditProductModal } from './EditProductModal';

export class Product extends Component {
    //Initializing states
    constructor(props) {
        super(props);
        this.state = { products: [], addModalShow: false, editModalShow: false, search: "" }
    }

    refreshList() {
        //Fetching data through REST API
        fetch(process.env.REACT_APP_API + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }

    //Setting state value
    onchange = e => {
        this.setState({ search: e.target.value });
    }

    //Refreshing product list during page load
    componentDidMount() {
        this.refreshList();
    }

    //Refreshing product list after update product
    componentDidUpdate() {
        this.refreshList();
    }

    //For deleting product
    deleteProduct(productid) {
        if (window.confirm('Are you sure?')) {
            //Passing product_id through REST API
            fetch(process.env.REACT_APP_API + 'product/' + productid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    
    render() {
        //Setting state values
        const { products, productid, productname, cat, cost, des, sts, search } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <input className="mt-4" striped bordered hover size="sm" placeholder="Search Product" icon="search" onChange={this.onchange} />
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>ProductName</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.filter((product) => {
                            if (search == "") {
                                return product
                            } else if (product.ProductName.toLowerCase().includes(search.toLowerCase())) {
                                return product
                            }
                        }).map(product =>
                            <tr key={product.ProductId}>
                                <td>{product.ProductId}</td>
                                <td>{product.ProductName}</td>
                                <td>{product.Category}</td>
                                <td>{product.Cost}</td>
                                <td>{product.Status}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                productid: product.ProductId, productname: product.ProductName, cat: product.Category,
                                                cost: product.Cost, des: product.ProductDescription, sts: product.Status
                                            })}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteProduct(product.ProductId)}>
                                            Delete
                                        </Button>
                                        <EditProductModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            productid={productid}
                                            productname={productname}
                                            cat={cat}
                                            cost={cost}
                                            des={des}
                                            sts={sts}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Product</Button>
                    <AddProductModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}