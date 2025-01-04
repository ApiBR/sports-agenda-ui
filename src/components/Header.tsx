import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  background-color: #004d40; /* Deep Green */
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;

  h1 {
    font-size: 24px;
    margin: 0;
  }

  nav {
    a {
      color: white;
      text-decoration: none;
      margin: 0 10px;
      font-size: 16px;
      font-weight: bold;
      transition: color 0.3s ease;

      &:hover {
        color: #ffcc00; /* Yellow highlight */
      }
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <h1>Sports Agenda | API BR</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
