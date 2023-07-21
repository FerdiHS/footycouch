const cron = require('node-cron');
const { getAllUserCurrentTeams, createTeam, getTeamFromGameWeek, updateTeamPoint } = require('./service');
const { fplapi } = require('../config/fplapi');
const gameWeekDeadline = [
    '30 17 11 8 *',
    '30 12 19 8 *',
    '30 12 26 8 *',
    '30 12 2 9 *',
    '30 12 16 9 *',
    '30 12 23 9 *',
    '30 12 30 9 *',
    '30 12 7 10 *',
    '30 12 21 10 *',
    '30 12 28 10 *',
    '30 13 4 11 *',
    '30 13 11 11 *',
    '30 13 25 11 *',
    '30 13 2 12 *',
    '15 18 5 12 *',
    '30 13 9 12 *',
    '30 13 16 12 *',
    '30 13 23 12 *',
    '30 13 26 12 *',
    '30 13 30 12 *',
    '30 13 13 1 *',
    '15 18 30 1 *',
    '30 13 3 2 *',
    '30 13 10 2 *',
    '30 13 17 2 *',
    '30 13 24 2 *',
    '30 13 2 3 *',
    '30 13 9 3 *',
    '30 13 16 3 *',
    '30 13 30 3 *',
    '15 17 2 4 *',
    '30 12 6 4 *',
    '30 12 13 4 *',
    '30 12 20 4 *',
    '30 12 27 4 *',
    '30 12 4 5 *',
    '30 12 11 5 *',
    '30 13 19 5 *'
  ];
module.exports = {
    uploadTeam: () => {
        gameWeekDeadline.forEach((time, gameweek) => {
            cron.schedule((time), () => {
                getAllUserCurrentTeams((err, results) => {
                    if(err) {
                        console.log(err);
                        return results.status(403).json({
                            message: "Database connection error"
                        });
                    }
                    results.forEach(team => {
                        if(team.gk_1 !== null) {
                            createTeam(team.id, gameweek + 1, team.formation, team.gk_1, team.gk_2, team.def_1, team.def_2, team.def_3, team.def_4, team.def_5, 
                                team.mid_1, team.mid_2, team.mid_3, team.mid_4, team.mid_5, team.fow_1, team.fow_2, team.fow_3, (err, result) => {
                                    if(err) {
                                        return console.log(err);
                                    }
                            });
                        }
                    });
                    console.log("Teams saved for gameweek " + (gameweek + 1));
                });
            });
        })
    },

    updatePoints: () => {
        cron.schedule('0 0 * * *', () => {
            const currentDate = new Date();
            let gameweek = 0;
            for(let i = 0; i < 38; i++) {
                if(currentDate <= new Date(gameWeekDeadline[i])) {
                    gameweek = i;
                    break;
                }
            }
            getTeamFromGameWeek(gameweek, (err, results) => {
                if(err) console.log(err)
                let players = [];
                fplapi.then(response => {players = response.data.elements});
                results.forEach(team => {
                    const gk = 1;
                    const def = parseInt(team.formation.charAt(0));
                    const mid = parseInt(team.formation.charAt(2));
                    const fow = parseInt(team.formation.charAt(4));
                    let total_points = team.total_points;
                    // gk_1
                    const gk_1_points = players.find(p => p.id === team.gk_1).event_points;
                    total_points += gk_1_points - team.gk_1_points;
                    // gk_2
                    const gk_2_points = players.find(p => p.id === team.gk_2).event_points;
                    // def_1
                    const def_1_points = players.find(p => p.id === team.def_1).event_points;
                    total_points += def_1_points - team.def_1_points;
                    // def_2
                    const def_2_points = players.find(p => p.id === team.def_2).event_points;
                    total_points += def_2_points - team.def_2_points;
                    // def_3
                    const def_3_points = players.find(p => p.id === team.def_3).event_points;
                    total_points += def_3_points - team.def_3_points;
                    // def_4
                    const def_4_points = players.find(p => p.id === team.def_4).event_points;
                    if(def >= 4) total_points += def_4_points - team.def_4_points;
                    // def_5
                    const def_5_points = players.find(p => p.id === team.def_5).event_points;
                    if(def >= 5) total_points += def_5_points - team.def_5_points;
                    // mid_1
                    const mid_1_points = players.find(p => p.id === team.mid_1).event_points;
                    total_points += mid_1_points - team.mid_1_points;
                    // mid_2
                    const mid_2_points = players.find(p => p.id === team.mid_2).event_points;
                    total_points += mid_2_points - team.mid_2_points;
                    // mid_3
                    const mid_3_points = players.find(p => p.id === team.mid_3).event_points;
                    total_points += mid_3_points - team.mid_3_points;
                    // mid_4
                    const mid_4_points = players.find(p => p.id === team.mid_4).event_points;
                    if(mid >= 4) total_points += mid_4_points - team.mid_4_points;
                    // mid_5
                    const mid_5_points = players.find(p => p.id === team.mid_5).event_points;
                    if(mid >= 5) total_points += mid_5_points - team.mid_5_points;
                    // fow_1
                    const fow_1_points = players.find(p => p.id === team.fow_1).event_points;
                    total_points += fow_1_points - team.fow_1_points;
                    // fow_2
                    const fow_2_points = players.find(p => p.id === team.fow_2).event_points;
                    if(fow >= 2) total_points += fow_2_points - team.fow_2_points;
                    // fow_3
                    const fow_3_points = players.find(p => p.id === team.fow_3).event_points;
                    if(fow >= 3) total_points += fow_3_points - team.fow_3_points;
                    updateTeamPoint(team.id, total_points, gk_1_points, gk_2_points, def_1_points, def_2_points, def_3_points, def_4_points,
                            def_5_points, mid_1_points, mid_2_points, mid_3_points, mid_4_points, mid_5_points, fow_1_points, fow_2_points, fow_3_points, (err, result) => {
                                if(err) console.log(err);
                    });
                });
                console.log("Points on gameweek " + gameweek + " updated");
            });
        });
    }
}