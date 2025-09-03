import React, { useEffect } from "react";
// helpers
import { getClasses } from "../utils/getClasses";
// styles
import styles from "../styles/modules/todoItem.module.scss";
// react icons
import { MdDelete, MdEdit } from "react-icons/md";
// dispatch
import { useDispatch } from "react-redux";
// redux
import { deleteTodo, updateTodo } from "../slices/todoSlice";
// components
import { toast } from "react-hot-toast";
import TodoModal from "./TodoModal";
import CheckButton from "./CheckButton";
// framer motion
import {motion} from 'framer-motion'
import {child} from '../variants'

const TodoItem = ({ todo }) => {
 // states
 const [updateTodoModal,setUpdateTodoModal] = React.useState(false);
 const [checked,setChecked] = React.useState(false)

 useEffect(()=>{
    if(todo.status === 'complete') {
        setChecked(true)
    }else {
        setChecked(false)
    }
 },[todo.status])

 // dispatch
  const dispatch = useDispatch();

  const handleDelete = () => {
    // delete todo
    dispatch(deleteTodo(todo.id));
    toast.success("Todo deleted successfully");
  };

  const handleUpdate = () =>{
    setUpdateTodoModal(true);
  }

  const handleCheck = ()=>{
    setChecked(!checked)
    dispatch(updateTodo({
      ...todo,status:checked ?'incomplete':'complete'
    }))
  }
  return (
    <React.Fragment>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
         <CheckButton checked={checked} handleCheck={handleCheck}/>
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>{todo.time}</p>
          </div>
          <div className={styles.todoActions}>
            <div
              className={styles.icon}
              onClick={() => handleDelete()}
              onKeyDown={() => handleDelete()}
              tabIndex={0}
              role="button"
            >
              <MdDelete />
            </div>
            <div 
                className={styles.icon}
                onClick={()=>handleUpdate()}>
              <MdEdit />
            </div>
          </div>
        </div>
      </motion.div>
      <TodoModal type='Update' modalOpen={updateTodoModal} setModalOpen={setUpdateTodoModal} todo={todo}/>
    </React.Fragment>
  );
};

export default TodoItem;
