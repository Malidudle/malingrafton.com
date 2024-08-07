"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BatteryMedium, Search, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState({
    date: "Tue, Aug 6",
    time: "20:33",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "short",
        day: "numeric",
        month: "short",
      };
      const dateString = now.toLocaleDateString("en-US", dateOptions);
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const timeString = now.toLocaleTimeString("en-GB", timeOptions);
      setCurrentTime({ date: dateString, time: timeString });
    };

    // Update the time initially
    updateTime();

    // Update the time every minute to keep it consistent
    const intervalId = setInterval(updateTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="flex h-7 w-full items-center justify-between bg-black px-5 text-sm font-light text-white">
      <div className="flex items-center">
        <Image
          src="/apple-logo.svg"
          className="mr-2"
          alt="apple logo"
          width={18}
          height={18}
        />
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Help</MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset>Just click an icon</MenubarItem>
              <MenubarItem inset>U can drag them too</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Contacts</MenubarTrigger>
            <MenubarContent>
              <MenubarItem inset asChild>
                <Link href="mailto:malin@malingrafton.com">Email</Link>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem disabled inset>
                My agency <MenubarShortcut>Soon!</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Social Media</MenubarTrigger>
            <MenubarContent>
              <MenubarItem asChild inset>
                <Link target="_blank" href="https://x.com/malingraft0n">
                  Twitter
                </Link>
              </MenubarItem>
              <MenubarItem asChild inset>
                <Link
                  target="_blank"
                  href="https://www.instagram.com/malin_grafton"
                >
                  Instagram
                </Link>
              </MenubarItem>
              <MenubarItem asChild inset>
                <Link target="_blank" href="https://github.com/Malidudle">
                  GitHub
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="hidden items-center gap-4 sm:flex">
        <div className="flex items-center gap-4">
          <BatteryMedium className="h-6 w-6 stroke-[1.5px]" />
          <Search className="h-4 w-4 stroke-2" />
          <Wifi className="h-4 w-4 stroke-2" />
        </div>
        <div className="flex items-center gap-2">
          <span className="">{currentTime.date}</span>
          <span>{currentTime.time}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
