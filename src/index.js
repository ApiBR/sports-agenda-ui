const express = require('express');
const dashboard = require('./api/dashboard');
const scheduler = require('./api/scheduler'); // This just needs to be imported to start the scheduler

const app = express();

app.use('/api', dashboard);