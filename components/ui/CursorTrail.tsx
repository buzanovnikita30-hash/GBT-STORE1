'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorTrail() {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const dx = useMotionValue(-300)
  const dy = useMotionValue(-300)

  const ringX = useSpring(mx, { damping: 28, stiffness: 200, mass: 0.5 })
  const ringY = useSpring(my, { damping: 28, stiffness: 200, mass: 0.5 })
  const dotX = useSpring(dx, { damping: 50, stiffness: 600 })
  const dotY = useSpring(dy, { damping: 50, stiffness: 600 })

  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) {
      setTouch(true)
      return
    }
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      dx.set(e.clientX)
      dy.set(e.clientY)
      setVisible(true)
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHover(!!t.closest('a,button,[role="button"],input,textarea,select,label'))
    }
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [mx, my, dx, dy])

  if (touch) return null

  return (
    <>
      {/* КОЛЬЦО — яркое зелёное с glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999,
          border: '2.5px solid #10a37f',
          borderColor: '#10a37f',
        }}
        animate={{
          width: hover ? 40 : 26,
          height: hover ? 40 : 26,
          opacity: visible ? 1 : 0,
          borderColor: '#10a37f',
          backgroundColor: hover
            ? 'rgba(16,163,127,0.15)'
            : 'rgba(16,163,127,0.05)',
          boxShadow: hover
            ? '0 0 12px rgba(16,163,127,0.6), 0 0 24px rgba(16,163,127,0.3)'
            : '0 0 8px rgba(16,163,127,0.4)',
        }}
        transition={{ duration: 0.12 }}
      />
      {/* ТОЧКА — ярко зелёная, точная */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 999999,
          width: 5,
          height: 5,
          backgroundColor: '#10a37f',
          boxShadow: '0 0 6px rgba(16,163,127,0.8)',
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.08 }}
      />
    </>
  )
}
