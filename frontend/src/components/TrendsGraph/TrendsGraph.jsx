import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from 'react-chartjs-2';
import './TrendsGraph.css';

const TrendChart = ({ token }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/useractivity", {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });

        const data = response.data;

        // Suppose the data is an array of objects with 'month' and 'activity' properties
        const labels = data.map(item => item.month);
        const dataset = data.map(item => item.activity);

        setChartData({
          labels,
          datasets: [
            {
              label: 'User activity',
              data: dataset,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);  

  return (
    <div className="chart-container">  {/* Modify as per your CSS */}
      <h2>User activity trend</h2>
      {chartData && <Line data={chartData} options={{ responsive: true }} />}
    </div>
  );
};

export default TrendChart;
