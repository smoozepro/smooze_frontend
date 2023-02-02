import React, { useState, useEffect, useRef, useContext } from "react";
import searchboxCss from "./Searchbar.module.css";
import Search from "../../assets/Search.svg";
import {
  AllContext,
  AllGenres,
  AllPodcast,
  ArtistAttributes,
  MusicContent,
} from "../../useContext/interface";
import { DataContext } from "../../useContext";
import { Link } from "react-router-dom";
const SearchBox = () => {
  const [showOut, setShowOut] = useState(true);
  const [SearchRef, setSeachInput] = useState("");
  const { songs, artist, genres } = useContext(DataContext) as AllContext;
  const [findArtist, setFindArtist] = useState<ArtistAttributes | []>([]);
  const [song, setFindSong] = useState<MusicContent[]>([]);
  const [genre, setFindGenre] = useState<any | []>([]);

  const handlechange = (e: any) => {
    setSeachInput(() => e.target.value);
  };
  const find = (array: any, filterBy: string, type: string) => {
    if (array.length > 0) {
      const search: any = array?.filter(
        (data: ArtistAttributes | AllContext | AllGenres | any) => {
          return data[type.toString()]
            .toLowerCase()
            .includes(filterBy?.trim().toLowerCase());
        }
      );

      return search;
    } else {
      return null;
    }
  };

  useEffect(() => {
    setFindSong(() => find(songs, SearchRef, "title")),
      setFindGenre(() => find(genres, SearchRef, "name")),
      setFindArtist(() => find(artist, SearchRef, "name"));
    console.log(song, findArtist, genre);
  }, [SearchRef]);
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "200px",
        }}
      >
        <span className={searchboxCss.searchbox}>
          <img className={searchboxCss.img} src={Search} alt='Search icon' />
          <input
            type='text'
            // placeholder='Search'
            value={SearchRef}
            onChange={(e) => handlechange(e)}
            // onKeyUp={(e) => handlechange(e)}
          />
        </span>
        {showOut && SearchRef && (
          <span className={searchboxCss.outPutContainer}>
            {song?.map((songData: any) => (
              <>
                <span key={songData.id} className={searchboxCss.output}>
                  <span className={searchboxCss.title}>{songData.title}</span>
                  <Link
                    className={searchboxCss.artist}
                    to={`/artist/${songData.artistId}`}
                  >
                    {songData.artist}
                  </Link>
                </span>
              </>
            ))}
          </span>
        )}
      </div>
    </>
  );
};

export default SearchBox;
