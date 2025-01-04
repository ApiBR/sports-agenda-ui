import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeagueCarousel from "../components/LeagueCarousel";
import MatchList from "../components/MatchList";
import { useNavigate } from "react-router-dom";

interface League {
  id: number;
  name: string;
  year: number;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
}

const HomeContainer = styled.div`
  font-family: "Arial", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
    font-weight: bold;
    color: #004d40; /* Deep Green */
  }

  h2 {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 24px;
    color: #00695c; /* Slightly lighter green */
    border-bottom: 2px solid #004d40;
    display: inline-block;
    padding-bottom: 5px;
  }

  .section {
    margin-bottom: 50px;
    padding: 20px;
    border-radius: 8px;
    background-color: #f1f8e9; /* Light green tint */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .carousel-container {
    padding: 10px;
    background: #e8f5e9; /* Subtle background for the carousel */
    border-radius: 8px;
  }
`;

const Home: React.FC = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [todaysMatches, setTodaysMatches] = useState<Match[]>([]);
  const [pastMatches, setPastMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock API responses
    const leaguesData: League[] = [
      { id: 1, name: "Premier League", year: 2023 },
      { id: 2, name: "La Liga", year: 2023 },
      { id: 3, name: "Serie A", year: 2023 },
      { id: 4, name: "Bundesliga", year: 2023 },
      { id: 5, name: "Ligue 1", year: 2023 },
    ];

    const matchesData = {
      today: [
        { id: 101, homeTeam: "Manchester United", awayTeam: "Chelsea", date: "2024-12-28T15:00:00Z" },
        { id: 102, homeTeam: "Real Madrid", awayTeam: "Barcelona", date: "2024-12-28T18:30:00Z" },
      ],
      past: [
        { id: 103, homeTeam: "Arsenal", awayTeam: "Liverpool", date: "2024-12-23T15:00:00Z" },
        { id: 104, homeTeam: "Bayern Munich", awayTeam: "Borussia Dortmund", date: "2024-12-24T18:30:00Z" },
      ],
      upcoming: [
        { id: 105, homeTeam: "Paris Saint-Germain", awayTeam: "Marseille", date: "2024-12-30T20:00:00Z" },
        { id: 106, homeTeam: "AC Milan", awayTeam: "Juventus", date: "2024-12-31T19:00:00Z" },
      ],
    };

    const fetchData = async () => {
    //   const leaguesResponse = await fetch("/api/leagues");
    //   const matchesResponse = await fetch("/api/matches");
    //   const leaguesData = await leaguesResponse.json();
    //   const matchesData = await matchesResponse.json();
      // Simulate a delay for better development experience
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set mocked data
      setLeagues(leaguesData);
      setTodaysMatches(matchesData.today);
      setPastMatches(matchesData.past);
      setUpcomingMatches(matchesData.upcoming);
    };

    fetchData();
  }, []);

  const handleLeagueClick = (leagueId: number) => {
    navigate(`/league/${leagueId}`);
  };

  return (
    <HomeContainer>
      <h1>Football Matches</h1>

      {/* League Carousel */}
      <h2>Leagues & Championships</h2>
      <LeagueCarousel leagues={leagues} onSelectLeague={handleLeagueClick} />

      {/* Today's Matches */}
      <h2>Today's Matches</h2>
      <MatchList matches={todaysMatches} />

      {/* Past Matches */}
      <h2>Matches from the Last 5 Days</h2>
      <MatchList matches={pastMatches} />

      {/* Upcoming Matches */}
      <h2>Matches for the Next 5 Days</h2>
      <MatchList matches={upcomingMatches} />
    </HomeContainer>
  );
};

export default Home;
