export const createThumbnailUrl = (url: string) => {
  const regex = /(?<=\/watch\?v=)(.*)/;
  const match = url.match(regex);
  return match ? `http://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
};
