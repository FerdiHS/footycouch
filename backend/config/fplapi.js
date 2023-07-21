const express = require('express');
const axios = require('axios');

const fplapi = () => axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
module.exports = {fplapi};