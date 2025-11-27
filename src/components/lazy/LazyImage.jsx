import { useState, useRef, useEffect } from 'react'
import { Box, Skeleton, Typography } from '@mui/material'

export const LazyImage = ({
  src,
  alt,
  className,
  width,
  height,
  placeholder,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  return (
    <Box
      ref={imgRef}
      className={className}
      style={{ width, height, position: 'relative', overflow: 'hidden' }}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          variant='rectangular'
          width={width || '100%'}
          height={height || '100%'}
          animation='wave'
        />
      )}
      {hasError && (
        <Box
          className='tw-flex tw-items-center tw-justify-center tw-bg-gray-200'
          style={{ width, height }}
        >
          <Typography variant='caption' color='textSecondary'>
            {alt}
          </Typography>
        </Box>
      )}
      {isInView && (
        <img
          src={hasError ? placeholder : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: isLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          loading='lazy'
        />
      )}
    </Box>
  )
}

