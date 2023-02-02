import React from "react";
import Popular from "../BrowseDetails/Artists";
import libraryStyle from "./library.module.css";

const Library = () => {
  return (
    <>
    <div className={libraryStyle.container}>
      <div className={libraryStyle.text}> All-Artist Music Library</div>
      <div className={libraryStyle.pictures}>
        <Popular />
      </div>
    </div>
    </
    >
  );
};

export default Library;
