export const truncateAfterFourWords = (text) => {
  const words = text.split(" ");
  if (words.length > 4) {
    return words.slice(0, 6).join(" ") + "...";
  }
  return text;
};
