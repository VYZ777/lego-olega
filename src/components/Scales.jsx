import NavBar from './NavBar.jsx'
import { AgGridReact } from 'ag-grid-react' // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css' // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css' // Optional theme CSS
import { useDispatch, useSelector } from 'react-redux'
import { AddButton } from './AddButton.jsx'
import { RemoveButton } from './RemoveButton.jsx'
import { useAuth } from '@clerk/clerk-react'
import { fetchScalesAsync } from '../../store/slice.js'
import { useEffect } from 'react'

const Scales = () => {
  const scales = useSelector((state) => state.characters.scales)
  const { userId } = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchScalesAsync(userId))
  }, [])
  const columnDefs = [
    { field: 'name', sortable: true, filter: true, pinned: 'left' },
    { field: 'kit', sortable: true, filter: true },
    { field: 'fire', sortable: true, filter: true },
    { field: 'thunder', sortable: true, filter: true },
    { field: 'dirt', sortable: true, filter: true },
    { field: 'ice', sortable: true, filter: true },
    { field: 'kind', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
    { field: 'Delete', cellRenderer: RemoveButton },
    { field: 'Add to Cart', cellRenderer: AddButton },
  ]

  return (
    <div>
      <NavBar />
      <div
        className='ag-theme-alpine'
        style={{ height: '30rem', width: '100%' }}
      >
        <AgGridReact
          domLayout='autoHeight'
          rowData={scales}
          columnDefs={columnDefs}
          animateRows={true}
        />
      </div>
    </div>
  )
}

export default Scales
