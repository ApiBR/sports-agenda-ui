import styled from "styled-components";

export const MatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const MatchCard = styled.div`
  flex: 1 1 calc(33% - 20px);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  text-align: center;

  h4 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;


const MatchList = ({ matches }) => {
  return (
    <MatchContainer>
      {matches.map((match) => (
        <MatchCard key={match.id}>
          <div>{match.homeTeam} vs {match.awayTeam}</div>
          <div>{match.date}</div>
          {match.score && <div>Score: {match.score}</div>} {/* Display score if available */}
        </MatchCard>
      ))}
    </MatchContainer>
  );
};

export default MatchList;
