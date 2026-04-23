interface Props {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

/**
 * Linha 1px com gradient lime no meio — transparent → #D2FF28 → transparent.
 * Use entre seções ou como separador vertical em grids.
 */
export function GradientSplitter({
  className = '',
  orientation = 'horizontal',
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`${orientation === 'horizontal' ? 'mz-splitter' : 'mz-splitter-vert'} ${className}`}
    />
  )
}
