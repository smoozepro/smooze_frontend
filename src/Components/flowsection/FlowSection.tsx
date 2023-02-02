import React, { useContext, useEffect, useState } from 'react';
import FlowCard from './FlowCard';
import styles from './FlowSection.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Pause from '@mui/icons-material/Pause'
import AddIcon from '@mui/icons-material/Add';

import img1 from '../../assets/flowsection/albumimg.webp';
import { FlowContext } from '../../useContext/flowContext';
import { AllPlayerContext, FlowInterface } from '../../useContext/interface';
import Modal from 'react-modal';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import PlayStyle from '../../pages/Playlist/Playlist.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PlayerContext } from '../../useContext/PlayerBarContext';
import { Tooltip } from '@mui/material';

// mockdata
const mockData = [
  {
    bottomtext: 'Based on your listening history',
    para: 'Your personal Soundtrack',
    img: img1,
    children: <PlayArrowIcon />
  },
  {
    bottomtext:
      'Select multiple genres and moods to create the perfect soundtrack',
    para: 'Create your own perfect soundtrack',
    img: '../../assets/flowsection/Flowcover2.png',
    children: <AddIcon />
  },
  {
    bottomtext: 'Select multiple artists to create the perfect sountrack',
    para: 'Create your own concert with your favorite singers',
    img: '../../assets/flowsection/Flowcover3.png',
    children: <AddIcon />
  }
];

interface FlowData {
  bottomtext: string;
  para: string;
  img: string;
  children: JSX.Element;
}

const FlowSection = () => {
  const { handleSongPlay, modifyCurrentlyPlaying, togglePlay, currentlyPlayingSongs, songObj } = useContext(
    PlayerContext
  ) as AllPlayerContext;

	const [flowIsPlaying, setFlowIsPlaying] = useState(false);

  const { AddFlow, userSongModal, setuserSongModal, flowsongs } = useContext(
    FlowContext
  ) as FlowInterface;

  // useEffect(()=>{
  //   if(curren)
  // },[currentlyPlayingSongs])

  const playAll = () => {
		if (flowsongs.length < 1) return;
		if (JSON.stringify(currentlyPlayingSongs) === JSON.stringify(flowsongs)) {
			setFlowIsPlaying(!flowIsPlaying);
			togglePlay();
      return;
    }
    modifyCurrentlyPlaying(flowsongs, 0);
    togglePlay(true);
		setFlowIsPlaying(!flowIsPlaying);

  };

  const mockData: any[] = [
    {
      bottomtext: 'Based on your listening history',
      para: 'Your personal Soundtrack',
      img: img1,
      description: 'Soundtrack',
      children: <Tooltip title={flowsongs.length<1 ? "You don't have any flow songs":""} >{flowIsPlaying===false ? <PlayArrowIcon onClick={() => playAll()} /> : <Pause onClick={() => playAll()} /> }</Tooltip>
    },
    {
      bottomtext:
        'Select multiple genres and moods to create the perfect soundtrack',
      para: 'Create your own perfect soundtrack',
      img: '/src/assets/flowsection/Flowcover2.png',
      description: 'Create Soundtrack',
      children: <AddIcon onClick={() => AddFlow('new')} />
    },
    {
      bottomtext: 'Select multiple artists to create the perfect sountrack',
      para: 'View all your custom songs',
       img: '/src/assets/flowsection/Flowcover3.png',
      description:
        flowsongs.length > 0
          ? `${flowsongs.length} Custom Songs`
          : 'No Custom Songs',
      children: <VisibilityIcon onClick={() => setuserSongModal(true)} />
    }
  ];

  const close = () => {
    console.log('close');
  };
  return (
    <div className={styles.parent}>
      <h1 className={styles.title}>Flow</h1>
      <div className={styles.main}>
        {mockData?.map((item, index) => (
          <FlowCard
            key={index}
            bottomtext={item.bottomtext}
            para={item.para}
            img={item.img}
            title={item.description}
          >
            {item.children}
          </FlowCard>
        ))}
        {/* {data?.map((item, index) => (
          <FlowCard
            key={index}
            bottomtext={item.bottomtext}
            para={item.para}
            img={item.img}
          >
            {item.children}
          </FlowCard>
        ))} */}
      </div>
      {userSongModal && (
        <Modal
          onRequestClose={() => close()}
          isOpen={true}
          style={{
            overlay: {
              backgroundColor: 'rgba(1,1,2,0.9)',
              backdropFilter: 'blur(50px)',
              position: 'absolute',
              left: '65%',
              border: 'none',
              width: '450px',
              height: '300px',
              top: '10%'
            },
            content: {
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              color: 'black',
              position: 'relative',
              border: 'none'
            }
          }}
        >
          <CSSTransition
            in={true}
            timeout={1000}
            classNames={styles.flowModal}
            unmountOnExit
          >
            <div className={styles.flowModalContainer}>
              <div className={styles.FlowModalContent}>
                <div style={{ width: ' 100%', overflowY: 'auto' }}>
                  <table className={PlayStyle.table}>
                    <thead className={styles.tableHead}>
                      <span className={styles.THeadtext}>Your Current </span>
                      <span className={styles.trackText}>Soundtrack</span>
                      <span className={styles.FlowCloseIcon}>
                        <AiFillCloseCircle
                          onClick={() => setuserSongModal(false)}
                        />
                      </span>
                    </thead>

                    {flowsongs.map((elem: any, index: number) => (
                      <tr className={styles.tbrow}>
                        <td className={styles.tdata}>
                          <span className={styles.index}>{index + 1}</span>
                        </td>
                        <td
                          className={styles.tdata}
                          onClick={() => handleSongPlay(flowsongs, elem.id)}
                        >
                          <span className={styles.title}>{elem.title}</span>
                        </td>
                        <td className={styles.tdata}>
                          <span className={styles.img}>
                            <img
                              src={elem.imageUrl}
                              alt=""
                              width="25px"
                              height="25px"
                              srcSet=""
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </CSSTransition>
        </Modal>
      )}
    </div>
  );
};

export default FlowSection;
