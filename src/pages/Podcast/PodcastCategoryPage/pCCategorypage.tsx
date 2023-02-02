import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AllContext,
  AllPlayerContext,
  MusicContent,
  podcastItem
} from '../../../useContext/interface';
import { PlayerContext } from '../../../useContext/PlayerBarContext';
import PDC from '../../../Components/PODCAST/pDCCard.module.css';
import { DataContext } from '../../../useContext';
import MusicCard from '../../../Components/musicCard/MusicCard';
import { apiGet } from '../../../utils/api';

const podcastCatpage = (prop: any) => {
  const { category } = useParams();
  const { curCatList } = useContext(DataContext) as AllContext;
  const [data, setData] = useState(curCatList);
  // useEffect(() => {
  //   setData(curCatList);
  // }, [curCatList]);
  const { togglePlay, modifyPodcastCurrentlyPlaying } = useContext(
    PlayerContext
  ) as AllPlayerContext;

  const normalisePD = (list: podcastItem[]) => {
    return list.map((item: any, index: number) => {
      item.songUrl = item.episodeUrl;
      item.artist = item.name;
      item.artistId = '';
      item.genreId = '';
      return item;
    }) as unknown as MusicContent[];
  };
  useEffect(() => {
    const pdGet = async () => {
      try {
        const res = await apiGet(`/api/podcast/category/${category}`);
        const data = res.data.categories?.[0]?.podcast;
        const pdCategoryList = normalisePD(data);

        setData(pdCategoryList);
      } catch (error) {
        console.error;
      }
    };
    pdGet();
  }, [category]);

  return (
    <React.Fragment>
      <div className={PDC.mainContainer}>
        <div className={PDC.head}>
          <h3>{category} Podcasts</h3>
        </div>
        <div className={PDC.pdContainer}>
          {data &&
            data?.map((pod: any, index: number) => (
              <span
                onClick={() => [
                  modifyPodcastCurrentlyPlaying(data, index),
                  togglePlay(true)
                ]}
              >
                <MusicCard
                  key={pod.id}
                  info={{
                    id: pod.id,
                    title: pod.title,
                    imageUrl: pod.imageUrl,
                    Artist: pod.name
                  }}
                />
              </span>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default podcastCatpage;
