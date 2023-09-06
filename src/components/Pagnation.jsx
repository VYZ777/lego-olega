import { Link } from 'react-router-dom'
import '../../styles/styles.css'
import { useState } from 'react'

export const Pagination = () => {
  return (
    <div className='pagination-box'>
      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <Link to={`/character?page=${index + 1}`}>
              <p className='pagination'>{index + 1}</p>
            </Link>
          )
        })}
    </div>
  )
}

export const PaginationBattle = () => {
  return (
    <div className='pagination-box'>
      {Array(9)
        .fill(0)
        .map((_, index) => {
          return (
            <Link to={`/battle?page=${index + 1}`}>
              <p className='pagination'>{index + 1}</p>
            </Link>
          )
        })}
    </div>
  )
}
