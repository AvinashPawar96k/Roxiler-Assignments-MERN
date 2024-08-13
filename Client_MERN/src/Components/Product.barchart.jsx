import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ProductBarChart = () => {
    const [month, setMonth] = useState('March');
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        fetchChartData();
    }, [month]);

    const fetchChartData = async () => {
        try {

            const url = "http://localhost:8080/api/bar-chart"
            const { data } = await axios.get(url, {
                params: { month }
            });

            console.log("data is ", data);


            const labels = data.map(item => item.range);
            const counts = data.map(item => item.count);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: `Number of Items in Price Range for ${month}`,
                        data: counts,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            });
        } catch (error) {
            console.error('Error fetching chart data:', error);
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

            <div className="mt-4">
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default ProductBarChart;
