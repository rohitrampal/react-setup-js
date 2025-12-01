import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Button, Input, Alert } from '@/components/ui'
import { useAuth } from '@/modules/auth'
import { SecurityUtils } from '@/utils/security'
import { Box, Typography, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const loginSchema = yup.object({
    email: yup.string().email(t('auth.invalidEmail')).required(t('auth.emailRequired')),
    password: yup.string().min(6, t('auth.passwordMinLength')).required(t('auth.passwordRequired')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async data => {
    setError(null)
    setLoading(true)

    try {
      const sanitizedData = {
        email: SecurityUtils.sanitizeInput(data.email),
        password: data.password,
      }
      await login(sanitizedData)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.loginFailed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      className='tw-w-full tw-max-w-md tw-mx-auto tw-p-4 sm:tw-p-6'
      aria-label='Login form'
      noValidate
    >
      <Typography
        variant='h4'
        component='h1'
        className='tw-mb-4 sm:tw-mb-6 tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-text-center'
      >
        {t('auth.login')}
      </Typography>

      {error && (
        <Alert severity='error' dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Input
        {...register('email')}
        label={t('auth.email')}
        type='email'
        error={!!errors.email}
        helperText={errors.email?.message}
        required
        autoComplete='email'
        aria-required='true'
      />

      <Input
        {...register('password')}
        label={t('auth.password')}
        type='password'
        error={!!errors.password}
        helperText={errors.password?.message}
        required
        autoComplete='current-password'
        aria-required='true'
      />

      <Button
        type='submit'
        variant='contained'
        fullWidth
        loading={loading}
        className='tw-mt-4'
        aria-label={t('auth.login')}
      >
        {t('auth.login')}
      </Button>

      <Box className='tw-mt-4 tw-text-center'>
        <Link
          href='/register'
          onClick={e => {
            e.preventDefault()
            navigate('/register')
          }}
          className='tw-text-primary-600 hover:tw-underline tw-text-sm sm:tw-text-base'
          aria-label={t('auth.register')}
        >
          {t('auth.dontHaveAccount')}
        </Link>
      </Box>
    </Box>
  )
}
