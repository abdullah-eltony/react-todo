import React, { useEffect } from "react";
// styles
import styles from "../styles/modules/modal.module.scss";
// components
import { MdOutlineClose } from "react-icons/md";
import Button from "./Button";
import { toast } from "react-hot-toast";
// redux
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
// helpers
import { v4 as UUid } from "uuid";
import { AnimatePresence } from "framer-motion";
// framer motion
import { motion } from "framer-motion";
import { dropIn } from "../variants";

const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {
  // states
  const [title, setTitle] = React.useState("");
  const [status, setStatus] = React.useState("incomplete");

  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo?.title) {
      setTitle(todo.title);
    }
    if (todo?.status) {
      setStatus(todo.status);
    }
  }, [todo?.status, todo?.title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && status) {
      if (type !== "Update") {
        dispatch(
          addTodo({
            id: UUid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success("Todo added successfully");
        setTitle("");
        setStatus("incomplete");
        setModalOpen(false);
      } else {
        if (todo.title !== title || todo.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Todo updated successfully");
          setModalOpen(false);
        } else {
          toast.error("No changes made");
        }
      }
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              initial={{top:40, opcity:0}}
              animate={{top:-10, opacity:1}}
              exit={{top:40, opacity:0}}
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
            >
              <MdOutlineClose />
            </motion.div>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "Update" ? "Update" : "Add"} Task
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="status">
                Status
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">InComplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button variant="primary" type="submit">
                  {type === "Update" ? "Update" : "Add"} Task
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                  tabIndex={0}
                  role="button"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
