"use client";
import { Column } from "@/components/Column";
import styles from "./page.module.css";
import { useBoard } from "@/contexts/Board";
import { useEffect } from "react";

export default function Home() {
  const { columns } = useBoard();

  useEffect(() => {
    console.log('MUDOU ', columns);
  }, [columns]);

  return (
    <main className={styles.main}>
      {columns.map((item, index) => {
        return (
          <Column
            key={index}
            title={item.name}
            tasks={item.tasks}
            colIndex={index}
            colId={item.id}
          />
        );
      })}
    </main>
  );
}
