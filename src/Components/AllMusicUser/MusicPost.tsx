import { useContext, useEffect, useState } from 'react';
// import { apiGet } from "../../utils/api";
import { toast } from 'react-toastify';
import AllMusics from './AllUserMusic';
import { AllContext } from '../../useContext/interface';
import { DataContext } from '../../useContext';
// import AllUserMusic from "./AllUserMusic.module.css";

function AllMusic() {
  const { songs } = useContext(DataContext) as AllContext;
  const [Loading, setLoading] = useState(true);
  const [currentPosts, setCurrentPosts] = useState<any>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage] = useState(1);
  const postPerPage = 6;
  // do not put async in useEffect whatsoever

  useEffect(() => {
    const signature =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!signature) {
      toast.error('You must be logged in to perform this action.');
    } else {
      const indexofLastPost = currentPage * postPerPage;
      const indexOfFirstPost = indexofLastPost - postPerPage;
      setCurrentPosts(songs.slice(indexOfFirstPost, indexofLastPost));

      setLoading(false);

      console.log(songs);
    }
  }, [songs]);
  return <div>{songs.length > 0 && <AllMusics />}</div>;
}

export default AllMusic;
