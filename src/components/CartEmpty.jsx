import '../../styles/styles.css'

export const CartEmpty = ({ show, setShow }) => {
  return (
    <div>
      <div
        className='cart-modal'
        style={{
          display: show ? 'flex' : 'none',
        }}
      >
        <div style={{ display: 'grid' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '4rem' }}>
            Корзина пуста...
          </h1>
          <button
            style={{ height: '2rem', backgroundColor: 'white' }}
            onClick={() => setShow(false)}
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  )
}
