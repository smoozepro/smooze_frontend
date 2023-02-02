/* eslint-disable prettier/prettier */

import React, { useState, useContext, useRef } from 'react';

import BrowseDetailcss from '../BrowseDetails/BrowseDetails.module.css';
import Artists from '../../Components/BrowseDetails/Artists';
import Playlists from '../../Components/BrowseDetails/Playlists';
import AllMusic from '../../Components/AllMusicUser/AllUserMusic';
import Newrelease from '../new-release/Newrelease.module.css';
import { Link } from 'react-router-dom';
import Genres from '../../Components/Browse/Genres';
import Podcast from '../../Components/Browse/Podcast';
import RecentlyPlayed from '../../Components/recentlyPlayed/recentlyPlayed';
import FlowSection from '../../Components/flowsection/FlowSection';

import { FlowContext } from '../../useContext/flowContext';
import {
  AllContext,
  AllGenres,
  AllPlayerContext,
  FlowInterface,
  MusicContent
} from '../../useContext/interface';
import Modal from 'react-modal';
import { CSSTransition } from 'react-transition-group';
import { AiFillCloseCircle } from 'react-icons/ai';
import { apiPost } from '../../utils/api';
import { toast } from 'react-toastify';
import { DataContext } from '../../useContext';
import { PlayerContext } from '../../useContext/PlayerBarContext';

