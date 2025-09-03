import React from 'react'
import Button, { SelectButton } from './Button'
//styles
import styles from '../styles/modules/app.module.scss'
import TodoModal from './TodoModal'
import { useDispatch } from 'react-redux'
import { selectFilterStatus } from '../slices/todoSlice'

const AppHeader = () => {
    const [modalOpen,setModalOpen] = React.useState(false)
    // const [filterStatus,setFilterStatus] = React.useState('all')
    const dispatch = useDispatch()

    const handleFilterStatus = (status)=>{
      // setFilterStatus(status)
      dispatch(selectFilterStatus(status))
    }
  return (
    <div className={styles.appHeader}>
        <Button variant='primary' onClick={() => setModalOpen(true)} >Add Task
         </Button>
        <SelectButton id='status' onChange={(e)=>handleFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="incomplete">Incompleted</option>
            <option value="complete">Completed</option>
        </SelectButton>
        <TodoModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
    </div>
  )
}

export default AppHeader