type ProgressCallback = (progress: number) => void;

export const preloadImages = (
  srcs: string[],
  onProgress: ProgressCallback,
): Promise<void[]> => {
  let loaded = 0;
  const total = srcs.length;

  function loadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        onProgress((loaded / total) * 100);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }
  return Promise.all(srcs.map(loadImage));
};

export const preloadAudio = (
  srcs: string[],
  onProgress: ProgressCallback,
): Promise<void[]> => {
  let loaded = 0;
  const total = srcs.length;

  function loadAudio(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.oncanplaythrough = () => {
        loaded++;
        onProgress((loaded / total) * 100);
        resolve();
      };
      audio.onerror = reject;
      audio.src = src;
    });
  }
  return Promise.all(srcs.map(loadAudio));
};
