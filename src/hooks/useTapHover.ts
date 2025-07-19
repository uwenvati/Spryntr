import { useState } from 'react'

export function useTapHover() {
  const [hovered, setHovered] = useState(false)

  const onTouchStart = () => setHovered(true)
  const onTouchEnd = () => setTimeout(() => setHovered(false), 200)

  return {
    hovered,
    bind: {
      onTouchStart,
      onTouchEnd,
    },
  }
}
