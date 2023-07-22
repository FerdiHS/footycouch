const express = require('express');
const axios = require('axios');

const fplapi = () => axios.get('https://fantasy.premierleague.com/api/bootstrap-static/');

/*
    Used to test whether the auto points update in scheduler.js work
    const dummy = {
        "elements": [
            {
                "element_type": 1,
                "event_points": 6,
                "first_name": "Robert",
                "id": 145,
                "in_dreamteam": false,
                "news": "",
                "news_added": null,
                "now_cost": 45,
                "photo": "215059.jpg",
                "team": 5,
                "team_code": 36,
                "web_name": "Sanchez"
            },
            {
                "element_type": 1,
                "event_points": 2,
                "first_name": "James",
                "id": 335,
                "now_cost": 45,
                "photo": "77818.jpg",
                "team": 12,
                "team_code": 102,
                "web_name": "Shea"
            },
            {
                "element_type": 2,
                "event_points": 8,
                "first_name": "Trent",
                "id": 290,
                "now_cost": 80,
                "photo": "169187.jpg",
                "second_name": "Alexander-Arnold",
                "team": 11,
                "team_code": 14,
                "web_name": "Alexander-Arnold"
            },
            {
                "element_type": 2,
                "event_points": 1,
                "first_name": "Alexandre",
                "id": 32,
                "now_cost": 50,
                "photo": "106468.jpg",
                "second_name": "Moreno Lopera",
                "team": 2,
                "team_code": 7,
                "total_points": 72,
                "web_name": "Alex Moreno"
            },
            {
                "element_type": 2,
                "event_points": 12,
                "first_name": "Luke",
                "id": 398,
                "now_cost": 55,
                "photo": "106760.jpg",
                "second_name": "Shaw",
                "team": 14,
                "team_code": 1,
                "web_name": "Shaw"
            },
            {
                "element_type": 2,
                "event_points": 8,
                "first_name": "Pervis",
                "id": 131,
                "now_cost": 50,
                "photo": "204214.jpg",
                "second_name": "Estupiñán",
                "team": 5,
                "team_code": 36,
                "total_points": 128,
                "web_name": "Estupiñan"
            },
            {
                "element_type": 2,
                "event_points": -1,
                "first_name": "Amari'i",
                "id": 316,
                "now_cost": 40,
                "photo": "165183.jpg",
                "second_name": "Bell",
                "team": 12,
                "team_code": 102,
                "web_name": "Bell"
            },
            {
                "element_type": 3,
                "event_points": 6,
                "first_name": "Leon",
                "id": 34,
                "now_cost": 55,
                "photo": "215711.jpg",
                "second_name": "Bailey",
                "team": 2,
                "team_code": 7,
                "web_name": "Bailey"
            },
            {
                "element_type": 3,
                "event_points": 15,
                "first_name": "Bruno",
                "id": 373,
                "now_cost": 85,
                "photo": "141746.jpg",
                "second_name": "Borges Fernandes",
                "team": 14,
                "team_code": 1,
                "web_name": "B.Fernandes"
            },
            {
                "element_type": 3,
                "event_points": 2,
                "first_name": "Kaoru",
                "id": 143,
                "now_cost": 65,
                "photo": "451340.jpg",
                "second_name": "Mitoma",
                "team": 5,
                "team_code": 36,
                "web_name": "Mitoma"
            },
            {
                "element_type": 3,
                "event_points": 4,
                "first_name": "Eberechi",
                "id": 226,
                "now_cost": 65,
                "photo": "232413.jpg",
                "second_name": "Eze",
                "team": 8,
                "team_code": 31,
                "web_name": "Eze",
            },
            {
                "element_type": 3,
                "event_points": 1,
                "id": 52,
                "now_cost": 45,
                "photo": "184704.jpg",
                "second_name": "Nakamba",
                "team": 2,
                "team_code": 7,
                "web_name": "Nakamba"
            },
            {
                "event_points": 10,
                "first_name": "Harry",
                "id": 500,
                "now_cost": 125,
                "photo": "78830.jpg",
                "second_name": "Kane",
                "team": 18,
                "team_code": 6,
                "web_name": "Kane"
            },
            {
                "element_type": 4,
                "event_points": 4,
                "first_name": "Christopher",
                "id": 212,
                "now_cost": 75,
                "photo": "213198.jpg",
                "second_name": "Nkunku",
                "team": 7,
                "team_code": 8,
                "web_name": "Nkunku"
            },
            {
                "element_type": 4,
                "event_points": 3,
                "first_name": "Ollie",
                "id": 60,
                "now_cost": 80,
                "photo": "178301.jpg",
                "second_name": "Watkins",
                "team": 2,
                "team_code": 7,
                "web_name": "Watkins"
            }
        ]
    }

    const fplapi = () => dummy;
*/
module.exports = {fplapi};