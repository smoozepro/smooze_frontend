/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiTwotoneHeart } from 'react-icons/ai';
import AllUserMusic from './AllUserMusic.module.css';
import { DataContext } from '../../useContext';
import {
  AllContext,
  AllPlayerContext,
  MusicContent
} from '../../useContext/interface';
import { PlayerContext } from '../../useContext/PlayerBarContext';
import { WindowSharp } from '@mui/icons-material';

function AllMusic({ from }: { from?: string }) {
  const { songs, addToPlaylist } = useContext(DataContext) as AllContext;
  const isNowPlaying = useRef(0);
  const { modifyCurrentlyPlaying, togglePlay } = useContext(
    PlayerContext
  ) as AllPlayerContext;

  let [firstSongs, setFirstSongs] = useState<MusicContent[]>([]);

  useEffect(() => {
    if (window.location.pathname === '/user-dashboard'){
      setFirstSongs(songs.slice(0, 6));
    }else{
      setFirstSongs(songs);
    }
  }, [songs]);

  const handleSongPlay = (id: string) => {
    const index = songs.findIndex((item) => item.id === id);
    if (isNowPlaying.current !== index) {
      isNowPlaying.current = index;
      modifyCurrentlyPlaying(songs, index);
      togglePlay(true);
    } else {
      togglePlay();
    }
  };

  return (
    <div className={AllUserMusic.musicContainer}>
      {firstSongs.length > 0 &&
        firstSongs.map((song: MusicContent) => (
          <div
            className={AllUserMusic.music}
            key={song.id}
            onClick={() => {
              handleSongPlay(song.id);
            }}
          >
            <div className={AllUserMusic.musicImg}>
              <img src={song.imageUrl} alt="deepFocus" />
            </div>
            <div className={AllUserMusic.musicInfo}>
              <h4 className={AllUserMusic.musicInfoHeader}>{song.title}</h4>
              <span className={AllUserMusic.iconAndDesc}>
                <AiTwotoneHeart
                  onClick={async () => await addToPlaylist(song.id)}
                  className={AllUserMusic.iconLike}
                />
                <p className={AllUserMusic.musicInfoDescription}>657,234</p>
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AllMusic;
