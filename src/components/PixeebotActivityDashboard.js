import React from 'react';
import ActivityTracker from './ActivityTracker';

const PixeebotActivityDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Pixeebot Activity Dashboard</h1>
      <section className="activity-summary">
        <h2>Activity Summary</h2>
        <ActivityTracker />
      </section>
      <section className="recommendations">
        <h2>Recommendations</h2>
        <p>Available improvement opportunities.</p>
      </section>
      <section className="metrics">
        <h2>Metrics</h2>
        <p>Metrics and analysis of the repository.</p>
      </section>
    </div>
  );
};

export default PixeebotActivityDashboard;