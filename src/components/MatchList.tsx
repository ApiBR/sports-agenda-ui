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

  .match-date {
    font-size: 14px;
    color: #ccc;
  }
`;

const MatchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 18px;
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
`;

const TeamNames = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`;

const MatchList: React.FC<MatchListProps> = ({ matches }) => {
  return (
    <MatchListContainer>
      {matches.map((match) => (
        <Link key={match.id} to={`/match/${match.id}`}>
          <MatchItem key={match.id}>
            <TeamNames>
              <span>{match.homeTeam}</span>
              <span>{match.awayTeam}</span>
            </TeamNames>
            <div>
              {/* Display the score or a message if the match is upcoming */}
              {match.score ? (
                <strong>{match.score}</strong>
              ) : (
                <span>Match not played yet</span>
              )}
            </div>
            <span className="match-date">
              {new Date(match.date).toLocaleDateString()}
            </span>
          </MatchItem>
        </Link>
      ))}
    </MatchListContainer>
  );
};

export default MatchList;
