import styled from "styled-components";

export const CarouselContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  padding: 10px;
  gap: 15px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LeagueCard = styled.div`
  min-width: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  h3 {
    font-size: 18px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

const LeagueCarousel = ({ leagues, onSelectLeague } : {leagues: League[], onSelectLeague: (id: number) => void}) => {
  return (
    <CarouselContainer>
      {leagues.map((league) => (
        <LeagueCard
          key={league.id}
          className="carousel-item"
          onClick={() => onSelectLeague(league.id)}
        >
          <h3>{league.name}</h3>
          <p>{league.year}</p>
        </LeagueCard>
      ))}
    </CarouselContainer>
  );
};

export default LeagueCarousel;
