"use client";

import { useState, useRef, DragEvent, useEffect } from "react";
import Image from "next/image";
import { WindowProvider, useWindowContext } from "@/app/window-context";
import Window from "@/components/window";
import { DESKTOP_FILES } from "@/data/DesktopFiles";
import { useToast } from "@/components/ui/use-toast";

interface FileItem {
  id: number;
  name: string;
  x: number;
  y: number;
  icon: string | React.ReactNode;
  component: React.ReactNode;
}

const HomeContent = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileItem[]>(DESKTOP_FILES);

  const { openWindows, setOpenWindows, bringToFront } = useWindowContext();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const GRID_SIZE = 120;
  const GRID_COLS = Math.floor(window.innerWidth / GRID_SIZE);
  const GRID_ROWS = Math.floor(window.innerHeight / GRID_SIZE);

  useEffect(() => {
    toast({
      title: "Welcome to my website!",
      description:
        "I'm Malin Grafton. This is my personal website. Click on the icons to see what I'm up to.",
    });
  }, []);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const isPositionOccupied = (
    x: number,
    y: number,
    excludeId: number,
  ): boolean => {
    return files.some(
      (file) => file.x === x && file.y === y && file.id !== excludeId,
    );
  };

  const findNearestEmptyPosition = (
    startX: number,
    startY: number,
    excludeId: number,
  ): [number, number] => {
    let radius = 0;
    while (radius < Math.max(GRID_COLS, GRID_ROWS)) {
      for (let dx = -radius; dx <= radius; dx++) {
        for (let dy = -radius; dy <= radius; dy++) {
          if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
            const newX = startX + dx;
            const newY = startY + dy;
            if (
              newX >= 0 &&
              newX < GRID_COLS &&
              newY >= 0 &&
              newY < GRID_ROWS
            ) {
              if (!isPositionOccupied(newX, newY, excludeId)) {
                return [newX, newY];
              }
            }
          }
        }
      }
      radius++;
    }
    return [startX, startY];
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedItem === null || !desktopRef.current) return;

    const desktopRect = desktopRef.current.getBoundingClientRect();
    const rawX = e.clientX - desktopRect.left;
    const rawY = e.clientY - desktopRect.top;

    let x = Math.floor(rawX / GRID_SIZE);
    let y = Math.floor(rawY / GRID_SIZE);

    [x, y] = findNearestEmptyPosition(x, y, draggedItem);

    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === draggedItem ? { ...file, x, y } : file,
      ),
    );

    setDraggedItem(null);
  };

  const handleFileClick = (id: number) => {
    const zIndex = openWindows.length
      ? Math.max(...openWindows.map((win: { zIndex: any }) => win.zIndex)) + 1
      : 1000;
    setOpenWindows([...openWindows, { id, zIndex }]);
    bringToFront(id);
  };

  return (
    <main className="relative h-page w-full">
      <div
        ref={desktopRef}
        className="relative h-full w-full overflow-hidden"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Image
          draggable={false}
          src="/background.jpg"
          alt="background"
          className="absolute inset-0 object-cover object-center"
          loading="eager"
          priority
          fill
        />
        {files.map((file) => (
          <div
            key={file.id}
            className="absolute z-10 flex cursor-pointer select-none flex-col items-center justify-center"
            style={{
              left: `${file.x * GRID_SIZE}px`,
              top: `${file.y * GRID_SIZE}px`,
              width: `${GRID_SIZE - 20}px`,
              height: `${GRID_SIZE - 20}px`,
            }}
            draggable
            onDragStart={(e) => handleDragStart(e, file.id)}
            onClick={() => handleFileClick(file.id)}
          >
            <div className="mb-1 text-5xl">{file.icon}</div>
            <div className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs text-white [text-shadow:0_0_3px_rgba(0,0,0,0.8)]">
              {file.name}
            </div>
          </div>
        ))}
        {openWindows.map(({ id }: { id: number }) => {
          const file = files.find((file) => file.id === id);
          return file ? (
            <Window key={id} id={id} bringToFront={bringToFront}>
              {file.component}
            </Window>
          ) : null;
        })}
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <WindowProvider>
      <HomeContent />
    </WindowProvider>
  );
}
