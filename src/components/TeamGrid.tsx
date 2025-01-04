import styled from "styled-components";

export const TeamGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
`;

export const TeamCard = styled.div`
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #f9f9f9;

  img {
    max-width: 80%;
    height: auto;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 16px;
  }
`;

const TeamGrid = ({ teams }) => {
  return (
    <TeamGridContainer>
      {teams.map((team) => (
        <TeamCard key={team.id}>
          <h3>{team.name}</h3>
          <img src={team.logo} alt={`${team.name} logo`} />
        </TeamCard>
      ))}
    </TeamGridContainer>
  );
};

export default TeamGrid;
