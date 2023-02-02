// import axios from "axios";
import {
  createContext,
  useContext,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react';
import { useRecentlyPlayed } from '../Hooks/RecentlyPlayed';

import { AllPlayerContext, MusicContent, AllContext } from './interface';
import { DataContext } from './index';

export const PlayerContext = createContext<AllPlayerContext | null>(null);

export const PlayerProvider = ({
  children
}: {
  [key: string]: ReactElement;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const storageIndex = Number(localStorage.getItem('index') as string);
  const storageCurrentTime = Number(
    localStorage.getItem('currentTime') as string
  );
  const [index, setIndex] = useState<number>(0);
  const [isRepeatOne, setIsRepeatOne] = useState(false);
  const [hasShuffle, setHasSfhuffle] = useState(false);
  // from backend??
  const [isFavorited, setIsFavorited] = useState(false);
  const { songs, addToPlaylist } = useContext(DataContext) as AllContext;

  //playlist will be change to recently played
  const storageCurrentPlay = JSON.parse(
    localStorage.getItem('currentlyPlayingSongs') as string
  ) as MusicContent[];
  const [currentlyPlayingSongs, setCurrentlyPlayingSongs] = useState<
    Array<MusicContent>
  >([]);
  const [songObj, setSongObj] = useState(currentlyPlayingSongs[index]);
  const [currentSong] = useState(currentlyPlayingSongs[index]);
  useEffect(() => {
    setSongObj(currentlyPlayingSongs[index]);
    const { addToRecentlyPlayed } = useRecentlyPlayed();
    if (currentlyPlayingSongs[index])
      addToRecentlyPlayed(currentlyPlayingSongs[index].id).then((res) =>
        console.log(res)
      );
  }, [index]);

  const audioPlayer = useRef(new Audio());
  useEffect(() => {
    console.log(index);
    localStorage.setItem(
      'currentlyPlayingSongs',
      JSON.stringify(currentlyPlayingSongs)
    );
    localStorage.setItem('index', JSON.stringify(index));
  }, [currentlyPlayingSongs, index, songObj]);

  // setInterval(()=>{localStorage.setItem('currentTime', JSON.stringify(audioPlayer.current.currentTime))}, 5000)

  useEffect(() => {
    if (
      !isNaN(storageIndex) &&
      storageCurrentPlay.length > 0 &&
      !isNaN(storageCurrentTime)
    ) {
      modifyCurrentlyPlaying(storageCurrentPlay);
      setIndex(storageIndex);
      const storageSongObj = storageCurrentPlay[storageIndex];
      setSongObj(storageSongObj);
      // audioPlayer.current.currentTime=storageCurrentTime;
    }
  }, []);

  const modifyCurrentlyPlaying = ( 
    playingList: MusicContent[],
    index?: number
  ) => {
    if(playingList.length<1){
      return;
    }
    // on firstLoad, set currently playing to recently played coming from backend
    // if not firstLoad currentlyPlaying should be persistent
    index = index || 0;
    setIndex(index);
    audioPlayer.current.src = playingList[index].songUrl;
    setSongObj(playingList[index]);
    setCurrentlyPlayingSongs(playingList);
  };

  const handleSongPlay = (newSongs: MusicContent[], toBePlayedId: string) => {
    if(newSongs.length<1){
      return;
    }
    const newIndex = newSongs.findIndex((item) => item.id === toBePlayedId);
    if (
      JSON.stringify(newSongs) === JSON.stringify(currentlyPlayingSongs) &&
      newIndex === index
    ) {
      togglePlay();
      return;
    }
    modifyCurrentlyPlaying(newSongs, newIndex);
    togglePlay(true);
  };

  const modifyPodcastCurrentlyPlaying = (
    playingList: any[],
    index?: number
  ) => {
    if(playingList.length<1){
      return;
    }
    audioPlayer.current.pause();
    // on firstLoad, set currently playing to recently played coming from backend
    // if not firstLoad currentlyPlaying should be persistent
    index = index || 0;
    audioPlayer.current.src = playingList[index].songUrl;
    setSongObj(playingList[index]);
    setCurrentlyPlayingSongs(playingList);
  };

  const togglePlay = (newSong?: boolean) => {
    if (newSong === true) {
      // audioPlayer.current.pause();
      setTimeout(function () {
        audioPlayer.current.play();
      }, 150);
      setIsPlaying(true);
      return;
    }
    if (!isPlaying) {
      setTimeout(function () {
        audioPlayer.current.play();
      }, 150);
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  const toggleSkipForward = () => {
    if (hasShuffle) {
      const shuffleIndex = Math.floor(
        Math.random() * (currentlyPlayingSongs.length - 1)
      );
      setIndex(shuffleIndex);
    }

    if (index >= currentlyPlayingSongs.length - 1) {
      setIndex(0);
      audioPlayer.current.src = currentlyPlayingSongs[0].songUrl;
    } else {
      setIndex((prev) => prev + 1);
      audioPlayer.current.src = currentlyPlayingSongs[index + 1].songUrl;
    }
    togglePlay(true);
  };

  const replaySong = () => {
    audioPlayer.current.currentTime = 0;
    // togglePlay(true)
  };

  const toggleSkipBackward = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      audioPlayer.current.src = currentlyPlayingSongs[index - 1].songUrl;
      // audioPlayer.current.play();
      togglePlay(true);
    }
  };

  const toggleIsRepeatOne = () => {
    setIsRepeatOne(!isRepeatOne);
  };

  const toggleShuffle = () => {
    setHasSfhuffle(!hasShuffle);
  };

  const toggleFavorites = async (id: string) => {
    setIsFavorited(!isFavorited);
    await addToPlaylist(id);
    // add to song to the favorites data source
  };

  return (
    <PlayerContext.Provider
      value={{
        index,
        songObj,
        toggleSkipBackward,
        toggleFavorites,
        isFavorited,
        replaySong,
        hasShuffle,
        toggleShuffle,
        isRepeatOne,
        toggleIsRepeatOne,
        toggleSkipForward,
        toggleBackward,
        toggleForward,
        togglePlay,
        currentSong,
        setIndex,
        isPlaying,
        audioPlayer,
        currentlyPlayingSongs,
        modifyCurrentlyPlaying,
        modifyPodcastCurrentlyPlaying,
        handleSongPlay
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
