export interface UserContent {
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  country?: string;
  profileImage?: string;
  role: string;
  is_premium: boolean;
  date_birth: string;
  day?: string;
  month?: string;
  year?: string;
}

export interface MusicContent {
  id: string;
  title: string;
  artistId: string;
  artist: string;
  genreId: string;
  imageUrl: string;
  songUrl: string;
  song_duration: string;
}

export interface SignupData {
  email: '';
  password: '';
  userName: '';
  date_birth: '';
}
export interface LoginData {
  email: string;
  password: string;
}

export interface AllGenres {
  id: string;
  name: string;
  genreImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllPodcast {
  podcastUrl: string;
  id: string;
  imageUrl: string;
  songUrl: string;
  title: string;
  name: string;
  category: string;
}
export interface podcategory {
  id: string;
  name: string;
  categoryimage: string;
}
export interface podcastItem {
  id: string;
  imageUrl: string;
  episodeUrl: string;
  title: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistAttributes {
  id: string;
  name: string;
  imageUrl: string;
  instagramUrl: string;
  twitterUrl: string;
}

export interface RecentMusic {
  id: string;
  imageUrl: string;
  songUrl: string;
  title: string;
  artist: string;
  genreId: string;
  song_duration: string;
}
export interface AllContext {
  playlist: MusicContent[];
  handlePostCast: () => void;
  setToken: (token: string) => void;
  getUser: () => Promise<void>;
  artist: ArtistAttributes[];
  user: UserContent;
  loginSubmitHandler: (userData: LoginData) => Promise<void>;
  authLoading: boolean;
  displayRecentMusic: RecentMusic[];
  registerSubmitHandler: (
    userData: SignupData,
    openLoginModal: any
  ) => Promise<void>;
  songs: MusicContent[];
  genres: AllGenres[];
  adminUploadHandler: (formData: FormData) => Promise<void>;
  justUploaded: MusicContent | null;
  logout: () => void;
  callReload: (whatToReload: string) => void;
  isLoggedIn: boolean;

  latestSongs: MusicContent[];
  addToPlaylist: (songId: string) => Promise<void>;
  modifyRemember: (yesOrNo: boolean) => void;
  setUser: (userData: UserContent) => void;
  hasRememberMe: boolean;
  appendRecent: (id: string) => void;
  allPodcasts: AllPodcast[];
  appendGenre: (genre: any) => void;
  appendArtist: (artist: ArtistAttributes) => void;
  podCategories: podcategory[];
  curCatList: MusicContent[];
  setcategorypd: (category: string) => void;
  podcasts: podcastItem[];
  uploadingData: boolean;
  setUploadingData: (status: boolean) => void;
}

export interface FlowInterface {
  AddFlow: (props: any) => void;
  openFlowModal: (props: any) => void;
  closeFlowModal: () => void;
  setStatus: (props: any) => void;
  status: boolean;
  userSongModal: boolean;
  setuserSongModal: (props: any) => void;
  flowsongs: MusicContent[];
}

export interface AllPlayerContext {
  modifyPodcastCurrentlyPlaying: (playlist: any[], index?: number) => void;
  togglePlay: (newSong?: boolean) => void;
  audioPlayer: any;
  isPlaying: boolean;
  modifyCurrentlyPlaying: (playlist: MusicContent[], index?: number) => void;
  currentlyPlayingSongs: MusicContent[];
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  currentSong: MusicContent;
  index: number;
  isRepeatOne: boolean;
  toggleIsRepeatOne: () => void;
  toggleBackward: () => void;
  toggleForward: () => void;
  toggleSkipBackward: () => void;
  toggleSkipForward: () => void;
  replaySong: () => void;
  hasShuffle: boolean;
  toggleShuffle: () => void;
  toggleFavorites: (songId: string) => Promise<void>;
  isFavorited: boolean;
  songObj: MusicContent;
  handleSongPlay: (songs: any, id: string) => void;
}
