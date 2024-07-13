import React from 'react';
import './LeaderBoard.css';

const LeaderBoard = ({ members, type, title }) => {
  // Sort members by score in descending order
    const sortedMembers = members.sort((player1, player2) => player2[type] - player1[type]);
    return (
        <div className="leaderboard">
        <h1>Leaderboard {title}</h1>
        <div className="leaderboard-header">
            <span className="rank-header">No.</span>
            <span className="name-header">Name</span>
            <span className="score-header">{title}</span>
        </div>
        <ul>
            {sortedMembers.slice(0, 10).map((member, index) => (
            <li key={index} className="leaderboard-item">
                <span className="rank">{"\n" + (index + 1)}</span>
                <span className="name">{member.web_name}</span>
                <span className="score">{member[type]}</span>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default LeaderBoard;