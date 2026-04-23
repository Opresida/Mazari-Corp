import { TechMarquee } from '../ui/TechMarquee'
import { GradientSplitter } from '../ui/GradientSplitter'

// Stack tech (simpleicons, monocromático preto → invertemos pra branco via filter)
import reactIcon from '@/assets/logos/tech/react.svg'
import nextIcon from '@/assets/logos/tech/nextdotjs.svg'
import tsIcon from '@/assets/logos/tech/typescript.svg'
import solidityIcon from '@/assets/logos/tech/solidity.svg'
import pythonIcon from '@/assets/logos/tech/python.svg'
import awsIcon from '@/assets/logos/tech/amazonaws.svg'
import nodeIcon from '@/assets/logos/tech/nodedotjs.svg'
import ethIcon from '@/assets/logos/tech/ethereum.svg'
import polygonIcon from '@/assets/logos/tech/polygon.svg'

export function TrustedBrands() {
  const techStack = [
    { src: reactIcon, alt: 'React', monochrome: true },
    { src: nextIcon, alt: 'Next.js', monochrome: true },
    { src: tsIcon, alt: 'TypeScript', monochrome: true },
    { src: nodeIcon, alt: 'Node.js', monochrome: true },
    { src: pythonIcon, alt: 'Python', monochrome: true },
    { src: solidityIcon, alt: 'Solidity', monochrome: true },
    { src: ethIcon, alt: 'Ethereum', monochrome: true },
    { src: polygonIcon, alt: 'Polygon', monochrome: true },
    { src: awsIcon, alt: 'AWS', monochrome: true },
  ]

  return (
    <section className="relative py-16 bg-background overflow-hidden">
      <GradientSplitter className="absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mb-8 sm:mb-10 flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="mz-tag mb-2">Stack</div>
          <p className="text-sm text-white/60">
            Tecnologias que escrevemos em produção todos os dias.
          </p>
        </div>
        <div className="flex items-center gap-2 mz-mono text-[10px] uppercase tracking-widest text-white/40">
          <span className="mz-dot" /> Live in production
        </div>
      </div>

      <TechMarquee items={techStack} duration={34} size={34} gap={80} />

      <GradientSplitter className="absolute bottom-0 left-0" />
    </section>
  )
}
