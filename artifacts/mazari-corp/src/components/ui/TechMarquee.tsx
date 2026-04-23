interface Item {
  src: string
  alt: string
  /** Se true, aplica filter pra deixar o logo branco (usar em SVGs monocromáticos pretos). */
  monochrome?: boolean
}

interface Props {
  items: Item[]
  duration?: number        // segundos pra completar uma volta
  reverse?: boolean
  className?: string
  size?: number            // altura em px (default 28)
  /** Espaçamento entre itens em px (default 64). Mantemos uniforme via padding-right para loop contínuo. */
  gap?: number
}

/**
 * Marquee infinito contínuo. Usa padding-right em cada item (não `gap`) pra
 * garantir que o espaçamento entre a última cópia do primeiro grupo e a
 * primeira cópia do segundo seja IDÊNTICO ao espaçamento interno — caso
 * contrário o loop "salta" ao reiniciar.
 */
export function TechMarquee({
  items,
  duration = 30,
  reverse = false,
  className = '',
  size = 28,
  gap = 64,
}: Props) {
  const list = [...items, ...items]

  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        maskImage:
          'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <div
        className="flex w-max items-center"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {list.map((item, i) => (
          <div
            key={`${item.alt}-${i}`}
            className="flex-shrink-0 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            style={{ paddingRight: gap }}
          >
            <img
              src={item.src}
              alt={item.alt}
              height={size}
              style={{
                height: size,
                width: 'auto',
                filter: item.monochrome ? 'brightness(0) invert(1)' : undefined,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
