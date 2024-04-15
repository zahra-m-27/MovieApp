import { createContext, ReactNode, useCallback, useState } from "react";
import { API_KEY, TMDB_API_BASE_URL } from "../utils/config";

interface Props {
  children: ReactNode;
}

//Create context for global state and functions
export const GlobalContext = createContext({
  videoId: "",
  setVideoId: (prevValue: string) => {},
  getTrailerId: (id: number | string) => {},
  closeModal: () => {},
  isModalOpen: false,
  showSidebar: false,
  setShowSidebar: (prevValue: boolean) => {},
  setIsModalOpen: (value: boolean) => {},
});

//A wrapper component that provides the global context values to its child components
const GlobalContextProvider = ({ children }: Props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = useCallback(() => {
    if (!isModalOpen) return;
    setIsModalOpen(false);
    setVideoId("");
  }, [isModalOpen]);

  const getTrailerId = async (id: number | string) => {
    try {
      const res = await fetch(
        `${TMDB_API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setVideoId(data.results[0].key);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        getTrailerId,
        videoId,
        closeModal,
        isModalOpen,
        setVideoId,
        showSidebar,
        setShowSidebar,
        setIsModalOpen,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
