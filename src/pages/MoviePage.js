import React from "react";
import DisplaySeasons from "../components/Seasons";
import Info from "../components/Info";
import Episodes from "../components/Episodes";
import styled from "styled-components";
import { useState, useRef, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";

import { GiSpeakerOff, GiSpeaker } from "react-icons/gi";
import Header from "../components/Header";

function MoviePage({ movies }) {
  const [data, setData] = useState("1");
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowsize, setSize] = useState(0);

  const { id, season } = useParams();

  const vid = document.getElementById("background-video");

  const backgroundRef = useRef();

  const movie = movies.filter((movie) => {
    let iwilllreturn = null;
    if (movie.slug === id) {
      iwilllreturn = movie;
    }
    return iwilllreturn;
  });

  const [ccurrentSeason, setCCurrentSeason] = useState(movie[0].seasons[0]);

  const setSeason = (season) => {
    setCCurrentSeason(season);
    vid && vid.load();
  };

  useLayoutEffect(() => {
    const UpdateSize = () => {
      setSize(window.innerHeight);
    };
    window.addEventListener("resize", UpdateSize);
    UpdateSize();
  }, []);

  const info = ccurrentSeason.episodes.filter((info) => {
    let iwillreturn = null;
    if (info.id === data) {
      iwillreturn = info;
    }
    return iwillreturn;
  });

  const childToParent = (childData) => {
    setData(childData);
  };

  return (
    <StyledMoviePage>
      <CurtainLeft></CurtainLeft>
      <CurtainRight></CurtainRight>
      <Header />

      <Background ref={backgroundRef} isFullscreen={isFullscreen}>
        <Speaker size={windowsize}>
          {muted ? (
            <GiSpeakerOff
              size={60}
              color={"rgba(255,255,255,0.8)"}
              onClick={() => (muted ? setMuted(false) : setMuted(true))}
            />
          ) : (
            <GiSpeaker
              color={"rgba(255,255,255,0.8)"}
              size={60}
              onClick={() => (muted ? setMuted(false) : setMuted(true))}
            />
          )}
        </Speaker>
        <FullScreen size={windowsize}>
          {isFullscreen ? (
            <svg
              onClick={() => {
                document.exitFullscreen();
                setIsFullscreen(false);
              }}
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 8H19V3H17V9V10H18H24V8ZM0 16H5V21H7V15V14H6H0V16ZM7 10H6H0V8H5V3H7V9V10ZM19 21V16H24V14H18H17V15V21H19Z"
                fill="currentColor"
              ></path>
            </svg>
          ) : (
            <svg
              onClick={() => {
                backgroundRef.current.requestFullscreen();
                setIsFullscreen(true);
              }}
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 5C0 3.89543 0.895431 3 2 3H9V5H2V9H0V5ZM22 5H15V3H22C23.1046 3 24 3.89543 24 5V9H22V5ZM2 15V19H9V21H2C0.895431 21 0 20.1046 0 19V15H2ZM22 19V15H24V19C24 20.1046 23.1046 21 22 21H15V19H22Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </FullScreen>

        <video id="background-video" playsInline autoPlay loop muted={muted}>
          <source
            src={ccurrentSeason.backgroundTrailer}
            type="video/mp4"
          ></source>
        </video>
      </Background>
      <DisplaySeasons
        seasons={movie[0].seasons}
        currentSeason={season}
        movieSlug={movie[0].slug}
      />
      <Info info={info[0]} />
      <Episodes
        movie={movie[0]}
        childToParent={childToParent}
        season={season}
        setSeason={setSeason}
        currentSeason={ccurrentSeason}
      />
    </StyledMoviePage>
  );
}

const StyledMoviePage = styled.div`
  display: flex;
`;

const CurtainLeft = styled.div`
  z-index: 5;
  width: 50vw;
  height: 100vh;
  background-color: white;
  position: absolute;
  left: 0;
  @keyframes curtain-left {
    from {
      width: 50vw;
    }

    to {
      width: 0;
    }
  }
  animation: curtain-left 1.3s forwards;
`;
const CurtainRight = styled.div`
  z-index: 5;
  width: 50vw;
  height: 100vh;
  background-color: white;
  position: absolute;
  right: 0;

  @keyframes curtain-right {
    from {
      width: 50vw;
    }

    to {
      width: 0;
    }
  }
  animation: curtain-right 1.3s forwards;
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  @media screen and (max-width: 768px) {
    background-color: #232323;
  }
  video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    filter: ${(props) =>
      props.isFullscreen ? "brightness(100%)" : "brightness(45%)"};
    user-select: none;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const Speaker = styled.div`
  position: absolute;
  left: 5rem;
  top: 9.5rem;
  z-index: 1;
  cursor: pointer;

  @media screen and (max-width: 1920px) {
    left: 4rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }

  svg {
    @media screen and (max-width: 1920px) {
      width: 50px;
    }
  }
`;

const FullScreen = styled.div`
  position: absolute;
  top: 10rem;
  left: 11rem;
  z-index: 1;
  cursor: pointer;

  @media screen and (max-width: 1920px) {
    left: 8.8rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  svg {
    @media screen and (max-width: 1920px) {
      width: 35px;
    }
  }
`;

export default MoviePage;
