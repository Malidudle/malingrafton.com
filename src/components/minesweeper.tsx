"use client";

import React, { useState, useEffect } from "react";

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

const Minesweeper = () => {
  const [gridSize, setGridSize] = useState(10);
  const [mineCount, setMineCount] = useState(15);
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [firstClick, setFirstClick] = useState(true);

  useEffect(() => {
    initializeGrid();
  }, [gridSize, mineCount]);

  const initializeGrid = () => {
    const newGrid: CellState[][] = Array(gridSize)
      .fill(null)
      .map(() =>
        Array(gridSize)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          })),
      );
    setGrid(newGrid);
    setGameStatus("playing");
    setFirstClick(true);
  };

  const placeMinesAndCalculateNeighbors = (
    firstClickRow: number,
    firstClickCol: number,
  ) => {
    const newGrid = [...grid];
    let minesToPlace = mineCount;

    while (minesToPlace > 0) {
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);
      if (
        !newGrid[row][col].isMine &&
        (Math.abs(row - firstClickRow) > 1 || Math.abs(col - firstClickCol) > 1)
      ) {
        newGrid[row][col].isMine = true;
        minesToPlace--;
      }
    }

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!newGrid[row][col].isMine) {
          newGrid[row][col].neighborMines = countNeighborMines(
            newGrid,
            row,
            col,
          );
        }
      }
    }

    setGrid(newGrid);
  };

  const countNeighborMines = (
    grid: CellState[][],
    row: number,
    col: number,
  ): number => {
    let count = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue;
        const newRow = row + r;
        const newCol = col + c;
        if (
          newRow >= 0 &&
          newRow < gridSize &&
          newCol >= 0 &&
          newCol < gridSize
        ) {
          if (grid[newRow][newCol].isMine) count++;
        }
      }
    }
    return count;
  };

  const handleCellClick = (row: number, col: number) => {
    if (
      gameStatus !== "playing" ||
      grid[row][col].isRevealed ||
      grid[row][col].isFlagged
    )
      return;

    if (firstClick) {
      placeMinesAndCalculateNeighbors(row, col);
      setFirstClick(false);
    }

    const newGrid = [...grid];
    if (newGrid[row][col].isMine) {
      revealAllMines(newGrid);
      setGameStatus("lost");
    } else {
      floodFillReveal(newGrid, row, col);
      if (checkWinCondition(newGrid)) {
        setGameStatus("won");
      }
    }
    setGrid(newGrid);
  };

  const handleCellRightClick = (
    e: React.MouseEvent,
    row: number,
    col: number,
  ) => {
    e.preventDefault();
    if (gameStatus !== "playing" || grid[row][col].isRevealed) return;

    const newGrid = [...grid];
    newGrid[row][col].isFlagged = !newGrid[row][col].isFlagged;
    setGrid(newGrid);
  };

  const floodFillReveal = (grid: CellState[][], row: number, col: number) => {
    if (
      row < 0 ||
      row >= gridSize ||
      col < 0 ||
      col >= gridSize ||
      grid[row][col].isRevealed ||
      grid[row][col].isFlagged
    )
      return;

    grid[row][col].isRevealed = true;

    if (grid[row][col].neighborMines === 0) {
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          floodFillReveal(grid, row + r, col + c);
        }
      }
    }
  };

  const revealAllMines = (grid: CellState[][]) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col].isMine) {
          grid[row][col].isRevealed = true;
        }
      }
    }
  };

  const checkWinCondition = (grid: CellState[][]): boolean => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!grid[row][col].isMine && !grid[row][col].isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <button
          onClick={initializeGrid}
          className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          New Game
        </button>
        <span className="ml-2 text-xl font-bold">
          {gameStatus === "playing"
            ? "Playing"
            : gameStatus === "won"
              ? "You Won!"
              : "Game Over!"}
        </span>
      </div>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center border font-bold text-black ${
                cell.isRevealed
                  ? cell.isMine
                    ? "bg-red-500"
                    : "bg-white"
                  : "bg-gray-300 hover:bg-gray-200"
              }`}
            >
              {cell.isRevealed &&
                !cell.isMine &&
                cell.neighborMines > 0 &&
                cell.neighborMines}
              {cell.isFlagged && !cell.isRevealed && "🚩"}
              {cell.isRevealed && cell.isMine && "💣"}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Minesweeper;
