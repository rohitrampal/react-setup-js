import { Container } from '@mui/material'
import { DataList } from '../components/DataList'

export const ListPage = () => {
  return (
    <Container maxWidth='xl' className='tw-py-4 md:tw-py-8 tw-px-2 sm:tw-px-4' aria-label='List page'>
      <DataList />
    </Container>
  )
}
