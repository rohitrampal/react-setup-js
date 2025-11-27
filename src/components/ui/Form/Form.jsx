import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { classNames } from '@/utils/classNames'

export function Form({
  children,
  onSubmit,
  validationSchema,
  defaultValues,
  className,
  'aria-label': ariaLabel,
}) {
  const methods = useForm({
    resolver: validationSchema
      ? yupResolver(validationSchema)
      : undefined,
    defaultValues: defaultValues,
  })

  const handleSubmit = methods.handleSubmit(async data => {
    await onSubmit(data)
  })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit}
        className={classNames('tw-w-full', className)}
        aria-label={ariaLabel || 'Form'}
        noValidate
      >
        {children(methods)}
      </form>
    </FormProvider>
  )
}

