import classNames from 'classnames'
import { useCallback, useMemo } from 'react'

import { useWindowDimensions } from './useWindowDimensions.ts'
import { GENESIS_BLOCK } from '../../consts'

const CHAR_ASPECT_RATIO = 3 / 2
const N = GENESIS_BLOCK.length

const Background = () => {
  const { width, height } = useWindowDimensions()

  const n = useMemo(
    () => Math.ceil(Math.sqrt((width * N * CHAR_ASPECT_RATIO) / height)),
    [height, width]
  )
  const m = useMemo(
    () => Math.floor(height / ((width / n) * CHAR_ASPECT_RATIO)),
    [height, width, n]
  )

  const { fontWidth, fontHeight } = useMemo(() => {
    const correctingFactor = n * m < N ? 1 : 0
    const fontWidth = width / (n + correctingFactor)
    return { fontWidth, fontHeight: fontWidth * CHAR_ASPECT_RATIO }
  }, [n, m, width])

  const paddedGenesisBlock = GENESIS_BLOCK.padEnd(n * m, '0').split('')

  const renderChar = useCallback(
    (char: string) => (
      <span
        style={{
          width: fontWidth,
          height: fontHeight,
          fontSize: fontWidth * 1.8
        }}
      >
        {char}
      </span>
    ),
    [fontHeight, fontWidth]
  )

  return (
    <div
      style={{
        position: 'fixed',
        inset: '0px',
        zIndex: -10,
        display: 'flex',
        userSelect: 'none',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        wordBreak: 'break-all',
        lineHeight: 0.9,
        opacity: '5.5%',
      }}
    >
      {paddedGenesisBlock.map(renderChar)}
    </div>
  )
}

export default Background
