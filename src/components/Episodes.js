import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

import { ImStarFull } from "react-icons/im";

import { useEffect, useLayoutEffect } from "react";

function Episodes({ movie, childToParent, season, setSeason, currentSeason }) {
  const [reachBeginning, setReachBeginning] = useState(true);
  const [reachEnd, setReachEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [slideLength, setSlideLength] = useState("");
  const [swiperRef, setSwiperRef] = useState(null);
  const [size, setSize] = useState(0);

  const filterSeason = () => {
    swiperRef && swiperRef.slideTo(0);
    swiperRef && swiperRef.activeIndex === 0
      ? movie.seasons.filter((seasonn) =>
          seasonn.slug === season ? setSeason(seasonn) : ""
        )
      : swiperRef && swiperRef.slideTo(0);
  };

  useEffect(() => {
    setSlideLength(currentSeason.episodes.length);

    filterSeason(); // eslint-disable-next-line
  }, [movie, season, currentSeason]);

  useLayoutEffect(() => {
    const UpdateSize = () => {
      if (window.innerWidth <= 768) {
        setSize(1);
      } else if (window.innerWidth <= 1440) {
        setSize(1);
      } else {
        setSize(2);
      }
    };
    window.addEventListener("resize", UpdateSize);
    UpdateSize();
  }, []);

  return (
    <StyledEpisodes>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={size}
        slidesPerGroup={1}
        spaceBetween={30}
        navigation={{
          nextEl: "#swiper-forward",
          prevEl: "#swiper-back",
        }}
        modules={[Pagination, Navigation]}
        onSlideChange={(props) => {
          props.isBeginning
            ? setReachBeginning(true)
            : setReachBeginning(false);
          props.isEnd ? setReachEnd(true) : setReachEnd(false);
          setActiveIndex(props.activeIndex + 1);
        }}
        onSlideChangeTransitionEnd={(props) => {
          props.slides.filter((slide) =>
            slide.classList[1] === "swiper-slide-active"
              ? childToParent(slide.id)
              : ""
          );
        }}
      >
        {currentSeason.episodes.map((episode) => (
          <SwiperSlide key={episode.id} id={episode.id}>
            <EpisodeCard>
              <img src={episode.photoUrl} alt={episode.title} />
              <Infos>
                <h3>{episode.name}</h3>
                <h2>{episode.title}</h2>
                <h4>
                  <ImStarFull size={25} color="gold" />
                  {episode.rate}
                </h4>
              </Infos>
            </EpisodeCard>
          </SwiperSlide>
        ))}
        <SwiperSlide className="empty-slide"></SwiperSlide>
      </Swiper>
      <Controls>
        <Buttons>
          <IoChevronBackCircleOutline
            id="swiper-back"
            fill="clear"
            size={70}
            opacity={reachBeginning ? "0.5" : "1"}
          >
            he
          </IoChevronBackCircleOutline>
          <IoChevronForwardCircleOutline
            id="swiper-forward"
            fill="clear"
            size={70}
            opacity={reachEnd ? "0.5" : "1"}
          ></IoChevronForwardCircleOutline>
        </Buttons>
        <ActiveIndex>
          <h4>{activeIndex}</h4>
          <Line />
          <h4 style={{ opacity: 0.5 }}>{slideLength}</h4>
        </ActiveIndex>
      </Controls>
    </StyledEpisodes>
  );
}

const StyledEpisodes = styled.div`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  @media screen and (max-width: 768px) {
    top: 6rem;
    transform: translateY(0%);
    right: 2rem;
    width: 50vw;
  }
  @media screen and (max-width: 425px) {
    width: 88%;
    height: 30vh;
    top: 5rem;
    left: 6vw;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
  }

  .swiper {
    width: 40vw;
    height: 28vw;
    border-radius: 15px;

    @media screen and (max-width: 1440px) {
      width: 30vw;
      height: 55vh;
    }
    @media screen and (max-width: 768px) {
      width: 45vw;
      height: 60vh;
    }
    @media screen and (max-width: 425px) {
      width: 100%;
      height: 100%;
    }
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    font-size: 18px;
    background-color: grey;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    height: 22vw;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    border-radius: 15px;
    align-items: center;
    transition: all 0.3s ease;
    cursor: grab;

    @media screen and (max-width: 768px) {
      height: 100%;
    }
  }

  .swiper-slide-active {
    width: 22vw;
    height: 27vw;
    @media screen and (max-width: 1440px) {
      height: 55vh;
    }
    @media screen and (max-width: 768px) {
      height: 100%;
    }
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
    filter: brightness(50%);
  }

  .empty-slide {
    background: none;
    @media screen and (max-width: 1440px) {
      display: none;
    }
  }
`;

const EpisodeCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 15px;
`;

const Infos = styled.div`
  position: absolute;
  border-radius: 15px;
  bottom: 0;
  left: 10%;

  h3 {
    color: #d2d2d3;
    font-weight: lighter;
    font-size: 0.9vw;
    margin-bottom: -1rem;
    @media screen and (max-width: 1440px) {
      font-size: 1.1em;
      margin-bottom: 0;
    }
    @media screen and (max-width: 768px) {
      font-size: 0.9em;
    }
  }
  h4 {
    font-weight: lighter;
    color: #d2d2d3;
    font-size: 1vw;
    display: flex;
    align-items: center;
    @media screen and (max-width: 1440px) {
      font-size: 1.1em;
    }
    @media screen and (max-width: 768px) {
      font-size: 0.8em;
    }
    svg {
      padding-right: 0.7rem;
    }
  }
  h2 {
    font-size: 1.5vw;
    line-height: 3rem;
    @media screen and (max-width: 1440px) {
      font-size: 1.8em;
      line-height: 2.2rem;
    }
    @media screen and (max-width: 768px) {
      font-size: 1.3em;
      line-height: 1rem;
    }
  }
`;

const Buttons = styled.div`
  #swiper-forward {
    margin-left: 1.5rem;
    @media screen and (max-width: 425px) {
      margin-left: 1rem;
    }
  }

  svg {
    cursor: pointer;
    @media screen and (max-width: 1440px) {
      width: 55px;
      height: 55px;
    }
    @media screen and (max-width: 425px) {
      width: 40px;
      height: 40px;
    }
  }
`;

const ActiveIndex = styled.div`
  display: flex;
  align-items: center;
  width: 10rem;
  justify-content: space-between;

  @media screen and (max-width: 1920px) {
    font-size: 1.2em;
  }
  @media screen and (max-width: 1440px) {
    font-size: 1.5em;
    width: 8rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 2.5em;
    width: 12rem;
  }
  @media screen and (max-width: 425px) {
    font-size: 4em;
    width: 8rem;
  }
`;

const Line = styled.div`
  width: 6rem;
  height: 0.1rem;
  background-color: white;
  @media screen and (max-width: 1440px) {
    width: 4rem;
  }
  @media screen and (max-width: 768px) {
    width: 7rem;
  }
  @media screen and (max-width: 425px) {
    width: 5rem;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  @media screen and (max-width: 1440px) {
    margin-top: 3rem;
  }
  @media screen and (max-width: 1024px) {
    margin-top: 2rem;
  }
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
  @media screen and (max-width: 425px) {
    margin-top: 0.5rem;
  }
`;

export default Episodes;
