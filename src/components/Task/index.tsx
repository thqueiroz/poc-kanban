import styles from './styles.module.css';

interface TaskProps {
  title: string;
  colIndex: number;
  taskIndex: number;
  colId: number;
  taskId: number
}

export function Task({ title, colIndex, taskIndex, taskId , colId}: TaskProps) {

    const handleOnDrag = (
      e: React.DragEvent<HTMLDivElement>,
      taskId: number,
      colId: number
    ) => {
      e.dataTransfer.setData(
        "text",
        JSON.stringify({ taskIndex, prevColIndex: colIndex, taskId, colId })
      );
    };

  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, taskId, colId)}
      className={styles.wrapper}
    >
      <p className={styles.title}>{title}</p>
    </div>
  );
}