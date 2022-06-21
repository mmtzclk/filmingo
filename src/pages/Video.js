import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Video({ movies }) {
  const { id, season, episode } = useParams();

  const [movieDetail, setMovieDetail] = useState();
  const player = useRef({
    current: {
      duration: 0.0,
    },
  });
  const fullscreenRef = useRef(false);

  const [play, setPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVolume, setCurrentVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [inputAnim, setInputAnim] = useState(false);
  const [userActivity, setUserActivity] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      // eslint-disable-next-line
      const currentMovie = await movies.filter((movie) => {
        // eslint-disable-next-line
        if (movie.slug === id) return movie;
      });

      const currentSeason = await currentMovie[0].seasons.filter(
        // eslint-disable-next-line
        (getSeason) => {
          if (getSeason.slug === season) return getSeason;
        }
      );

      const currentEpisode = await currentSeason[0].episodes.filter(
        // eslint-disable-next-line
        (getEpisode) => {
          if (getEpisode.slug === episode) return getEpisode;
        }
      );
      setMovieDetail(currentEpisode[0]);
    };

    if (currentVolume === "0") {
      setMuted(true);
    } else {
      setMuted(false);
    }

    let inactivityTime = function () {
      let time;
      document.onmousemove = resetTimer;

      function resetTimer() {
        clearTimeout(time);
        setUserActivity(true);
        time = setTimeout(() => setUserActivity(false), 6000);
      }
    };

    inactivityTime();
    getMovie();
  }, [movies, id, season, episode, currentVolume]);

  const handleSeek = (e) => {
    player.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setCurrentVolume(e.target.value);
    player.current.volume = currentVolume;
  };

  const HHMMSS = (i) => {
    let sec = Math.floor(i);
    let min = Math.floor(sec / 60);
    min = min >= 10 ? min : "0" + min;
    sec = Math.floor(sec % 60);
    sec = sec >= 10 ? sec : "0" + sec;
    return min + ":" + sec;
  };

  return (
    <StyledVideo ref={fullscreenRef} userActivity={userActivity}>
      {movieDetail && (
        <React.Fragment>
          <Back onClick={() => navigate(-1)} userActivity={userActivity}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 11.0001L3.41421 11.0001L8.70711 5.70718L7.29289 4.29297L0.292892 11.293C0.105356 11.4805 0 11.7349 0 12.0001C0 12.2653 0.105356 12.5196 0.292892 12.7072L7.29289 19.7072L8.70711 18.293L3.41421 13.0001H24V11.0001Z"
                fill="currentColor"
              ></path>
            </svg>
          </Back>
          <video
            onClick={() => {
              if (player.current.paused) {
                player.current.play();
                setPlay(true);
              } else {
                player.current.pause();
                setPlay(false);
              }
            }}
            ref={player}
            playsInline
            onSeeking={() => setCurrentTime(player.current.currentTime)}
            onTimeUpdate={() => {
              setCurrentTime(player.current.currentTime);
            }}
            poster={movieDetail.photoUrl}
            muted={muted}
          >
            <source src={movieDetail.url} type="video/mp4" />
          </video>
          <Controls userActivity={userActivity}>
            <Timing>
              <Range>
                <input
                  onChange={handleSeek}
                  type="range"
                  min={0}
                  max={player.current.duration}
                  value={currentTime}
                  step="any"
                />
              </Range>
              <Time>
                <h3>
                  {player.current.currentTime === undefined
                    ? "00:00"
                    : HHMMSS(player.current.currentTime)}
                </h3>
                <span> / </span>
                <h3>
                  {player.current.duration === undefined
                    ? "00:00"
                    : HHMMSS(player.current.duration)}
                </h3>
              </Time>
            </Timing>
            <Buttons>
              <Left>
                {!play ? (
                  <svg
                    onClick={() => {
                      player.current.play();
                      setPlay(true);
                    }}
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      player.current.pause();
                      setPlay(false);
                    }}
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                )}
                <Box />
                <svg
                  onClick={() =>
                    (player.current.currentTime =
                      player.current.currentTime - 10)
                  }
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97067 20.8978 6.88324 21.5694 9.09718C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479975 13.5867 -0.214319 10.8238 0.057802C8.71195 0.2658 6.70517 1.02859 5 2.2532V1H3V5C3 5.55229 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55229 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1759 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43389C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43389C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1759 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01929V15.8554H8.60395Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <Box />
                <svg
                  onClick={() =>
                    (player.current.currentTime =
                      player.current.currentTime + 10)
                  }
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4443 3.68532C8.36794 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55228 21 5V1H19V2.2532C17.2948 1.02858 15.288 0.265799 13.1762 0.0578004C10.4133 -0.214321 7.64153 0.479973 5.33315 2.02238C3.02478 3.56479 1.32262 5.85989 0.516716 8.51661C-0.28919 11.1733 -0.148983 14.0273 0.913448 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09717C3.10218 6.88324 4.52065 4.97066 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55228 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2077 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1758 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43388C15.2077 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43388C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1758 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.4289 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.4289 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01928L7 9.81956V11.1405L8.60395 10.7163Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <Box />
                <Volume
                  showVolume={showVolume}
                  inputAnim={inputAnim}
                  onMouseEnter={() => {
                    setShowVolume(true);
                    setInputAnim(true);
                  }}
                  onMouseLeave={() => {
                    setShowVolume(false);
                    setInputAnim(false);
                  }}
                >
                  <VolumeInput showVolume={showVolume}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      onChange={handleVolume}
                      onSeeking={() => {
                        setCurrentVolume(player.current.volume);
                      }}
                      value={currentVolume}
                    />
                  </VolumeInput>
                  {muted ? (
                    <svg
                      onClick={() => setMuted(false)}
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setMuted(true)}
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="volume"
                    >
                      <path
                        d="M24 12C24 8.28699 22.525 4.72603 19.8995 2.10052L18.4853 3.51474C20.7357 5.76517 22 8.81742 22 12C22 15.1826 20.7357 18.2349 18.4853 20.4853L19.8995 21.8995C22.525 19.274 24 15.7131 24 12ZM11 4.00001C11 3.59555 10.7564 3.23092 10.3827 3.07613C10.009 2.92135 9.57889 3.00691 9.29289 3.29291L4.58579 8.00001H1C0.447715 8.00001 0 8.44773 0 9.00001V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00001ZM5.70711 9.70712L9 6.41423V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70712ZM16.0001 12C16.0001 10.4087 15.368 8.8826 14.2428 7.75739L12.8285 9.1716C13.5787 9.92174 14.0001 10.9392 14.0001 12C14.0001 13.0609 13.5787 14.0783 12.8285 14.8285L14.2428 16.2427C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92896C18.9462 6.80432 19.9998 9.34786 19.9998 12C19.9998 14.6522 18.9462 17.1957 17.0709 19.0711L15.6567 17.6569C17.157 16.1566 17.9998 14.1218 17.9998 12C17.9998 9.87829 17.157 7.84346 15.6567 6.34317L17.0709 4.92896Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                </Volume>
              </Left>
              <Center>
                <h3>{movieDetail.name + " : " + movieDetail.title}</h3>
              </Center>
              <Right>
                {fullScreen ? (
                  <svg
                    onClick={() => {
                      document.exitFullscreen();
                      setFullScreen(false);
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
                      fullscreenRef.current.requestFullscreen();
                      setFullScreen(true);
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
              </Right>
            </Buttons>
          </Controls>
        </React.Fragment>
      )}
    </StyledVideo>
  );
}

const StyledVideo = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: black;
  z-index: 999;
  cursor: ${(props) => (props.userActivity ? "" : "none")};

  video {
    height: 100%;
    width: 100%;
  }

  svg {
    :hover {
      transform: scale(1.3);
    }
    transition: all 0.1s;
    cursor: pointer;

    @media screen and (max-width: 1024px) {
      width: 34px;
    }
    @media screen and (max-width: 768px) {
      width: 28px;
    }
    @media screen and (max-width: 425px) {
      width: 25px;
    }
  }
`;

const Back = styled.div`
  position: absolute;
  left: ${(props) => (props.userActivity ? "2rem" : "-3rem")};
  top: 2rem;
  z-index: 2;
  transition: left 0.5s;
`;

const Controls = styled.div`
  height: 134.5px;
  width: 100%;
  position: absolute;
  bottom: ${(props) => (props.userActivity ? "1vh" : "-134.5px")};

  transition: bottom 0.5s;

  @media screen and (max-width: 1280px) {
    height: 121px;
  }
  @media screen and (max-width: 1150px) {
    height: 107px;
  }
  @media screen and (max-width: 1024px) {
    height: 77px;
  }
  @media screen and (max-width: 425px) {
    bottom: ${(props) => (props.userActivity ? "7vh" : "-134.5px")};
  }
`;

const Timing = styled.div`
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 2rem;
  @media screen and (max-width: 425px) {
    margin: 0 1rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70%;
  margin: 0 2rem;
  @media screen and (max-width: 425px) {
    margin: 0 1rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const VolumeInput = styled.div`
  position: absolute;
  left: 4rem;
  top: 20%;
  @media screen and (max-width: 425px) {
    display: none;
  }
`;

const Volume = styled.div`
  position: relative;
  width: ${(props) => (props.showVolume === true ? "13rem" : "")};

  @media screen and (max-width: 425px) {
    width: 5rem;
  }
  input[type="range"] {
    opacity: 0;
    -webkit-appearance: none;
    height: 5px;
    border-radius: 5px;
    margin: 0 auto;
    outline: 0;
    @keyframes input-anim {
      from {
        width: 0rem;
        opacity: 1;
      }
      to {
        width: 8rem;
        opacity: 1;
      }
    }
    @keyframes input-anim-out {
      from {
        width: 8rem;
        opacity: 1;
      }
      to {
        width: 0rem;
        opacity: 0;
      }
    }
    animation: ${(props) =>
        props.inputAnim === true ? "input-anim" : "input-anim-out"}
      0.5s forwards;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #0d81ec;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }

  input[type="range"]::-webkit-slider-thumb:active {
    transform: scale(1.6);
  }
`;

const Center = styled.div`
  user-select: none;
  position: absolute;
  left: 50%;
  h3 {
    font-weight: lighter;
    font-size: 1.5rem;
    @media screen and (max-width: 1024px) {
      font-size: 2.2em;
    }
    @media screen and (max-width: 425px) {
      font-size: 3em;
    }
  }
`;
const Right = styled.div``;
const Range = styled.div`
  width: 92%;

  @media screen and (max-width: 1024px) {
    width: 88%;
  }
  @media screen and (max-width: 425px) {
    width: 80%;
  }

  input {
    width: 100%;
    cursor: pointer;
  }
`;
const Time = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85vw;

  @media screen and (max-width: 1024px) {
    font-size: 1.5em;
  }
  @media screen and (max-width: 425px) {
    font-size: 2.5em;
  }
`;

const Box = styled.div`
  height: 100%;
  width: 3rem;

  @media screen and (max-width: 1024px) {
    width: 2.5rem;
  }
  @media screen and (max-width: 768px) {
    width: 2rem;
  }
  @media screen and (max-width: 425px) {
    width: 1rem;
  }
`;

export default Video;
