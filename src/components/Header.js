import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <StyledHeader>
      <Logo>
        <NavLink to={"/"}> Filmingo</NavLink>
      </Logo>
      <Navigation>
        <ul>
          <li>
            <NavLink to={"#"}>Series</NavLink>
          </li>
          <li>
            <NavLink to={"#"}>Movies</NavLink>
          </li>
          <li>
            <NavLink to={"#"}>Serials</NavLink>
          </li>
        </ul>
      </Navigation>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  width: 91%;
  height: 8rem;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4.5%;
  @media screen and (max-width: 768px) {
    height: 5rem;
  }
  @media screen and (max-width: 425px) {
    height: 4rem;
  }
  a {
    color: white;
    letter-spacing: 0.3rem;
  }
`;

const Logo = styled.div`
  font-size: 3rem;
  font-family: "AT Apoc", sans-serif;
  font-weight: bolder;
  cursor: pointer;

  @media screen and (max-width: 425px) {
    font-size: 2rem;
  }
`;

const Navigation = styled.nav`
  width: 25%;

  @media screen and (max-width: 1700px) {
    font-size: 1.5em;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.8em;
    width: 40%;
  }
  @media screen and (max-width: 425px) {
    display: none;
  }

  ul {
    display: flex;
    justify-content: space-around;
  }
`;

export default Header;
