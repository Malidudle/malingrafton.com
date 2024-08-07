import AboutMe from "@/components/about-me";
import Browser from "@/components/browser";
import Clients from "@/components/clients";
import ContactMe from "@/components/contact-me";
import Music from "@/components/music";
import Paint from "@/components/paint";

export const DESKTOP_FILES = [
  {
    id: 1,
    name: "Contact Me",
    x: 0,
    y: 0,
    icon: "☎️",
    component: <ContactMe />,
  },
  { id: 2, name: "Clients", x: 1, y: 0, icon: "👨‍💻", component: <Clients /> },
  { id: 3, name: "Music", x: 2, y: 0, icon: "🎵", component: <Music /> },
  {
    id: 4,
    name: "Browser",
    x: 0,
    y: 1,
    icon: "🌐",
    component: <Browser />,
  },
  { id: 5, name: "About Me", x: 1, y: 1, icon: "👤", component: <AboutMe /> },
  { id: 6, name: "Paint", x: 2, y: 1, icon: "🖌️", component: <Paint /> },
];
