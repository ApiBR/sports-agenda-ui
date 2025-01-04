import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import TeamGrid from "../components/TeamGrid";
import MatchList from "../components/MatchList";

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
}

interface League {
  id: number;
  name: string;
  year: number;
  teams: Team[];
}

const LeagueDetailsContainer = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 24px;
  }

  .matches-section {
    margin-top: 20px;
  }
`;

const LeagueDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [league, setLeague] = useState<League | null>(null);
  const [pastMatches, setPastMatches] = useState<Match[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Mocked data for the league and matches
    const mockedLeagues = {
      1: {
        id: 1,
        name: "Premier League",
        year: 2023,
        teams: [
          { id: 101, name: "Manchester United", logo: "/images/manu.png" },
          { id: 102, name: "Chelsea", logo: "/images/chelsea.png" },
          { id: 103, name: "Liverpool", logo: "/images/liverpool.png" },
          { id: 104, name: "Arsenal", logo: "/images/arsenal.png" },
        ],
      },
      2: {
        id: 2,
        name: "La Liga",
        year: 2023,
        teams: [
          { id: 201, name: "Real Madrid", logo: "/images/realmadrid.png" },
          { id: 202, name: "Barcelona", logo: "/images/barcelona.png" },
          { id: 203, name: "Atletico Madrid", logo: "/images/atletico.png" },
          { id: 204, name: "Sevilla", logo: "/images/sevilla.png" },
        ],
      },
    };

    const mockedMatches = {
      1: {
        past: [
          {
            id: 301,
            homeTeam: "Manchester United",
            awayTeam: "Arsenal",
            date: "2024-12-22T15:00:00Z",
            score: "3-1",
          },
          {
            id: 302,
            homeTeam: "Chelsea",
            awayTeam: "Liverpool",
            date: "2024-12-23T18:00:00Z",
            score: "2-2",
          },
        ],
        upcoming: [
          {
            id: 303,
            homeTeam: "Manchester United",
            awayTeam: "Liverpool",
            date: "2024-12-30T17:00:00Z",
          },
          {
            id: 304,
            homeTeam: "Arsenal",
            awayTeam: "Chelsea",
            date: "2024-12-31T19:00:00Z",
          },
        ],
      },
      2: {
        past: [
          {
            id: 305,
            homeTeam: "Real Madrid",
            awayTeam: "Sevilla",
            date: "2024-12-22T15:00:00Z",
            score: "1-0",
          },
          {
            id: 306,
            homeTeam: "Barcelona",
            awayTeam: "Atletico Madrid",
            date: "2024-12-23T18:00:00Z",
            score: "0-2",
          },
        ],
        upcoming: [
          {
            id: 307,
            homeTeam: "Real Madrid",
            awayTeam: "Barcelona",
            date: "2024-12-30T20:00:00Z",
          },
          {
            id: 308,
            homeTeam: "Sevilla",
            awayTeam: "Atletico Madrid",
            date: "2024-12-31T21:00:00Z",
          },
        ],
      },
    };

    const fetchData = async () => {
      //   const leagueResponse = await fetch(`/api/leagues/${id}`);
      //   const matchesResponse = await fetch(`/api/matches?leagueId=${id}`);
      //   const leagueData = await leagueResponse.json();
      //   const matchesData = await matchesResponse.json();

      //   setLeague(leagueData);
      //   setPastMatches(matchesData.past);
      //   setUpcomingMatches(matchesData.upcoming);
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock league and matches data based on the league ID
      const leagueData = mockedLeagues[id || "1"];
      const matchesData = mockedMatches[id || "1"];

      setLeague(leagueData || null);
      setPastMatches(matchesData?.past || []);
      setUpcomingMatches(matchesData?.upcoming || []);
    };

    fetchData();
  }, [id]);

  if (!league) {
    return <div>Loading...</div>;
  }

  return (
    <LeagueDetailsContainer>
      <h1>
        {league.name} ({league.year})
      </h1>

      {/* Teams Grid */}
      <h2>Teams</h2>
      <TeamGrid teams={league.teams} />

      {/* Matches Section */}
      <div className="matches-section">
        <h2>Matches</h2>
        <h3>Past Matches</h3>
        <MatchList matches={pastMatches} />

        <h3>Upcoming Matches</h3>
        <MatchList matches={upcomingMatches} />
      </div>
    </LeagueDetailsContainer>
  );
};

export default LeagueDetails;
