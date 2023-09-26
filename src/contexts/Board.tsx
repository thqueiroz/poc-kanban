"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface BoardProviderProps {
  children: ReactNode;
}

interface BoardProviderData {
  columns: Column[];
  setColums(value: Column[]): void;
  dragItem(
    colIndex: number,
    prevColIndex: number,
    taskIndex: number,
    taskId: number,
    colId: number,
  ): void;
}

export type Task = {
  title: string;
  status: string;
  id: number;
}

export type Column = {
  name: string;
  tasks: Task[];
  id: number;
};

const BoardContext = createContext({} as BoardProviderData);

function BoardProvider({ children }: BoardProviderProps) {
  const [columns, setColums] = useState<Column[]>([
    {
      name: "To do",
      id: 1,
      tasks: [
        {
          title: "Task1 - To do",
          status: "todo",
          id: 1,
        },
      ],
    },
    {
      name: "Doing",
      id: 2,
      tasks: [
        {
          title: "Task1 - Doing ",
          status: "doing",
          id: 2,
        },
      ],
    },
    {
      name: "Done",
      id: 3,
      tasks: [
        {
          title: "Task1 - Done",
          status: "done",
          id: 3,
        },
        {
          title: "Task2 - Done",
          status: "done",
          id: 3,
        },
      ],
    },
  ]);

  const dragItem = (
    colIndex: number,
    prevColIndex: number,
    taskIndex: number,
    taskId: number,
    colId: number
  ) => {
    const newCols = [...columns];
    const prevCol = newCols.find((col, i) => col.id === colId);
    const task = prevCol?.tasks.splice(taskIndex, 1)[0];

    if (task) {
      newCols.find((col, i) => i === colIndex)?.tasks.push(task);
    }
    setColums(newCols);
    
  };

  return (
    <BoardContext.Provider value={{ columns, setColums, dragItem }}>
      {children}
    </BoardContext.Provider>
  );
}

function useBoard() {
  const context = useContext(BoardContext);

  if (!context) {
    throw new Error("useBoard must be used  within an Provider");
  }

  return context;
}

export { BoardProvider, useBoard };
