import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #004d40; /* Deep Green */
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 14px;

  a {
    color: #ffcc00; /* Yellow highlight */
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: white;
    }
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>
        © {new Date().getFullYear()} Sports Agenda - API BR. All Rights Reserved. | Built
        with ❤️ by <a href="https://guilhermebranco.com.br">Guilherme Branco Stracini</a>
      </p>
    </FooterContainer>
  );
};

export default Footer;
