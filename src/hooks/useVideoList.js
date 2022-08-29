import { useEffect, useState } from "react";
import { getDatabase, ref, query, orderByKey, get } from "firebase/database";

export default function useVideoList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setvideos] = useState([]);
  useEffect(() => {
    async function fetchVideos() {
      //database related works
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(videosRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database
        const snapshort = await get(videoQuery);
        setLoading(false);
        if (snapshort.exists()) {
          setvideos((prevVideos) => {
            return [...prevVideos, ...Object.values(snapshort.val())];
          });
        } else {
          //
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchVideos();
  }, []);

  return {
    loading,
    error,
    videos,
  };
}
