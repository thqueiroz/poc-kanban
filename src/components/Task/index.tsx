import { useState } from 'react';
import styles from './styles.module.css';

interface TaskProps {
  title: string;
  colIndex: number;
  taskIndex: number;
  colId: number;
  taskId: number
}

export function Task({ title, colIndex, taskIndex, taskId , colId}: TaskProps) {
    const [style, setStyle] = useState({});
    const handleOnDrag = (
      e: React.DragEvent<HTMLDivElement>,
      taskId: number,
      colId: number
    ) => {
        const styles = {
          transform: "rotate(3deg)",
          transition: "transform 0.5s",
        };
      setStyle(styles)
      e.dataTransfer.setData(
        "text",
        JSON.stringify({ taskIndex, prevColIndex: colIndex, taskId, colId })
      );
    };

    const handleOnDragEnd = () => {
        const styles = {
          transform: "rotate(0deg)",
        };
        setStyle(styles);
    }

  return (
    <div
      id="task-drop"
      draggable
      onDragEnd={handleOnDragEnd}
      onDragStart={(e) => handleOnDrag(e, taskId, colId)}
      className={styles.wrapper}
      style={style}
    >
      <p className={styles.title}>{title}</p>
    </div>
  );
}