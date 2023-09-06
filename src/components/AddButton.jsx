import { addToCart } from '../../store/slice'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'

export const AddButton = (props) => {
  const dispatch = useDispatch()
  const notificationCart = () => {
    toast.success('Карточка добавлена в корзину')
  }
  const handleNotification = () => {
    dispatch(addToCart(props.data))
    notificationCart()
  }
  return <button onClick={handleNotification}>Add to Cart</button>
}
