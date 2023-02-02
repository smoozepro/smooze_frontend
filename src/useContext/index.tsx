/*eslint-disable*/
import { createContext, ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiGet, apiPost, apiPostNoAuth, getArtist } from '../utils/api/axios';
import AxiosErrorHandler from '../utils/api/axiosErrorHandler';
import {
  AllPodcast,
  AllContext,
  UserContent,
  LoginData,
  SignupData,
  AllGenres,
  ArtistAttributes,
  MusicContent,
  RecentMusic,
  podcategory,
  podcastItem
} from './interface';
import { checkLoginStatus } from './ProtectRoutes';
export const DataContext = createContext<AllContext | null>(null);
const initialUser: UserContent = {
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  country: '',
  profileImage: '',
  is_premium: false,
  date_birth: '00/00/0000',
  userName: '',
  role: '',
  day: '',
  month: '',
  year: ''
};

export const DataProvider = ({ children }: { [key: string]: ReactElement }) => {
  const [hasRememberMe, setHasRememberMe] = useState(true);
  const navigate = useNavigate();
  const [artist, setArtist] = useState<ArtistAttributes[]>([]);
  const [latestSongs, setLatestSongs] = useState<MusicContent[]>([]);
  const [playlist, setPlaylist] = useState<MusicContent[]>([]);
  const [genres, setGenres] = useState<AllGenres[]>([]);
  const [songs, setSongs] = useState<MusicContent[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uploadingData, setUploadingData] = useState(false);
  const [displayRecentMusic, setDisplayRecentMusic] = useState<RecentMusic[]>(
    []
  );
  const [justUploaded, setJustUploaded] = useState<MusicContent | null>(null);
  const [user, setUser] = useState<UserContent>(initialUser);
  const storedUser = localStorage.getItem('user');
  const [newError, setNewError] = useState<string | null>(null);
  const [reloadArtists, setReloadArtists] = useState(false);
  const [podcasts, setPodcasts] = useState<any>([]);

  const [allPodcasts, setPodcast] = useState<AllPodcast[]>([]);

  const [podCategories, setPodCategories] = useState<podcategory[]>([]);
  const [curCatList, setCurCatList] = useState<MusicContent[]>([]);
  const [categorypd, setcategorypd] = useState<string>('');

  const getPodcastCategories = async () => {
    try {
      const res = await apiGet('/api/podcast/allpodcastcatetgory');
      const categories = res.data.allPodcastCategories;
      console.log(categories);
      setPodCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  // const normalisePD = (list: podcastItem[]) => {
  //   return list.map((item: any, index: number) => {
  //     item.songUrl = item.episodeUrl;
  //     item.artist = item.name;
  //     item.artistId = '';
  //     item.genreId = '';
  //     return item;
  //   }) as unknown as MusicContent[];
  // };

  // useEffect(() => {
  //   const pdGet = async () => {
  //     try {
  //       const res = await apiGet(`/api/podcast/category/${categorypd}`);
  //       const data = res.data.categories?.[0]?.podcast;
  //       const pdCategoryList = normalisePD(data);

  //       setCurCatList(pdCategoryList);
  //     } catch (error) {
  //       console.error;
  //     }
  //   };
  //   pdGet();
  // }, [categorypd]);

  const [authLoading, setAuthLoading] = useState(false);

  const handlePostCast = async () => {
    try {
      const res = await apiGet('/api/podcast/podcasts');
      const { data } = res;
      let podsData = data.podcasts.map((pods: any) => {
        const obj: any = {
          id: pods?.id,
          title: pods?.title,
          songUrl: pods?.episodeUrl,
          episodeUrl: pods?.episodeUrl,
          imageUrl: pods?.imageUrl,
          category: pods?.category,
          name: pods?.name,
          description: pods?.description,
          createdAt: pods?.createdAt
        };
        return obj;
      });

      setPodcast(podsData);
      localStorage.setItem('podcasts', JSON.stringify(podsData));
    } catch (error) {
      console.log(error);
    }
  };

  const getAllSongs = async () => {
    try {
      const songs = await apiGet('/api/music/get_song');
      const allSongs = [
        ...songs.data.songs.sort((a: MusicContent, b: MusicContent) =>
          a.title.localeCompare(b.title)
        )
      ];
      localStorage.setItem('songs', JSON.stringify(allSongs));
      setLatestSongsFromSongs(allSongs);
      console.log(allSongs);
      setSongs(allSongs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
    return () => {
      setIsLoggedIn(checkLoginStatus());
    };
  }, [user]);

  //= ==================GET PLAYLISTSONGS =====================
  const getPlaylistSongs = async () => {
    await apiGet('/api/playlist/getPlaylists').then((res) => {
      setPlaylist(res.data.playlist);
    });
  };

  //====================== get user is separated so that user can be used in the dependency array for the other get requests
  useEffect(() => {
    storedUser === null
      ? getUser().catch(console.error)
      : setUser(JSON.parse(storedUser));
  }, []);
  //Get data only works when token is available, it only sends after user logs in
  useEffect(() => {
    getAllSongs().catch(console.error);
    handlePostCast();
    getAllArtist().catch(console.error);
    getAllGenres().catch(console.error);
    PlayedMusic().catch(console.error);
    getPodcasts().catch(console.error);
    getPodcastCategories().catch(console.error);
    getPlaylistSongs().catch(console.error);
  }, [user]);

  const setLatestSongsFromSongs = (songs: any[]) => {
    const latests = [...songs]
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      .slice(0, 6);
    setLatestSongs(latests);
    console.log(latests);
  };

  /* ================================= ============================ */

  // playlist will be change to recently playesd

  /* =================================  DISPLAY RECENTLY  PLAYED MUSIC    ============================ */
  const PlayedMusic = async () => {
    try {
      const recent = await apiGet('/api/recent/get-music');
      setDisplayRecentMusic([...recent.data.recentlyPlayedSongs]);
    } catch (err) {
      console.log(err);
    }
  };
  //=======================APPEND RECENTLY PLAYED ===================================
  const appendRecent = (recent: any) => {
    setDisplayRecentMusic((prev) => {
      prev.push(recent);
      return prev;
    });
  };

  /* =================================GET ARTISTS ============================ */

  const getAllArtist = async () => {
    try {
      const artistData = await getArtist('/api/artists/get-all-artists');
      localStorage.setItem('artist', JSON.stringify(artistData.data.artists));
      setArtist(artistData.data.artists);
      console.log(artist);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  //= ================= GET GENRES ======================== */
  const getAllGenres = async () => {
    try {
      const genresData = await apiGet('/api/genre/genres');
      setGenres(genresData.data.allGenre);
    } catch (error: any) {
      console.log(error);
    }
  };

  //=================== APPEND GENRE =====================
  const appendGenre = (genre: any) => {
    setGenres((prev) => {
      prev.unshift(genre);
      return prev;
    });
  };

  //============================APPEND ARTIST =======================
  const appendArtist = (artist: ArtistAttributes) => {
    setArtist((prev) => {
      prev.unshift(artist);
      return prev;
    });
  };

  //= ==================== GET USER =========================
  const getUser = async () => {
    await apiGet('/api/user/get-user')
      .then((res) => {
        const user = res.data.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  //= ================= SET TOKEN ===========================

  const setToken = (token: string) => {
    hasRememberMe === true && localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
  };

  const modifyRemember = (yesOrNo: boolean) => {
    setHasRememberMe(yesOrNo);
  };

  //= ============================= SUBMIT LOGIN
  const loginSubmitHandler = async (userData: LoginData) => {
    try {
      setAuthLoading(true);
      await apiPostNoAuth('/api/user/signin', userData)
        .then((res) => {
          setAuthLoading(false);
          const { user, message, signature } = res.data;
          setUser(user);
          toast.success(message);
          setToken(signature);
          localStorage.setItem('user', JSON.stringify(user));
          return navigate('/user-dashboard');
        })
        .catch((err) => {
          setAuthLoading(false);
          console.log(err);
          if (err.message === 'Network Error') {
            toast('Network error', { toastId: 'login ntwrk err' });
            return;
          }
          toast.error(err.response.data.error.split('.')[0], {
            toastId: 'login err'
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  //= ========================= SUBMIT REGISTRATION =============================
  const registerSubmitHandler = async (
    userData: SignupData,
    openLoginModal: any
  ) => {
    try {
      await apiPostNoAuth('/api/user/signup', userData)
        .then((res) => {
          const { message } = res.data;
          toast.success(message);
          return openLoginModal();
        })
        .catch((err) => {
          console.log(err);
          if (err.message === 'Network Error') {
            toast('Network error', { toastId: 'login ntwrk err' });
            return;
          }
          toast.error(err.response.data.error.split('.')[0], {
            toastId: 'login err'
          });
        });
    } catch (err) {
      console.log(err);
    }
  };
  //= =============================== INITIATE RELOAD ============================
  const callReload = (whatToReload: string) => {
    switch (whatToReload) {
      case 'artists':
        getAllArtist();
        break;
      case 'genres':
        getAllGenres();
        break;
      case 'songs':
        getAllSongs();
        break;
      case 'playlists':
        getPlaylistSongs();
        break;

      default:
        break;
    }
  };

  //= ========================= ADMIN UPLOAD =============================
  const adminUploadHandler = async (formData: FormData) => {
    try {
      setUploadingData(true);
      if (user.role !== 'admin') {
        toast.error('You are not admin', { toastId: 'adminerr upld' });
        setUploadingData(false);
      } else {
        apiPost('/api/music/create-songs', formData)
          .then((res) => {
            toast(res.data.message);
            setJustUploaded(res.data.music);
            setSongs((prev) => {
              prev.unshift(res.data.music);
              setUploadingData(false);
              return prev;
            });
          })
          .catch((err) => {
            setNewError(err);
            setUploadingData(false);
          });
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  //= ========================== LOGOUT ======================
  const logout = async () => {
    setUser(initialUser);
    sessionStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const addToPlaylist = async (songId: string) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    try {
      await apiPost(`/api/playlist/addToPlaylist/${songId}`, {}).then((res) => {
        toast.success(res.data.message, { toastId: 'success' });
      });
    } catch (err: any) {
      console.log(err);
      if (err.message === 'Network Error') {
        toast.error('Network error', {
          toastId: 'add to playlist error'
        });
        return;
      }
      toast.error(err.response.data.error, {
        toastId: 'add to playlist error2'
      });
    }
  };

  //=========================GET PODCASTS========================
  const getPodcasts = async () => {
    try {
      const podcasts = await apiGet('/api/podcast/podcasts');
      const allPodcasts = [
        ...podcasts.data.podcasts.sort((a: any, b: any) =>
          a.title.localeCompare(b.title)
        )
      ];
      console.log('pods', allPodcasts);
      setPodcasts(allPodcasts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        adminUploadHandler,
        setToken,
        user,
        getUser,
        playlist,
        loginSubmitHandler,
        registerSubmitHandler,
        justUploaded,
        genres,
        displayRecentMusic,
        songs,
        logout,
        callReload,
        artist,
        isLoggedIn,
        latestSongs,
        allPodcasts,
        handlePostCast,
        addToPlaylist,
        modifyRemember,
        setUser,
        hasRememberMe,
        appendRecent,
        appendGenre,
        appendArtist,

        podCategories,
        curCatList,
        setcategorypd,
        podcasts,

        authLoading,
        uploadingData,
        setUploadingData
      }}
    >
      <>
        {newError && <AxiosErrorHandler err={newError} />}
        {children}
      </>
    </DataContext.Provider>
  );
};
