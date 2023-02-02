import { createContext, ReactElement, useEffect, useState } from "react";

import { FlowInterface, MusicContent } from "./interface";
import { apiGet } from "../utils/api";
export const FlowContext = createContext<FlowInterface | null>(null);

export const FlowProvider = ({ children }: { [key: string]: ReactElement }) => {
  const [status, setStatus] = useState<boolean>(false);

  const [flowsongs, setData] = useState<MusicContent[] | []>([]);
  const [userSongModal, setuserSongModal] = useState<boolean>(false);

  const openFlowModal = () => {};
  const closeFlowModal = () => {
    setStatus(false);
  };
  const AddFlow = (clicked: any) => {
    setStatus(true);
    setuserSongModal(false);
  };

  useEffect(() => {
    try {
      apiGet("/api/playlist/flow")
        .then((res) => {
          setData(res.data.songs);
          console.log("flow songs", flowsongs);
        })
        .catch(console.error);
    } catch (err: any) {
      console.log("error in fteching user flow");
    }
  }, [userSongModal]);

  return (
    <FlowContext.Provider
      value={{
        setStatus,
        status,
        openFlowModal,
        closeFlowModal,
        AddFlow,
        userSongModal,
        setuserSongModal,
        flowsongs,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};
