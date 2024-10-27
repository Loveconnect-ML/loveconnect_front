import { useState, useEffect } from "react";

const useFirstRegisterStatus = () => {
  const [isFirstRegister, setIsFirstRegister] = useState(true);

  useEffect(() => {
    // Uncomment the line below to fetch first register status from the server
    // fetchIsFirstRegister();
  }, []);

  const setFirstRegisterComplete = () => {
    setIsFirstRegister(false);
  };

  return { isFirstRegister, setFirstRegisterComplete };
};

export default useFirstRegisterStatus;
