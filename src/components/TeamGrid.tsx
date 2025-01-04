import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



const TeamGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  .team-card {
    background-color: #f1f8e9;
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    h3 {
      font-size: 18px;
      color: #004d40;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }
`;

const TeamGrid: React.FC<TeamGridProps> = ({ teams }) => {
  if (!teams?.length) {
    return (
      <TeamGridContainer>
        <div className="empty-state">No teams available</div>
      </TeamGridContainer>
    );
  }

  return (
    <TeamGridContainer>
      {teams.map((team) => (
        <Link to={`/team/${team.id}`} key={team.id} className="team-card">
          <img src={team.logo} alt={`${team.name} logo`} />
          <h3>{team.name}</h3>
        </Link>
      ))}
    </TeamGridContainer>
  );
};

export default TeamGrid;
