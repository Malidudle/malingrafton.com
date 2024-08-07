"use client";

import { ChevronsDownUp, ChevronsUpDown, Minus, X } from "lucide-react";
import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";
import { useWindowContext } from "@/app/window-context";
import { cn } from "@/lib/utils";

interface WindowProps {
  id: number;
  bringToFront: (id: number) => void;
  children: React.ReactNode;
}

const calculateWindowSize = (): { width: number; height: number } => {
  const { innerWidth, innerHeight } = window;

  if (innerWidth < 400) {
    return { width: innerWidth * 0.8, height: innerHeight * 0.8 };
  }
  if (innerWidth < 600) {
    return { width: innerWidth * 0.9, height: innerHeight * 0.9 };
  }
  if (innerWidth < 1100) {
    return { width: innerWidth * 0.8, height: innerHeight * 0.8 };
  }
  return { width: 950, height: 750 };
};

const Window = ({ id, bringToFront, children }: WindowProps) => {
  const isMobile = window.innerWidth < 600;

  const { openWindows, setOpenWindows } = useWindowContext();
  const [size, setSize] = useState(calculateWindowSize());
  const [position, setPosition] = useState({
    x: 40 + openWindows.length * 20,
    y: 40 + openWindows.length * 20,
  });
  const [isMaximized, setIsMaximized] = useState(isMobile);

  useEffect(() => {
    const handleResize = () => {
      if (isMaximized) {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight - 28,
        });
        setPosition({
          x: 0,
          y: 0,
        });
      } else {
        setSize(calculateWindowSize());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMaximized]);

  const handleClose = () => {
    setOpenWindows((prevWindows) => prevWindows.filter((win) => win.id !== id));
  };

  const handleMaximizeToggle = () => {
    setIsMaximized((prev) => !prev);
  };

  const bringToFrontHandler = () => bringToFront(id);

  return (
    <Rnd
      style={{
        zIndex: 100 + openWindows.findIndex((win) => win.id === id),
      }}
      size={size}
      position={isMaximized ? { x: 0, y: 0 } : position}
      onDragStop={(_, d) => setPosition({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) => {
        setSize({
          width: parseFloat(ref.style.width),
          height: parseFloat(ref.style.height),
        });
        setPosition(position);
      }}
      onDragStart={!isMaximized ? bringToFrontHandler : undefined}
      onClick={!isMaximized ? bringToFrontHandler : undefined}
      onResizeStart={!isMaximized ? bringToFrontHandler : undefined}
      minWidth={isMobile ? 0 : 600}
      minHeight={isMobile ? 0 : 400}
      bounds="window"
      disableDragging={isMaximized}
      dragHandleClassName="h-10"
    >
      <div
        className={cn(
          "animate-fadein relative h-full w-full overflow-hidden bg-black pb-8 text-white shadow-2xl",
          !isMaximized && "rounded-2xl border border-slate-600",
        )}
      >
        <div
          className={cn(
            "sticky top-0 flex h-10 w-full items-center gap-3 px-4",
            !isMaximized && "cursor-move",
          )}
        >
          <ControlButton
            onClick={handleClose}
            className="bg-red-600"
            icon={<X strokeWidth={3} className="text-gray-800/50" />}
          />
          {!isMobile && (
            <>
              <ControlButton
                onClick={handleClose}
                className="bg-yellow-400"
                icon={<Minus strokeWidth={3} className="text-gray-800/50" />}
              />
              <ControlButton
                onClick={handleMaximizeToggle}
                className="bg-green-600"
                icon={
                  isMaximized ? (
                    <ChevronsDownUp
                      strokeWidth={3}
                      className="-rotate-45 text-gray-800/50"
                    />
                  ) : (
                    <ChevronsUpDown
                      strokeWidth={3}
                      className="-rotate-45 text-gray-800/50"
                    />
                  )
                }
              />
            </>
          )}
        </div>
        <div className="h-full overflow-scroll">{children}</div>
      </div>
    </Rnd>
  );
};

interface ControlButtonProps {
  onClick: () => void;
  className: string;
  icon: React.ReactNode;
}

const ControlButton = ({ onClick, className, icon }: ControlButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "group flex h-4 w-4 cursor-pointer items-center justify-center rounded-full",
        className,
      )}
    >
      {isHovered && icon}
    </div>
  );
};

export default Window;
