import Browser from "@/components/browser";
import ContactMe from "@/components/contact-me";
import Music from "@/components/music";

export const DESKTOP_FILES = [
  {
    id: 1,
    name: "Contact Me",
    x: 0,
    y: 0,
    icon: "☎️",
    component: <ContactMe />,
  },
  { id: 2, name: "Photos", x: 1, y: 0, icon: "🖼️", component: <div /> },
  { id: 3, name: "Music", x: 2, y: 0, icon: "🎵", component: <Music /> },
  {
    id: 4,
    name: "Browser",
    x: 0,
    y: 1,
    icon: "🌐",
    component: <Browser />,
  },
];
