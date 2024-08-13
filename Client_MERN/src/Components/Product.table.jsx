import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductTable = () => {
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState('March');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetchTransactions();
    }, [month, search, page]);

    const fetchTransactions = async () => {
        try {
            const url = "http://localhost:8080/api/transactions"

            const { data } = await axios.get(url, {
                params: {
                    month,
                    search,
                    page: 1,
                    perPage: 10,
                },
            });

            console.log("response is ", data.products);
            console.log("total pages ", data.totalPages);


            setTransactions(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
        setPage(1);
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <Container className='container my-5'>
            <h1 className="my-4">Transactions List</h1>
            <Form.Group controlId="monthSelect">
                <Form.Label>Select Month</Form.Label>
                <Form.Control as="select" value={month} onChange={handleMonthChange}>
                    {months.map((m, index) => (
                        <option key={index} value={m}>{m}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="searchInput" className="mt-3">
                <Form.Label>Search Transactions</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search by title, description, or price"
                    value={search}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Date of Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions && transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>${transaction.price}</td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-flex justify-content-between">
                <Button
                    variant="primary"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <Button
                    variant="primary"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
};

export default ProductTable;