const UserDashBoard = ({ from }: { from?: string }) => {
  const [activeLoad, setActiveLoad] = useState('forward');
  const [duration, setDuration] = useState(0);
  const { handleSongPlay } = useContext(PlayerContext) as AllPlayerContext;
  const handleLoadData = (e: React.SetStateAction<string>) => {
    console.log(e);
    setActiveLoad(e);
  };

  interface IProps {
    title: string;
    artist: string;
    album: string;
    genre: string;
    file: any;
  }

  const { closeFlowModal, openFlowModal, AddFlow, setStatus, status } =
    useContext(FlowContext) as FlowInterface;

  interface ArtistAttributes {
    id: string;
    name: string;
    imageUrl: string;
    instagramUrl: string;
    twitterUrl: string;
  }
  let { artist, genres, latestSongs } = useContext(DataContext) as AllContext;
  if (window.location.pathname === '/user-dashboard') {
    latestSongs = latestSongs.slice(0, 6);
  }

  const [artistName, setArtistName] = useState<string>('');
  const [musicData, setMusicData] = useState<IProps>({
    title: '',
    artist: '',
    album: '',
    genre: '',
    file: ''
  });

  const [dataValues, setDataValues] = useState<Record<string, any>>({});

  // let formData = new FormData();
  const [song_file, setSongFile] = useState<File>();
  const [image_file, setImageFile] = useState<File>();

  const handleChange = (e: { target: { name: string; value: any } }) => {
    if (e.target.name === 'song_duration') {
      setDuration(e.target.value);
    }
    if (e.target.name === 'artistId') {
      const data: ArtistAttributes | null | undefined = artist.find(
        (all) => all.id === e.target.value
      );
      if (data) {
        setArtistName(data.name);
      }
    }
    const { name, value } = e.target;

    setDataValues((dataValues) => ({ ...dataValues, [name]: value }));
    console.log(dataValues);
  };

  const handleSongFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      console.log(e.target.files[0].name);
      setSongFile(e.target.files[0]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      console.log(e.target.files[0].name);
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      dataValues.genreId && formData.append('genreId', dataValues.genreId);
      dataValues.title && formData.append('title', dataValues.title);
      artistName && formData.append('artist', artistName);
      dataValues.artistId && formData.append('artistId', dataValues.artistId);
      dataValues.song_duration &&
        formData.append('song_duration', dataValues.song_duration);

      if (song_file !== undefined) {
        formData.append('song_file', song_file);
      }
      if (image_file !== undefined) {
        formData.append('image_file', image_file);
      }
      console.log(dataValues);
      const res = await apiPost('/api/music/prem_create', formData);
      console.log(res.data);
      toast.success('Music Added Successfully');
    } catch (err: any) {
      const { code, error } = err.response.data;
      toast.warning(error);
    }
  };

  return (
    <div
      style={{ width: '100%', overflowX: 'hidden' }}
      className={BrowseDetailcss.parent}
    >
      <div style={{ marginBottom: '40px' }}></div>
      <div style={{ width: '100%', padding: '0% 5% 0% 8%', marginTop: '-2%' }}>
        <FlowSection />
        {status && (
          <Modal
            onRequestClose={() => closeFlowModal()}
            isOpen={true}
            style={{
              overlay: {
                backgroundColor: 'rgba(1,1,2,0.7)',
                width: '100%',
                backdropFilter: 'blur(1px)',
                border: 'none',
                justifyContent: 'center'
              },
              content: {
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                top: '10%',
                border: 'none',
                height: '80%',
                margin: '0 auto',
                left: '0',
                right: '0',
                bottom: '0',
                padding: '0',
                width: '70%'
              }
            }}
          >
            <CSSTransition
              in={true}
              timeout={1000}
              classNames={BrowseDetailcss.flowModal}
              unmountOnExit
            >
              <div className={BrowseDetailcss.flowModalContainer}>
                <h2>Add New Song</h2>
                <span className={BrowseDetailcss.FlowCloseIcon}>
                  <AiFillCloseCircle
                    className={BrowseDetailcss.FlowCloseIcon}
                    onClick={() => closeFlowModal()}
                  />
                </span>
                {/* <button >Close Modal</button> */}
                <div>
                  <div>
                    <label
                      htmlFor="artst"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      {' '}
                      Select Artist
                      <select
                        name="artistId"
                        id=""
                        className={BrowseDetailcss.flowModalInput}
                        onChange={(e: any) => handleChange(e)}
                      >
                        <option
                          value="Default"
                          defaultValue={'Select Artist'}
                          className={BrowseDetailcss.flowModalInput}
                        >
                          Select Artist
                        </option>
                        {artist &&
                          artist?.map((item: ArtistAttributes) => (
                            <option
                              key={item.id}
                              value={item.id}
                              datatype={item.name}
                            >
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label
                      htmlFor="genreId"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      {' '}
                      Select Genre
                      <select
                        name="genreId"
                        id="genreId"
                        className={BrowseDetailcss.flowModalInput}
                        onChange={(e: any) => handleChange(e)}
                      >
                        <option value="">Mode&Genre</option>
                        {genres &&
                          genres?.map((item: AllGenres) => (
                            <option
                              key={item.id}
                              value={item.id}
                              datatype={item.name}
                            >
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="artist"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      {' '}
                      Song Title
                      <input
                        className={BrowseDetailcss.flowModalInput}
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Song Title"
                        onChange={(e) => handleChange(e)}
                      />
                    </label>
                  </div>

                  <div>
                    <label
                      htmlFor="image_file"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      Enter Flow Image
                      <input
                        onChange={(e) => handleImageChange(e)}
                        className={BrowseDetailcss.flowModalInpu_filet}
                        id="image_file"
                        name="image_file"
                        type="file"
                        accept=".jpeg, .jpg, .png, .gif, .svg"
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="song_file"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      Enter Song
                      <input
                        className={BrowseDetailcss.flowModalInpu_filet}
                        id="song_file"
                        name="song_file"
                        type="file"
                        accept=".mp3, .wav, .ogg, .flac, .aac .m4a .wma .aiff .alac .mp4"
                        onChange={(e) => handleSongFileChange(e)}
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="song_duration"
                      className={BrowseDetailcss.flowModalLacbel}
                    >
                      <span>{`${duration} Min`}</span>
                    </label>
                  </div>
                  <div></div>
                  <span
                    className={BrowseDetailcss.flowSubmit}
                    onClick={(e: any) => handleSubmit(e)}
                  >
                    {' '}
                    Add Music
                  </span>
                </div>
              </div>
            </CSSTransition>
          </Modal>
        )}

        {/* Recently played section */}
        <div className={BrowseDetailcss.container}>
          <RecentlyPlayed />
        </div>

        {/* Genres section */}

        <div className={BrowseDetailcss.container}>
          <div id={'PLAYLISTS'} className={BrowseDetailcss.header}>
            <span>Genres</span>
            <Link to={'/browse'} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <Genres from="dashboard" />
        </div>

        {/* ALl music section */}

        <div className={BrowseDetailcss.container}>
          <div id={'PLAYLISTS'} className={BrowseDetailcss.header}>
            <span>All Music</span>
            <Link to={'/allmusic'} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <AllMusic from="dashboard" />
        </div>

        {/* Podcast Section   */}

        <div className={BrowseDetailcss.container}>
          <div className={BrowseDetailcss.header}>
            <span>Podcasts</span>
            <Link to="/podcast" className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <p className={BrowseDetailcss.musicInfoDescription}>
            Explore by categories and popularity
          </p>
          <Link to={'/podcast'} style={{ marginTop: '0%' }}>
            <Podcast from='dashboard'/>
          </Link>
        </div>

        {/* Playlist Section */}

        <div className={BrowseDetailcss.container}>
          <div id={'PLAYLISTS'} className={BrowseDetailcss.header}>
            <span>Playlist picks</span>
            <Link to={'/playlist'} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <p className={BrowseDetailcss.musicInfoDescription}>
            Selected for you based on your recent activity
          </p>

          <Playlists />
        </div>

        <div className={Newrelease.container}>
          <div className={BrowseDetailcss.header}>
            <span>New releases for you</span>
            <Link to={'/new-release'} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
          </div>
          <div className={Newrelease.musicContainer}>
            {latestSongs.length > 0 &&
              latestSongs.map((song) => (
                <div
                  key={song.id}
                  className={Newrelease.music}
                  onClick={() => {
                    handleSongPlay(latestSongs, song.id);
                  }}
                >
                  <div className={Newrelease.musicImg}>
                    <img src={song.imageUrl} alt="lp5" />
                    <div className={Newrelease.description}>{song.title}</div>
                    <div className={Newrelease.artists}>{song.artist}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={BrowseDetailcss.ArtisteMainContainer}>
          <div id={'ARTISTS'} className={BrowseDetailcss.header}>
            <span>You might like these artists</span>
            <Link to={'/artist'} className={BrowseDetailcss.browseLink}>
              VIEW ALL
            </Link>
            {/* <Link to={"/artist"}>
                {" "}
                <span className={BrowseDetailcss.Browseviewall}>VIEW ALL</span>
              </Link> */}
          </div>
          <div className={BrowseDetailcss.ArtisteContainer}>
            <Artists from="dashboard" />
          </div>

          {/* <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              padding: "0",
              left: "0",
              zIndex:200000,
              backgroundColor:"red"
            }}
          >
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default UserDashBoard;
