const schedule = require('node-schedule');
const axios = require('axios');

const updateDashboardData = async () => {
  try {
    // Add the logic to fetch and update dashboard data
  } catch (error) {
    console.error('Error updating dashboard data', error);
  }
};

// Schedule to run every week
schedule.scheduleJob('0 0 * * 0', updateDashboardData);