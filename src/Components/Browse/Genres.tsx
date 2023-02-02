import React, { useContext, useEffect } from 'react';
import Browsercss from './styles/broswer.module.css';
import { Link } from 'react-router-dom';
import { DataContext } from '../../useContext';
import { AllContext } from '../../useContext/interface';

function Genres({ from }: { from?: string }) {
  let { genres } = useContext(DataContext) as AllContext;
  if (from === 'dashboard') {
    genres = genres.slice(0, 4);
  }

  return (
    <div className={Browsercss.gridContainer}>
      {genres.length > 0 &&
        genres.map((genre) => (
          <div key={genre.id}>
            <span className={Browsercss.browseMusicCategory}>{genre.name}</span>
            <span className={Browsercss.browseMusicCategory}>{''}</span>
            <Link to={`/browse/${genre.id}`}>
              <div
                style={{ backgroundImage: `url(${genre.genreImage})` }}
                className={Browsercss.browseImg}
              ></div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Genres;
