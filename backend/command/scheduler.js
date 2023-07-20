const cron = require('node-cron');
const { getAllUserCurrentTeams, createTeam } = require('./service');
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
    }
}