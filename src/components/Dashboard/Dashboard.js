import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [resources, setResources] = useState([]);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard-data');
      setActivities(response.data.activities);
      setMetrics(response.data.metrics);
      setResources(response.data.resources);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      await axios.post('/api/submit-feedback', { feedback });
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  return (
    <div>
      {/* Render dashboard UI here using activities, metrics, and resources */}
      {/* Add a form/input for user feedback */}
    </div>
  );
};

export default Dashboard;