import { removeScales } from '../../store/slice'
import { useDispatch } from 'react-redux'
import { useAuth } from '@clerk/clerk-react'

export const RemoveButton = (props) => {
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const handleDeleteItem = () => {
    console.log(dispatch(removeScales({ userId, item: props })))

    dispatch(removeScales({ userId, item: props }))
  }
  return <button onClick={handleDeleteItem}>Delete</button>
}
