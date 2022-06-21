import React from "react";
import styled from "styled-components";
import bg from "../images/bg.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <StyledHome bg={bg}>
      <h1>GAME OF THRONES INTRODUCTION WEBSITE</h1>
      <Link to={"series/game-of-thrones/season-1"}>
        <button>GO TO PAGE</button>
      </Link>
      <a
        href="https://www.instagram.com/memolata1/"
        rel="noreferrer"
        target={"_blank"}
      >
        <h3>designed by memolata</h3>
      </a>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  text-align: center;

  h1 {
    font-size: 5vw;
    height: 25rem;
    line-height: 15rem;
    color: #373d3c;
    font-family: "Toy", sans-serif;
    letter-spacing: 0.12em;
    margin-top: 0;
    background: linear-gradient(
      0deg,
      rgba(34, 193, 195, 0) 0%,
      rgba(116, 113, 106, 0.9248074229691877) 68%
    );

    @media screen and (max-width: 768px) {
      font-size: 8em;
      line-height: 4rem;
      padding-top: 2rem;
    }
    @media screen and (max-width: 425px) {
      font-size: 12em;
      line-height: 3rem;
      padding-top: 2rem;
    }
  }

  h3 {
    position: absolute;
    right: 4rem;
    bottom: 1.5rem;
    color: #373d3c;
    background-color: #dcdad0;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;

    @media screen and (max-width: 1024px) {
      bottom: 2.5rem;
      left: 50%;
      width: 12rem;
      transform: translateX(-50%);
    }
    @media screen and (max-width: 768px) {
      bottom: 4vh;
      left: 50%;
      width: 12rem;
      transform: translateX(-50%);
    }
    @media screen and (max-width: 425px) {
      bottom: 7vh;
      left: 50%;
      width: 70vw;
      transform: translateX(-50%);
      padding: 1rem 1rem;
    }
  }

  button {
    position: absolute;
    bottom: 10rem;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #373d3c;
    width: 20rem;
    height: 5rem;
    background-color: #373d3c;
    color: #dcdad0;
    font-size: 2rem;
    font-family: "Uxum Grotesque", sans-serif;
    transition: all 0.3s ease-in-out;
    font-weight: bold;
    letter-spacing: 0.1rem;
    cursor: pointer;
    :hover {
      background-color: #dcdad0;
      color: #373d3c;
      letter-spacing: 0.2rem;
    }
    @media screen and (max-width: 1024px) {
      bottom: 4rem;
    }
    @media screen and (max-width: 768px) {
      bottom: 4rem;
    }

    @media screen and (max-width: 425px) {
      width: 15rem;
      height: 3rem;
      font-size: 1rem;
      bottom: 6rem;
    }
  }
`;

export default Home;
