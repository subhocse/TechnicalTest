import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddProductModal } from './AddProductModal';
import { EditProductModal } from './EditProductModal';

export class Product extends Component {
    //Initializing states
    constructor(props) {
        super(props);
        this.state = { products: [], addModalShow: false, editModalShow: false, searchProduct: "", searchCategory: "" }
    }

    refreshList() {
        //Fetching data through REST API
        fetch(process.env.REACT_APP_API + 'product')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data });
            });
    }


    //Setting state value for searchProduct
    onchangeProduct = e => {
        this.setState({ searchProduct: e.target.value });
    }

    //Setting state value for searchCategory
    onchangeCategory = e => {
        this.setState({ searchCategory: e.target.value });
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
        const { products, productid, productname, cat, cost, des, sts, searchProduct, searchCategory } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
            
        const filterSearch = products.filter((product)=> {
            if (searchCategory == "") {
                return product
            } else if (product.Category.toLowerCase().includes(searchCategory.toLowerCase())) {
                return product
            }
        });
        return (
            <div >
                <input className="mt-4" striped bordered hover size="sm" placeholder="Search By Category" icon="search" onChange={this.onchangeCategory} />            
                <input className="mt-4" striped bordered hover size="sm" placeholder="Search By Product" icon="search" onChange={this.onchangeProduct} />
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
                        {filterSearch.filter((product) => {
                            if (searchProduct == "") {
                                return product
                            } else if (product.ProductName.toLowerCase().includes(searchProduct.toLowerCase())) {
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