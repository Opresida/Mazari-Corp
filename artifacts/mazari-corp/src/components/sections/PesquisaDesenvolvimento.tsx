import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { DecoratedHeading } from '../ui/DecoratedHeading'

/* ════════════ TIPOS & DADOS ════════════ */

interface Researcher {
  name: string
  title: string
  bio: string
  lattesUrl?: string
  lattesId?: string
  photo?: string
  initials: string
  placeholder?: boolean
}

const researchers: Researcher[] = [
  {
    name: 'Wellington Uchôa Pinheiro',
    title: 'Pesquisador Desenvolvedor Sênior',
    bio: 'Full-Stack com foco em React Native/TypeScript (mobile) e Python (FastAPI), com experiência em Java (Spring Boot) e sistemas distribuídos (Blockchain). Tecnólogo em ADS, pós em Engenharia de Software.',
    photo: 'https://i.imgur.com/5uxlQp7.png',
    lattesUrl: 'http://lattes.cnpq.br/6673765898617922',
    lattesId: '6673765898617922',
    initials: 'WP',
  },
  {
    name: 'Danton Duarte',
    title: 'Game Developer & Platform Creator',
    bio: 'Especialista em Solidity, Unity 3D, Unreal Engine e blockchain. Dezenas de projetos: jogos mobile, MMOs, plataformas DeFi e NFTs em Ethereum, Solana, BSC e Polygon. Consultor de tecnologia para startups.',
    photo: 'https://i.imgur.com/PGPcUoc.png',
    initials: 'DD',
  },
  {
    name: 'Nayara Dayane',
    title: 'Diretora Executiva MAZARI',
    bio: 'Estrategista em marketing digital, desenvolvimento de negócios e estruturação empresarial. Cria modelos escaláveis, sistemas de vendas de alta conversão e operações com foco em crescimento sustentável.',
    photo: 'https://i.imgur.com/2xCvXCV.png',
    initials: 'ND',
  },
  {
    name: 'Em breve',
    title: 'Pesquisador em Pentest & Segurança Ofensiva',
    bio: 'Posição em estruturação. Especialista em análise de vulnerabilidades, OWASP, OSCP e ferramental ofensivo (GhostScan + AVEONE), responsável técnico pelos engagements MAZARI.',
    initials: '?P',
    placeholder: true,
  },
  {
    name: 'Em breve',
    title: 'Pesquisador em Desenvolvimento Mobile',
    bio: 'Posição em estruturação. Especialista em React Native, Swift e Kotlin, com foco em apps performáticos para clientes da MAZARI nos verticais fintech, saúde e e-commerce.',
    initials: '?M',
    placeholder: true,
  },
]

/* ════════════ CARD ════════════ */

