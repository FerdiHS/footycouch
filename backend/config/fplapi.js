const express = require('express');
const axios = require('axios');

const fplapi = axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
module.exports = {fplapi};

/*
try {
    const fplapi = axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');
    console.log(fplapi);
    module.exports = {fplapi};
} catch(e) {
    console.log(e);
    res.status(500).json({ error: 'Internal Server Error' });
}
*/