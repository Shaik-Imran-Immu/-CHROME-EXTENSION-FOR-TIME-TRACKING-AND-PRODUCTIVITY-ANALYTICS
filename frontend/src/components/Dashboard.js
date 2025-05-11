import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../api';

// Register the chart components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const unproductiveDomains = ['facebook.com', 'instagram.com', 'youtube.com'];
const productiveDomains = ['leetcode.com', 'hackerrank.com', 'github.com'];

const Dashboard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get('/logs');
      setLogs(res.data);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  };

  // Filter logs from the last 7 days
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentLogs = logs.filter(log => new Date(log.timestamp) >= oneWeekAgo);

  // Categorize time by type
  const categoryData = recentLogs.reduce((acc, log) => {
    const isUnproductive = unproductiveDomains.includes(log.domain);
    const isProductive = productiveDomains.includes(log.domain);
    
    let category;
    if (isUnproductive) {
      category = 'Unproductive';
    } else if (isProductive) {
      category = 'Productive';
    } else {
      category = 'Neutral';
    }
    
    acc[category] = (acc[category] || 0) + log.duration;
    return acc;
  }, { Productive: 0, Unproductive: 0, Neutral: 0 });

  // Group logs by domain
  const domainData = logs.reduce((acc, log) => {
    acc[log.domain] = (acc[log.domain] || 0) + log.duration;
    return acc;
  }, {});

  // Bar chart data
  const chartData = {
    labels: Object.keys(domainData),
    datasets: [
      {
        label: 'Time Spent (seconds)',
        data: Object.values(domainData),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 6
      }
    ]
  };

  // Pie chart data
  const pieData = {
    labels: ['Productive', 'Unproductive', 'Neutral'],
    datasets: [{
      data: [
        categoryData['Productive'] || 0,
        categoryData['Unproductive'] || 0,
        categoryData['Neutral'] || 0
      ],
      backgroundColor: ['#4CAF50', '#F44336', '#FFC107'],
      borderWidth: 1,
    }]
  };

  // PDF export function
  const exportPDF = () => {
    const input = document.getElementById('pie-chart-section');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Weekly_Productivity_Report.pdf');
    });
  };

  return (
    <div style={{ width: '80%', margin: 'auto', marginTop: '2rem' }}>
      {/* Productivity Bar Chart Section */}
      <h2>📊 Productivity Dashboard</h2>
      <Bar data={chartData} />

      {/* Pie Chart for Weekly Breakdown */}
      <div id="pie-chart-section" style={{ marginTop: '3rem' }}>
        <h3>🗓️ Weekly Productivity Breakdown</h3>
        <Pie data={pieData} />

        {/* Export to PDF Button */}
        <button
          onClick={exportPDF}
          style={{
            marginTop: '1rem',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          📄 Download Weekly Report (PDF)
        </button>
      </div>
    </div>
  );
};

export default Dashboard;