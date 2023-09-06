import { forwardRef } from 'react'
import { Group, Text, Select } from '@mantine/core'
import { Link } from 'react-router-dom'

const Controller = () => {
  return (
    <Select
      label='Выберите тип карточек'
      placeholder='Тип'
      data={[
        { value: '/character', label: 'Персонажи' },
        { value: '/battle', label: 'Боевые' },
      ]}
      itemComponent={AutoCompleteItem}
    />
  )
}

const AutoCompleteItem = forwardRef(({ value, label }, ref) => {
  return (
    <div ref={ref}>
      <Link style={{ color: 'black', textDecoration: 'none' }} to={value}>
        <Group style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} noWrap>
          <div>
            <Text>{label}</Text>
          </div>
        </Group>
      </Link>
    </div>
  )
})
export default Controller
