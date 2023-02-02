import React, { useContext } from 'react';
import styles from './FlowSection.module.css';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext';
import { Link } from 'react-router-dom';

const FlowCard = (props: {
  para: string;
  img: string;
  bottomtext: string;
  children: JSX.Element;
  title: string;
}) => {
  const { user } = useContext(DataContext) as AllContext;
  return (
    <div className={styles.gridItem}>
      <div className={styles.lgimgdiv}>
        <img src={props.img} className={styles.lgimg} />
      </div>
      <div className={styles.bggradient}></div>

      <div className={styles.imgcontainer}>
        <img src={props.img} className={styles.smallimg} alt="album-img" />
        {user?.is_premium || user?.role == 'admin' ? (
          <span className={styles.hangingicon}>{props.children}</span>
        ) : (
          <Link to={'/payment'}>
            {' '}
            <div className={styles.goPremuim}>Go Premium</div>
          </Link>
        )}
      </div>
      <div className={styles.flowcardright}>
        <h3>{props.title}</h3>
        <p>{props.para}</p>
      </div>
      <p className={styles.btmalign}>{props.bottomtext}</p>
    </div>
  );
};

export default FlowCard;
