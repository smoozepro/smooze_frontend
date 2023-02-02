import React, { useContext, useEffect, useState } from 'react';
import Browsercss from './styles/broswer.module.css';
import moodImg from '../../assets/browse/PARTY.png';
import { Link } from 'react-router-dom';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext';
import { WindowSharp } from '@mui/icons-material';

function Podcast({ from }: { from?: string }) {
  let { podCategories, setcategorypd } = useContext(
    DataContext
  ) as AllContext;

  if (window.location.pathname === "/user-dashboard") {
    podCategories = podCategories.slice(0,4)
  }
  
  return (
    <>
      <div>
        <div className={Browsercss.gridContainer}>
          {podCategories &&
            podCategories.map((category: any) => (
              <div key={category.id}>
                <span className={Browsercss.browseMusicCategory}>{''}</span>
                <Link to={`/pCCategory/${category.name}`}>
                  <img
                    onClick={() => {
                      setcategorypd(category.name);
                    }}
                    className={Browsercss.browseImg}
                    src={category.categoryImage}
                    alt="smoozeMood image"
                  />
                  {category.name}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
export default Podcast;
