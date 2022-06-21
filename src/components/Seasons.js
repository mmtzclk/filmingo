import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DisplaySeasons = ({ seasons, currentSeason, movieSlug }) => {
  return (
    <StyledSeasons>
      {seasons.map((season) => (
        <React.Fragment key={season.slug}>
          <Seasons
            text={season.name}
            defaultClass={season.slug === currentSeason ? "default-show" : ""}
            season={season}
            movieSlug={movieSlug}
          />
          {seasons.length !== parseInt(season.id) ? <Line /> : ""}
        </React.Fragment>
      ))}
    </StyledSeasons>
  );
};
function Seasons({ text, defaultClass, season, movieSlug }) {
  const [show, setShow] = useState(false);

  return (
    <Link to={`/series/${movieSlug}/${season.slug}`} replace>
      <Head
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        show={show}
        className={defaultClass}
      >
        <h3>{text}</h3>
      </Head>
    </Link>
  );
}

const StyledSeasons = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;

  @media screen and (max-width: 1920px) {
    width: 250px;
  }
  @media screen and (max-width: 1024px) {
    width: 50%;
    height: 300px;
    flex-direction: row;
    position: absolute;
    bottom: -5rem;
    left: 3rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
    left: 0;
    flex-direction: row;
    position: absolute;
  }
  @media screen and (max-width: 425px) {
    width: 90%;
    height: 240px;
    flex-direction: row;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .default-show {
    width: 175px;
    @media screen and (max-width: 1920px) {
      width: 150px;
    }
    @media screen and (max-width: 425px) {
      width: 100px;
    }
    transform: scale(1);
    h3 {
      opacity: 1;
    }
  }

  @keyframes left-to-right {
    from {
      margin-left: -110%;
    }
    to {
      margin-left: 0;
    }
  }
  animation: left-to-right 1s;
`;

const Head = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border: ${(props) =>
    props.show
      ? "2px solid rgba(255, 255, 255, 0.4)"
      : "2px solid rgba(0, 0, 0, 0)"};
  border-radius: 100px;
  text-align: center;
  width: ${(props) => (props.show ? "200px" : "50px")};
  height: 50px;
  transition: all 0.5s;
  transform: ${(props) => (props.show ? "scale(1)" : "scale(0.5)")};

  @media screen and (max-width: 1920px) {
    width: ${(props) => (props.show ? "175px" : "50px")};
  }
  @media screen and (max-width: 425px) {
    width: ${(props) => (props.show ? "100px" : "35px")};
    height: 35px;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 0.1rem;
    font-weight: lighter;
    opacity: ${(props) => (props.show ? "1" : "0")};
    transition: all 0.3s;

    @media screen and (max-width: 1920px) {
      font-size: 1.4rem;
    }
    @media screen and (max-width: 425px) {
      font-size: 1rem;
    }
  }
`;

const Line = styled.div`
  width: 2px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 1;
  @media screen and (max-width: 1920px) {
    height: 40px;
  }
  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 2px;
  }
  @media screen and (max-width: 1920px) {
    @keyframes line-anim {
      0% {
        height: 40px;
      }

      100% {
        height: 80px;
      }
    }
  }
  @media screen and (max-width: 1440px) {
    @keyframes line-anim {
      0% {
        height: 20px;
      }

      100% {
        height: 40px;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    @keyframes line-anim {
      0% {
        height: 2px;
        width: 80px;
      }

      100% {
        height: 2px;
        width: 80px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    @keyframes line-anim {
      0% {
        height: 2px;
        width: 50%;
      }

      100% {
        height: 2px;
        width: 100%;
      }
    }
  }

  animation: line-anim 1s forwards;
  animation-delay: 1s;
`;

export default DisplaySeasons;
