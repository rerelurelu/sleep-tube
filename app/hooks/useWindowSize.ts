import React, { useState } from 'react'

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
const useLayoutEffect = canUseDOM ? React.useLayoutEffect : () => {}

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
