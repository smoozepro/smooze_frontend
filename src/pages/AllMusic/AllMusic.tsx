import React from 'react';
import AllUserMusic from '../../Components/AllMusicUser/AllUserMusic';
import AllMusicStyle from './AllMusic.module.css';

function AllMusic() {
  return (
    <>
      <div className={AllMusicStyle.content}>
        <AllUserMusic />
      </div>
    </>
  );
}

export default AllMusic;
