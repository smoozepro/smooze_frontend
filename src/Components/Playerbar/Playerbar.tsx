/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useState } from 'react';
import playerbar from './Playerbar.module.css';
import image59 from '../../assets/Image 59.png';
import { BiHeart, BiVolumeMute } from 'react-icons/bi';
import {
  IoCheckmarkSharp,
  IoRepeat,
  IoVolumeHighSharp,
  IoVolumeLowOutline
} from 'react-icons/io5';
import { CiShuffle } from 'react-icons/ci';
import { FiSkipBack, FiSkipForward } from 'react-icons/fi';
import {
  AiOutlineStepBackward,
  AiOutlineStepForward,
  AiFillHeart
} from 'react-icons/ai';
import { TbRepeatOnce, TbArrowsRightLeft } from 'react-icons/tb';
import { GiPauseButton } from 'react-icons/gi';
import { View, View2, View3, View4 } from '../ProgressBar/ProgressBar';
// import { View, View2 } from "../ProgressBar/ProgressBar";
import Queue from '../../assets/Queue.png';
import { BsFillVolumeOffFill, BsPlay, BsVolumeUp } from 'react-icons/bs';
import { MdVolumeDown, MdVolumeOff } from 'react-icons/md';

import { formatTime, PSlider, PSliderLong } from './helpers';

import { AllContext, AllPlayerContext } from '../../useContext/interface';
import { PlayerContext } from '../../useContext/PlayerBarContext';

import { DataContext } from '../../useContext';
import { SliderValueLabel } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Slider from 'react-slick';
import TextEllipsis from '../ElipseComponent/TextEllipsis';

const PlayBar = () => {
  function generateColor() {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.5)`;
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { songs } = useContext(DataContext) as AllContext;
  const {
    modifyCurrentlyPlaying,
    togglePlay,
    isRepeatOne,
    isFavorited,
    toggleFavorites,
    replaySong,
    toggleShuffle,
    hasShuffle,
    toggleIsRepeatOne,
    isPlaying,
    audioPlayer,
    currentSong,
    toggleSkipBackward,
    toggleSkipForward,
    toggleBackward,
    toggleForward,
    songObj
  } = useContext(PlayerContext) as AllPlayerContext;
  const [isMobile, setIsMobile] = useState(false);
  const [color, setColor] = useState(generateColor());

  setInterval(() => {
    setColor(generateColor());
  }, 60000);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      if (screenWidth < 980) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    if (songs.length > 0) {
      // modifyCurrentlyPlaying(songs);
    }

    window.addEventListener('resize', handleResize);
    // return () => {
    // 	window.removeEventListener('resize', handleResize);
    // };
  }, [screenWidth, songs]);

  // const [FiSkipForward, setFiSkipForward] = useState(true);
  // const handleFiSkipForward = () => {
  // 	setFiSkipForward(!FiSkipForward);
  // };

  const [volume, setVolume] = useState(30);
  const [sliderValue, setSliderValue] = useState(0);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    console.log(currentSong);

    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        const sliderCalc = (_elapsed / _duration) * 100;
        // console.log(currentSong)
        setSliderValue(sliderCalc);
        setDuration(_duration);
        setElapsed(_elapsed);
        if (_elapsed === _duration) {
          if (isRepeatOne) {
            replaySong();
          } else {
            toggleSkipForward();
          }
        }
      }, 100);
    }
  }, [volume, isPlaying, isRepeatOne, currentSong, songObj]);

  function VolumesBtns() {
    return mute ? (
      <BiVolumeMute color="white" onClick={() => setMute(!mute)} />
    ) : volume < 15 ? (
      <MdVolumeDown color="white" onClick={() => setMute(!mute)} />
    ) : volume < 55 ? (
      <BsFillVolumeOffFill color="white" onClick={() => setMute(!mute)} />
    ) : (
      <IoVolumeHighSharp color="white" onClick={() => setMute(!mute)} />
    );
  }

  return (
    <div
      className={playerbar.playbar}
      style={{
        backgroundColor: isPlaying ? color : 'transparent',
        transition: 'all 2s ease-in-out',
        WebkitBackdropFilter: 'blur(5px)',
        backdropFilter: 'blur(5px)',
        border: '5px',
        width: '100%'
      }}
    >
      {songObj && (
        <audio src={songObj.songUrl} ref={audioPlayer} muted={mute} />
      )}
      <div className={playerbar.playbarleft}>
        <div className={playerbar.playbarleftsonginfo}>
          {songObj && (
            <img
              className={playerbar.img}
              src={songObj.imageUrl}
              alt="song"
              // maxHeight="100px"
              // MaxWidth="100px"
            />
          )}
          <div className={playerbar.artistInfo}>
            {songObj && (
              <>
                <TextEllipsis text={songObj.title} />
                {/* <h4>{songObj.title}</h4> */}
                {/* <TextEllipsis text={songObj.artist} /> */}
                <span className={playerbar.title}>{songObj.artist}</span>
              </>
            )}
          </div>
        </div>
        <div className={playerbar.playbarLeftButton}>
          <span>
            {songObj && !isFavorited ? (
              <BiHeart
                onClick={async () => await toggleFavorites(songObj.id)}
              />
            ) : (
              <AiFillHeart
                color="red"
                onClick={async () => {
                  await toggleFavorites(audioPlayer.current.src);
                }}
              />
            )}
          </span>
          <span>
            <IoCheckmarkSharp />
          </span>
        </div>
      </div>
      <div className={playerbar.playbarleftcontrol}>
        <div className={playerbar.controlButton}>
          {/* start */}
          {hasShuffle ? (
            <CiShuffle onClick={toggleShuffle} />
          ) : (
            <TbArrowsRightLeft onClick={toggleShuffle} />
          )}

          <AiOutlineStepBackward onClick={toggleSkipBackward} />
          <FiSkipBack onClick={toggleBackward} />

          {!isPlaying ? (
            <BsPlay onClick={(e) => togglePlay()} />
          ) : (
            <GiPauseButton onClick={(e) => togglePlay()} />
          )}

          <FiSkipForward onClick={toggleForward} />
          <AiOutlineStepForward onClick={toggleSkipForward} />

          {isRepeatOne ? (
            <TbRepeatOnce onClick={toggleIsRepeatOne} />
          ) : (
            <IoRepeat onClick={toggleIsRepeatOne} />
          )}
        </div>
        <div className={playerbar.progress}>
          {/* {isMobile ? <View3 /> : <View />} */}
          <p>{formatTime(elapsed)}</p>
          <PSliderLong thumbless value={sliderValue} />
          <p>{formatTime(duration - elapsed)}</p>
        </div>
      </div>

      <div className={playerbar.playbarRightButton}>
        <img src={Queue} alt="queue" height="200px" />
        <VolumesBtns />
        {/* {isMobile ? <View4 /> : <View2 />}  */}
        <PSlider
          min={0}
          max={100}
          value={volume}
          onChange={(e: any, v: any) => setVolume(v)}
        />
      </div>
    </div>
  );
};

const PlayerBar = () => {
  return (
    <>
      <div
        style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '30' }}
      >
        <PlayBar />
      </div>
      <Outlet />
    </>
  );
};

export default PlayerBar;
