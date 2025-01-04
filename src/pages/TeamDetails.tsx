import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import MatchList from "../components/MatchList";
import LoadingSpinner from "../components/LoadingSpinner";

const TeamDetailsContainer = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #004d40;
  }

  .team-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }

    h1 {
      margin: 0;
    }
  }

  .section {
    margin-bottom: 50px;

    h2 {
      font-size: 24px;
      color: #00695c;
      margin-bottom: 20px;
      border-bottom: 2px solid #004d40;
      display: inline-block;
      padding-bottom: 5px;
    }
  }

  .players-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;

    .player-card {
      background-color: #f1f8e9;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      text-align: center;

      h3 {
        font-size: 18px;
        color: #004d40;
        margin-bottom: 5px;
      }

      p {
        font-size: 14px;
        color: #555;
        margin: 5px 0;
      }
    }
  }

  .leagues-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      border: 1px solid #ddd;
      text-align: left;
      padding: 8px;
    }

    th {
      background-color: #004d40;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }
  }
`;

const TeamDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [team, setTeam] = useState<Team | null>(null);

  useEffect(() => {
    // const fetchTeamDetails = async () => {
    //     const response = await fetch(`/api/teams/${id}`);
    //     const data = await response.json();
    //     setTeam(data);
    // };
    // fetchTeamDetails();

    // Mock Data
    const mockTeamData: Team = {
      id: parseInt(id || "1", 10),
      name: "Mock Team",
      logo: "https://via.placeholder.com/100",
      players: [
        { id: 1, name: "John Doe", position: "Forward", age: 25 },
        { id: 2, name: "Jane Smith", position: "Midfielder", age: 27 },
        { id: 3, name: "Tom Johnson", position: "Defender", age: 23 },
      ],
      matches: [
        {
          id: 101,
          homeTeam: "Mock Team",
          awayTeam: "Team B",
          date: "2024-12-25T15:00:00Z",
          score: "2-1",
        },
        {
          id: 102,
          homeTeam: "Team C",
          awayTeam: "Mock Team",
          date: "2024-12-20T15:00:00Z",
          score: "1-1",
        },
      ],
      leagues: [
        { id: 1, name: "Premier League", year: 2023 },
        { id: 2, name: "La Liga", year: 2023 },
      ],
    };

    // Simulate API delay
    setTimeout(() => setTeam(mockTeamData), 1000);
  }, [id]);

  if (!team) {
    return (
      <TeamDetailsContainer>
        <div className="loading-container">
          <LoadingSpinner />
          <p>Loading team details...</p>
        </div>
      </TeamDetailsContainer>
    );
  }

  return (
    <TeamDetailsContainer>
      {/* Team Header */}
      <div className="team-header">
        <img src={team.logo} alt={team.name} />
        <h1>{team.name}</h1>
      </div>

      {/* Players Section */}
      <div className="section">
        <h2>Players</h2>
        <div className="players-list">
          {team.players.map((player) => (
            <div className="player-card" key={player.id}>
              <h3>{player.name}</h3>
              <p>Position: {player.position}</p>
              <p>Age: {player.age}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Leagues Section */}
      <h2>Leagues</h2>
      <table className="leagues-table">
        <thead>
          <tr>
            <th>League</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {team.leagues.map((league) => (
            <tr key={league.id}>
              <td>{league.name}</td>
              <td>{league.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Matches Section */}
      <div className="section">
        <h2>Recent Matches</h2>
        <MatchList matches={team.matches} />
      </div>
    </TeamDetailsContainer>
  );
};

export default TeamDetails;
