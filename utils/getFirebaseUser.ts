import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

interface props {
  name: any;
  userInfo: any;
}

const useFetchUser = (userInfo: props) => {
  const [fetchedName, setFetchedName] = useState<string>("");

  useEffect(() => {
    // useeffect to get users name from database(firebase)
    // if user already exists
    const user = auth.currentUser;
    if (user) {
      let backendName = userInfo.name;
      setFetchedName(backendName);
    }
  }, []);

  return fetchedName;
};

export default useFetchUser;
