import style from './Music.module.css';
function MusicCard(data: any) {
  const { imageUrl, Artist, id, title } = data?.info;
  console.log(imageUrl, Artist, id, title);
  return (
    <div className={style.musicContainer}>
      <div className={style.music}>
        <div className={style.musicImg}>
          <img src={imageUrl} alt="deepFocus" />
        </div>
        <div className={style.musicInfo}>
          <h4 className={style.musicInfoHeader}>{title}</h4>
          <span className={style.iconAndDesc}>
            <span>{Artist}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
