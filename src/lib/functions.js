export const getSize = () => {
  if (typeof window !== 'undefined' && window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
  return null;
};
