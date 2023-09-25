"use client";
import { Task as TaskType, useBoard } from "@/contexts/Board";
import { Task } from "../Task";
import styles from "./styles.module.css";

interface ColumnProps {
  title: string;
  tasks: TaskType[];
  colIndex: number;
  colId: number;
}

export function Column({ title, tasks, colIndex, colId }: ColumnProps) {
  const { dragItem } = useBoard();

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const { prevColIndex, taskIndex, colId } = JSON.parse(
      e.dataTransfer.getData("text")
    );

    // console.log(colIndex, prevColIndex);

    if (colIndex !== prevColIndex) {
        dragItem(colIndex, prevColIndex, taskIndex)
    }
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.wrapper}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <p className={styles.title}>{title}</p>
      {tasks.map((item, index) => {
        return (
          <Task
            key={index}
            title={item.title}
            colIndex={index}
            taskIndex={index}
            colId={colId}
            taskId={item.id}
          />
        );
      })}
    </div>
  );
}
