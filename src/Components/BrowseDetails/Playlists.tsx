/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext, useEffect, useState } from "react";
// import { apiGet } from "../../utils/api";
import { toast } from "react-toastify";
import Post from "./post";
import { AllContext } from "../../useContext/interface";
import { DataContext } from "../../useContext";
function Popular() {
    const { playlist } = useContext(DataContext) as AllContext;
    const [Loading, setLoading] = useState(false);
    const [currentPosts, setCurrentPosts] = useState<any>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPage] = useState(1);
    const postPerPage = 6;
    // do not put async in useEffect whatsoever
    useEffect(() => {
        const signature = localStorage.getItem("token") || sessionStorage.getItem("token");
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!signature) {
            toast.error("You must be logged in to perform this action.");
        } else {
            // apiGet("/api/playlist/getPlaylists")
            //  .then((res) => {
            //      setPlaylist(res.data.playlist);
            //  })
            const indexofLastPost = currentPage * postPerPage;
            const indexOfFirstPost = indexofLastPost - postPerPage;
            setCurrentPosts(playlist.slice(indexOfFirstPost, indexofLastPost));
            // const pageNumbers = Math.ceil(playlist.length / postPerPage);
            //  .catch(console.error);
            setLoading(false);
            console.log(playlist);
        }
    }, [playlist]);
    // console.log(picture);
    return (
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        <div>
            {playlist.length > 0 && (
                <Post playlist={currentPosts} loading={Loading} />
            )}
        </div>
    );
}
export default Popular;
// const addToPlaylist = async (songId: string) => {
//  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//  try {
//      await apiPost(`/api/playlist/addToPlaylist/${songId}`, {}).then((res) => {
//          toast.success(res.data.message, { toastId: "success" });
//      });
//  } catch (err: any) {
//      console.log(err);
//      if (err.message === "Network Error") {
//          return toast.error("Network error", {
//              toastId: "add to playlist error",
//          });
//      }
//      toast.error(err.response.data.error, {
//          toastId: "add to playlist error2",
//      });
//  }
// };
// onClick={async () => await addToPlaylist(elem.id)}