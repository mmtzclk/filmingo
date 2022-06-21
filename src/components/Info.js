import React from "react";
import styled from "styled-components";
import { CgPlayButtonO } from "react-icons/cg";

import StarRatings from "react-star-ratings";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Info({ info }) {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
    }, 1000);
  }, [info]);

  return (
    <StyledInfo animation={animation}>
      {info && (
        <React.Fragment>
          <Review>
            <StarRatings
              rating={parseInt(info.rate) / 2}
              numberOfStars={5}
              name="rating"
              starRatedColor="gold"
              starDimension="30"
              starEmptyColor="rgba(255,255,255,0.2)"
              svgIconPath="M16 6.204l-5.528-0.803-2.472-5.009-2.472 5.009-5.528 0.803 4 3.899-0.944 5.505 4.944-2.599 4.944 2.599-0.944-5.505 4-3.899z"
              svgIconViewBox="0 0 16 16"
            />
            <h5>{info.rate} &nbsp; / &nbsp; 10</h5>
          </Review>
          <Spacing size={"0.5vw"} />
          <Title>{info.title}</Title>
          <Spacing size={"2.5vw"} />
          <Description>{info.description}</Description>
          <Spacing size={"2.5vw"} />
          <Link to={`./${info.slug}`} replace={false}>
            <Play>
              <CgPlayButtonO size={70} />
              <h2>Watch Trailer</h2>
            </Play>
          </Link>
        </React.Fragment>
      )}
    </StyledInfo>
  );
}

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  margin-left: 5em;
  z-index: 1;
  overflow: hidden;

  @media screen and (max-width: 1920px) {
    margin-left: 1em;
  }

  @media screen and (max-width: 1440px) {
    width: 45%;
  }

  @media screen and (max-width: 1366px) {
    width: 40%;
  }
  @media screen and (max-width: 1024px) {
    width: 50%;
    position: absolute;
    top: 29%;
    left: 3rem;
  }
  @media screen and (max-width: 768px) {
    width: 42%;
    position: absolute;
    top: 25%;
    left: 2rem;
  }
  @media screen and (max-width: 425px) {
    width: 80%;
    position: absolute;
    bottom: 14vh;
    left: 2rem;
    justify-content: flex-end;
  }

  @media screen and (max-width: 425px) {
    @keyframes info-anim {
      0% {
        transform: translateX(120%);
      }
      50% {
        transform: translateX(-10%);
      }
      100% {
        transform: translateX(0%);
      }
    }
  }
  @media screen and (min-width: 426px) {
    @keyframes info-anim {
      0% {
        transform: translateX(120%);
        letter-spacing: 0.5rem;
        opacity: 0;
      }
      50% {
        transform: translateX(-10%);
        opacity: 0.5;
      }
      75% {
        opacity: 1;
      }
      100% {
        transform: translateX(0%);
        opacity: 1;
      }
    }
  }

  animation: ${(props) => (props.animation ? "info-anim" : "")} 1s;
`;

const Spacing = styled.div`
  height: ${(props) => props.size};
`;

const Review = styled.div`
  margin-bottom: -5rem;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    margin-bottom: -3rem;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: -2rem;
  }
  @media screen and (max-width: 425px) {
    display: none;
  }

  h5 {
    padding-left: 1.5rem;
    font-size: 1.2em;
    color: #d2d2d3;
    @media screen and (max-width: 1440px) {
      font-size: 1.5em;
    }
    @media screen and (max-width: 1024px) {
      font-size: 2em;
    }
    @media screen and (max-width: 425px) {
      font-size: 4em;
    }
  }
  svg {
    @media screen and (max-width: 768px) {
      width: 3vw !important;
      height: 3vw !important;
    }
    @media screen and (max-width: 425px) {
      width: 20px !important;
      height: 20px !important;
    }
  }
`;

const Title = styled.h1`
  font-family: "Toy";
  font-size: 8em;
  letter-spacing: -0.02em;
  font-weight: 400;
  line-height: 6vw;
  @media screen and (max-width: 1440px) {
    font-size: 10em;
    line-height: 8vw;
  }
  @media screen and (max-width: 1366px) {
    line-height: 8vw;
  }
  @media screen and (max-width: 1024px) {
    font-size: 8em;
  }
  @media screen and (max-width: 768px) {
    font-size: 10em;
  }
  @media screen and (max-width: 425px) {
    font-size: 16em;
    line-height: 3rem;
  }
`;

const Description = styled.p`
  margin-top: -5rem;
  font-size: 1em;
  line-height: 2rem;
  color: #d2d2d3;
  @media screen and (max-width: 1700px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 1440px) {
    font-size: 1.5em;
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.8em;
    margin-top: -3rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 3em;
    line-height: 1.5rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 5em;
    line-height: 1.2rem;
    margin-top: -2.4rem;
  }
`;

const Play = styled.div`
  display: flex;
  align-items: center;
  letter-spacing: 0.25vw;
  h2 {
    padding-left: 1rem;
  }
  @media screen and (max-width: 1440px) {
    font-size: 1.5em;
  }
  @media screen and (max-width: 1024px) {
    margin-top: -2rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: -1rem;
    font-size: 1.8em;
  }
  @media screen and (max-width: 425px) {
    font-size: 3.6em;
    margin-top: -1.5rem;
  }

  svg {
    @media screen and (max-width: 1024px) {
      width: 45px;
    }
    @media screen and (max-width: 768px) {
      width: 50px;
    }
    @media screen and (max-width: 425px) {
      width: 44px;
    }
  }
`;

export default Info;
