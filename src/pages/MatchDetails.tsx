import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  date: string;
  score: string | null; // "2-1" or null if the match hasn't been played yet
  league: string;
}

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
      // Replace with your API call if available
      const matchData: Match = {
        id: Number(id),
        homeTeam: "Team A",
        awayTeam: "Team B",
        homeTeamLogo: "https://via.placeholder.com/100?text=Team+A",
        awayTeamLogo: "https://via.placeholder.com/100?text=Team+B",
        date: "2025-01-01T15:00:00Z",
        score: "2-1", // null for upcoming matches
        league: "Premier League",
      };
      setMatch(matchData);
    };

    fetchMatchData();
  }, [id]);

  if (!match) {
    return <div>Loading...</div>;
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
      <div className="details">
        <p>
          <strong>Date:</strong> {new Date(match.date).toLocaleString()}
        </p>
        <p>
          <strong>League:</strong> {match.league}
        </p>
        <p>
          <strong>Score:</strong> {match.score || "Match not played yet"}
        </p>
      </div>
    </MatchDetailsContainer>
  );
};

export default MatchDetails;
