const express = require('express');
const router = express.Router();

router.get('/dashboard-data', async (req, res) => {
  try {
    const activities = []; // Fetch from database or external API
    const metrics = {}; // Fetch from Sonar, CodeQL, Semgrep APIs
    const resources = [
      { name: 'Pixee Docs', url: 'https://docs.pixee.ai/' },
      { name: 'Codemodder by Pixee', url: 'https://codemodder.io/' }
    ];
    res.json({ activities, metrics, resources });
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    res.status(500).send('Server error');
  }
});

router.post('/submit-feedback', async (req, res) => {
  try {
    const { feedback } = req.body;
    // Process and store the feedback
    res.send('Feedback submitted');
  } catch (error) {
    console.error('Error submitting feedback', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;