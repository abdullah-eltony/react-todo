import React from 'react'

// styles 
import style from '../styles/modules/title.module.scss'
const PageTitle = ({children}) => {
  return (
    <p className={style.title}>{children}</p>
  )
}

export default PageTitle