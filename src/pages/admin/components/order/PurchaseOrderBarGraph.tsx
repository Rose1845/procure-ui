import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import useApi from '@/hooks/useApi';
const PurchaseOrderBarGraph: React.FC = () => {
    const { axiosApi } = useApi()

    const [monthlyData, setMonthlyData] = useState<{ month: string; count: number }[]>([]);
    const [chartKey, setChartKey] = useState(0); // Key to force re-render the chart
    const ref1 = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const months = Array.from({ length: 12 }, (_, i) => i + 1); // Generate array of numbers from 1 to 12
            const fetchDataForMonth = async (month: number) => {
                try {
                    const response = await axiosApi.get(`/purchase-order/p-orders/${month}`);
                    const count = response.data.reduce((total: number, order: { createdAt: string | number | Date; }) => {
                        const orderMonth = new Date(order.createdAt).getMonth() + 1; // Get month from createdAt field
                        return orderMonth === month ? total + 1 : total;
                    }, 0);
                    return { month: getMonthName(month), count };
                } catch (error) {
                    console.error(`Error fetching data for month ${month}:`, error);
                    return { month: getMonthName(month), count: 0 }; // Set count to 0 if there's an error
                }
            };

            const fetchDataForAllMonths = async () => {
                const dataPromises = months.map(async (month) => fetchDataForMonth(month));
                const data = await Promise.all(dataPromises);
                setMonthlyData(data);
            };
            fetchDataForAllMonths();
        };

        fetchData();
        return () => {
            // Ensure chart instance is destroyed on component unmount
            setChartKey((prevKey) => prevKey + 1); // Increment key to force re-render and destroy chart
        };
    }, []);

    const getMonthName = (month: number) => {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return monthNames[month - 1]; // Months are 1-based in JavaScript but 0-based in arrays
    };

    // Prepare data for Chart.js
    const chartData = {
        labels: monthlyData.map((item) => item.month),
        datasets: [
            {
                label: 'Purchase Orders',
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: monthlyData.map((item) => item.count),
            },
        ],
    };

    return (
        <div className='flex flex-col items-center justify-end' key={chartKey}>
            <h2>Purchase Orders by Month</h2>
            <div style={{ height: '400px', width: '600px' }}>
                <Bar ref={ref1} data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default PurchaseOrderBarGraph;
