import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import {container , child} from '../variants'

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedList = [...todoList];
  sortedList.sort((a, b) => new Date(b.time) - new Date(a.time));

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {sortedList && sortedList.length > 0 ? (
          sortedList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p
            className={styles.emptyText}
            variants={child}
            initial="hidden"
            animate="visible"
          >
            No Todo Found
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
