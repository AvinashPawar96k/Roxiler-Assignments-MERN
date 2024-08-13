import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductStatistics = () => {
    const [month, setMonth] = useState('March');
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0,
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetchStatistics();
    }, [month]);

    const fetchStatistics = async () => {
        try {

            const url = "http://localhost:8080/api/statics"
            const { data } = await axios.get(url, {
                params: { month }
            });

            console.log(data);


            setStatistics({
                totalSaleAmount: data.totalSaleAmount,
                totalSoldItems: data.soldProductLength,
                totalNotSoldItems: data.unSoldProductsLength,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className='container my-5'>
            <Form.Group controlId="monthSelect">
                <Form.Label>Select Month</Form.Label>
                <Form.Control as="select" value={month} onChange={(e) => setMonth(e.target.value)}>
                    {months.map((m, index) => (
                        <option key={index} value={m}>{m}</option>
                    ))}
                </Form.Control>
            </Form.Group>

            <Row className="mt-4">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Sale Amount</Card.Title>
                            <Card.Text>{statistics.totalSaleAmount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Sold Items</Card.Title>
                            <Card.Text>{statistics.totalSoldItems}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Not Sold Items</Card.Title>
                            <Card.Text>{statistics.totalNotSoldItems}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProductStatistics;
