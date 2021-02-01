import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddCatModal } from './AddCatModal';
import { EditCatModal } from './EditCatModal';

export class ProductCategory extends Component {
    //Initializing states
    constructor(props) {
        super(props);
        this.state = { cats: [], addModalShow: false, editModalShow: false, search: "" }
    }

    refreshList() {
        //Fetching data through REST API
        fetch(process.env.REACT_APP_API + 'productcategory')
            .then(response => response.json())
            .then(data => {
                this.setState({ cats: data });
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

    //For deleting product category
    deleteCat(catid) {
        if (window.confirm('Are you sure?')) {
            //Passing category_id through REST API
            fetch(process.env.REACT_APP_API + 'productcategory/' + catid, {
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
        const { cats, catid, catname, catdes, catsts, search } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div>
                <input className="mt-4" striped bordered hover size="sm" placeholder="Search By Category" icon="search" onChange={this.onchange} />

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryId</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cats.filter((cat) => {
                            if (search == "") {
                                return cat
                            } else if (cat.CategoryName.toLowerCase().includes(search.toLowerCase())) {
                                return cat
                            }
                        }).map(cat =>
                            <tr key={cat.CategoryId}>
                                <td>{cat.CategoryId}</td>
                                <td>{cat.CategoryName}</td>
                                <td>{cat.Status}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                catid: cat.CategoryId, catname: cat.CategoryName,
                                                catdes: cat.Description, catsts: cat.Status
                                            })}>
                                            Edit
                                        </Button>
                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteCat(cat.CategoryId)}>
                                            Delete
                                        </Button>
                                        <EditCatModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            catid={catid}
                                            catname={catname}
                                            catdes={catdes}
                                            catsts={catsts} />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add Category</Button>
                    <AddCatModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}