function ResearcherCard({ r }: { r: Researcher }) {
  const [hovered, setHovered] = useState(false)
  const isPlaceholder = !!r.placeholder

  // Glow primário (neon lime MAZARI) — placeholders ficam com glow neutro
  const glowColor = isPlaceholder
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(210,255,40,0.28)'
  const borderColor = isPlaceholder
    ? 'rgba(255,255,255,0.12)'
    : 'rgba(210,255,40,0.35)'
  const accentColor = isPlaceholder ? '#A1A1A1' : '#D2FF28'

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '320px',
        flexShrink: 0,
        background: hovered
          ? 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
          : 'linear-gradient(145deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? borderColor : 'rgba(255,255,255,0.07)'}`,
        borderRadius: '20px',
        padding: '1.85rem 1.6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.9rem',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 24px 55px rgba(0,0,0,0.6), 0 0 40px ${glowColor}`
          : '0 8px 32px rgba(0,0,0,0.35)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'default',
        opacity: isPlaceholder ? 0.78 : 1,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '108px',
          height: '108px',
          borderRadius: '50%',
          background: r.photo
            ? '#1A1B1A'
            : isPlaceholder
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(210,255,40,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `3px solid ${hovered ? accentColor : 'rgba(255,255,255,0.15)'}`,
          boxShadow: hovered
            ? `0 0 0 4px rgba(255,255,255,0.05), 0 0 24px ${glowColor}`
            : `0 0 0 4px rgba(255,255,255,0.04)`,
          transition: 'all 0.4s ease',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {r.photo ? (
          <img
            src={r.photo}
            alt={r.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        ) : (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: '1.5rem',
              color: accentColor,
              letterSpacing: '0.04em',
            }}
          >
            {r.initials}
          </span>
        )}
      </div>

      {/* Nome */}
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#FFFFFF',
          lineHeight: 1.25,
          textAlign: 'center',
          margin: 0,
        }}
      >
        {r.name}
      </h3>

      {/* Cargo */}
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: accentColor,
          fontWeight: 600,
          lineHeight: 1.4,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: 0,
        }}
      >
        {r.title}
      </p>

      {/* Bio (3 linhas, ellipsis) */}
      <p
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '0.78rem',
          color: '#A1A1A1',
          fontWeight: 400,
          lineHeight: 1.55,
          textAlign: 'center',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '4.6rem',
        }}
      >
        {r.bio}
      </p>

      {/* Lattes ID badge */}
      {!isPlaceholder && r.lattesId && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            padding: '0.28rem 0.65rem',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#8A94A6',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            ID Lattes:
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.62rem',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            {r.lattesId}
          </span>
        </div>
      )}

      {/* CTA: 3 estados — placeholder / sem Lattes / com Lattes */}
      {isPlaceholder ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.15rem',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(255,255,255,0.18)',
            color: '#A1A1A1',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Posição em aberto
        </div>
      ) : !r.lattesUrl || r.lattesUrl === '#' ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.15rem',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px dashed rgba(210,255,40,0.25)',
            color: 'rgba(210,255,40,0.65)',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Lattes em breve
        </div>
      ) : (
        <a
          href={r.lattesUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            background: '#D2FF28',
            color: '#080908',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.78rem',
            textDecoration: 'none',
            boxShadow: '0 0 16px rgba(210,255,40,0.32)',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 28px rgba(210,255,40,0.55)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 16px rgba(210,255,40,0.32)'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          <ExternalLink size={13} />
          Acessar Curriculum
        </a>
      )}
    </div>
  )
}

/* ════════════ SEÇÃO ════════════ */

export function PesquisaDesenvolvimento() {
  const [paused, setPaused] = useState(false)

  // Duplica o array pra criar a ilusão de loop infinito
  const allCards = [...researchers, ...researchers]

  return (
    <section
      id="pdi"
      className="relative py-28 md:py-32 overflow-hidden"
      style={{ background: '#080908' }}
    >
      {/* Glow blob lime no canto */}
      <div
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          background: '#D2FF28',
          top: '8%',
          right: '-15%',
          opacity: 0.05,
          filter: 'blur(120px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: '#D2FF28',
          bottom: '5%',
          left: '-10%',
          opacity: 0.04,
          filter: 'blur(100px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 z-10 mb-16 md:mb-20">
        <DecoratedHeading
          tag="03. PD&I · Capital Humano"
          text="Consultoria para Projetos de"
          accent="Pesquisa, Desenvolvimento & Inovação."
          subhead="Equipe sênior de pesquisadores e desenvolvedores que sustenta cada entrega da MAZARI — de pentest a blockchain, de mobile a estratégia de negócios. Currículos rastreáveis no CNPq."
        />
      </div>

      {/* Carrossel infinito */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '1.5rem 0',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fades laterais */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '200px',
            height: '100%',
            background: 'linear-gradient(to right, #080908 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '100%',
            background: 'linear-gradient(to left, #080908 0%, transparent 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            gap: '1.4rem',
            animation: 'pdi-scroll 50s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
            width: 'max-content',
            padding: '0.5rem 1rem',
          }}
        >
          {allCards.map((r, i) => (
            <ResearcherCard key={`${r.initials}-${i}`} r={r} />
          ))}
        </div>
      </div>
    </section>
  )
}
