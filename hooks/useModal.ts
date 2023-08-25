import { useState } from 'react';
// show/hide modal
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
    console.log('toggle', isShowing);
  }

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
