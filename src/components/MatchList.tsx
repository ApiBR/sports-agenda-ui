import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score: string | null;
}

interface MatchListProps {
  matches: Match[];
}

const MatchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  a {
    text-decoration: none;
    color: inherit;
  }

  .match {
    padding: 10px;
    background-color: #004d40;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: #00796b;
    }
  }

  .match-date {
    font-size: 14px;
    color: #ccc;
  }
`;

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <MatchListContainer>
      {matches.map((match) => (
        <Link key={match.id} to={`/match/${match.id}`}>
          <div className="match">
            <span>
              {match.homeTeam} vs {match.awayTeam}
            </span>
            <span className="match-date">
              {new Date(match.date).toLocaleDateString()}
            </span>
          </div>
        </Link>
      ))}
    </MatchListContainer>
  );
};

export default MatchList;
