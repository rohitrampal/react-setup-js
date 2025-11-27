import { Container, Box } from '@mui/material'
import { LoginForm } from '../components/LoginForm'

export const LoginPage = () => {
  return (
    <Container
      maxWidth='sm'
      className='tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-8'
      aria-label='Login page'
    >
      <Box className='tw-w-full tw-max-w-md'>
        <LoginForm />
      </Box>
    </Container>
  )
}
