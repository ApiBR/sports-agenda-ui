import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

const MatchDetailsContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .teams {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  .score {
    margin-top: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #00796b;
  }

  .details {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
  }
`;

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    // Mock API Call
    const fetchMatchData = async () => {
      const matchData: Match = {
        id: Number(id),
        homeTeam: "Team A",
        awayTeam: "Team B",
        homeTeamLogo: "https://via.placeholder.com/100?text=Team+A",
        awayTeamLogo: "https://via.placeholder.com/100?text=Team+B",
        date: "2025-01-01T15:00:00Z",
        score: "2-1", // Null for upcoming matches
        league: { id: 1, name: "Premier League", year: 2025 },
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMatch(matchData);
    };

    fetchMatchData();
  }, [id]);

  if (!match) {
    return (
      <MatchDetailsContainer>
        <div 
          className="loading-container"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <LoadingSpinner />
          <p>Loading match details...</p>
        </div>
      </MatchDetailsContainer>
    );
  }

  return (
    <MatchDetailsContainer>
      <h1>Match Details</h1>
      <div className="teams">
        <div>
          <img src={match.homeTeamLogo} alt={match.homeTeam} />
          <p>{match.homeTeam}</p>
        </div>
        <p>vs</p>
        <div>
          <img src={match.awayTeamLogo} alt={match.awayTeam} />
          <p>{match.awayTeam}</p>
        </div>
      </div>

      {/* Display the score */}
      <div className="score">
        {match.score ? `Score: ${match.score}` : "Match not played yet"}
      </div>

      <div className="details">
        <p>
          <strong>Date:</strong> {new Date(match.date).toLocaleString()}
        </p>
        <p>
          <strong>League:</strong> {match.league?.name}
        </p>
      </div>
    </MatchDetailsContainer>
  );
};

export default MatchDetails;
