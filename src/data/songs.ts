export interface Song {
  title: string;
  artist: string;
  src: string;
  cover: string;
}

export const SONGS: Song[] = [
  {
    title: "Long Time - Intro",
    artist: "Playboi Carti",
    src: "/music/long-time.mp3",
    cover: "/music/carti.jpg",
  },
  {
    title: "I Love Kanye",
    artist: "Kanye West",
    src: "/music/i-love-kanye.mp3",
    cover: "/music/life-of-pablo.jpg",
  },
  {
    title: "P.Y.T (Pretty Young Thing)",
    artist: "Michael Jackson",
    src: "/music/pyt.mp3",
    cover: "/music/thriller.png",
  },
  {
    title: "Violent Crimes",
    artist: "Kanye West",
    src: "/music/violent-crimes.mp3",
    cover: "/music/ye.jpg",
  },
  {
    title: "nyc in 1940",
    artist: "Berlioz",
    src: "/music/nyc-in-1940.mp3",
    cover: "/music/berlioz.jpg",
  },
];
