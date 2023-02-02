import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../useContext';
import { AllContext } from '../useContext/interface';
import { apiPost } from '../utils/api';
/**
 *
 * @param id Id of song clicked on */
export const useRecentlyPlayed = () => {
  // const {appendRecent} = useContext(DataContext) as AllContext
  const addToRecentlyPlayed = async (id: string) => {
    try {
      return await apiPost(`/api/recent/create-music/${id}`, {})
        .then((res) => res.data.recentlyPlayed)
        .catch(console.error);
    } catch (error) {
      console.log(error);
    }
  };
  return { addToRecentlyPlayed };
};
