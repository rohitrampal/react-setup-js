import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Button, Input, Card } from '@/components/ui'
import { useAuth } from '@/modules/auth'
import { SecurityUtils } from '@/utils/security'
import { Box } from '@mui/material'

export const ProfileForm = () => {
  const { t } = useTranslation()
  const { user } = useAuth()

  const profileSchema = yup.object({
    name: yup.string().required(t('auth.nameRequired')),
    email: yup.string().email(t('auth.invalidEmail')).required(t('auth.emailRequired')),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    const sanitizedData = {
      name: SecurityUtils.sanitizeInput(data.name),
      email: SecurityUtils.sanitizeInput(data.email),
    }
    // TODO: Implement profile update API call
    // Profile update will be implemented here
    void sanitizedData
  }

  return (
    <Card title={t('profile.profileInformation')} aria-label={t('profile.title')}>
      <Box
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        aria-label={t('profile.profileInformation')}
        noValidate
      >
        <Input
          {...register('name')}
          label={t('profile.name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          required
          aria-required='true'
        />

        <Input
          {...register('email')}
          label={t('profile.email')}
          type='email'
          error={!!errors.email}
          helperText={errors.email?.message}
          required
          autoComplete='email'
          aria-required='true'
        />

        <Button
          type='submit'
          variant='contained'
          className='tw-mt-4'
          aria-label={t('profile.updateProfile')}
        >
          {t('profile.updateProfile')}
        </Button>
      </Box>
    </Card>
  )
}

