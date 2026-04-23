import { useEffect, useRef } from 'react'

/**
 * Background ambient: trechos de código Solidity rolando verticalmente em
 * colunas, estilo "matrix rain" porém com código real da stack Mazari.
 * Canvas 2D, performance OK (cleanup + rAF). Respeita prefers-reduced-motion.
 */

const SOLIDITY_LINES = [
  '// SPDX-License-Identifier: MIT',
  'pragma solidity ^0.8.20;',
  'import "@openzeppelin/contracts/token/ERC20/ERC20.sol";',
  'import "@openzeppelin/contracts/access/Ownable.sol";',
  'contract MazariToken is ERC20, Ownable {',
  '  mapping(address => uint256) balances;',
  '  mapping(address => mapping(address => uint256)) allowances;',
  '  uint256 private _totalSupply;',
  '  uint8 public constant DECIMALS = 18;',
  '  event Transfer(address indexed from, address indexed to, uint256 value);',
  '  event Approval(address indexed owner, address indexed spender, uint256 value);',
  '  event Minted(address indexed account, uint256 amount);',
  '  constructor(uint256 initialSupply) ERC20("Mazari", "MZR") {',
  '    _mint(msg.sender, initialSupply * 10 ** DECIMALS);',
  '  }',
  '  function transfer(address to, uint256 amount) public override returns (bool) {',
  '    require(to != address(0), "transfer to zero address");',
  '    require(balances[msg.sender] >= amount, "insufficient balance");',
  '    balances[msg.sender] -= amount;',
  '    balances[to] += amount;',
  '    emit Transfer(msg.sender, to, amount);',
  '    return true;',
  '  }',
  '  function mint(address to, uint256 amount) external onlyOwner {',
  '    _mint(to, amount);',
  '    emit Minted(to, amount);',
  '  }',
  '  modifier onlyOwner() {',
  '    require(msg.sender == owner(), "Ownable: caller is not the owner");',
  '    _;',
  '  }',
  '  function approve(address spender, uint256 amount) public override returns (bool) {',
  '    allowances[msg.sender][spender] = amount;',
  '    emit Approval(msg.sender, spender, amount);',
  '    return true;',
  '  }',
  '  function balanceOf(address account) public view override returns (uint256) {',
  '    return balances[account];',
  '  }',
  '  function totalSupply() public view override returns (uint256) {',
  '    return _totalSupply;',
  '  }',
  '}',
]

export function SolidityRain({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const FONT = '11px "JetBrains Mono", ui-monospace, monospace'
    ctx.font = FONT

    // Largura média de um caractere pra calcular colunas
    const charWidth = 7
    const colWidth = 230 // largura generosa pra linhas longas
    const lineHeight = 18

    // Inicializa colunas — cada uma tem um offset Y inicial e uma velocidade
    type Col = { x: number; y: number; speed: number; lineIdx: number }
    const cols: Col[] = []

    const rebuildCols = () => {
      cols.length = 0
      const count = Math.ceil(width / colWidth)
      for (let i = 0; i < count; i++) {
        cols.push({
          x: i * colWidth,
          y: -Math.random() * height,
          speed: 0.15 + Math.random() * 0.35,
          lineIdx: Math.floor(Math.random() * SOLIDITY_LINES.length),
        })
      }
    }
    rebuildCols()
    window.addEventListener('resize', rebuildCols)

    let raf = 0
    const render = () => {
      // fade sutil pra dar rastro suave
      ctx.fillStyle = 'rgba(8, 9, 8, 0.12)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = FONT
      ctx.textBaseline = 'top'

      for (const col of cols) {
        col.y += col.speed
        if (col.y > height + lineHeight) {
          // reinicia por cima com nova linha
          col.y = -lineHeight - Math.random() * 200
          col.lineIdx = Math.floor(Math.random() * SOLIDITY_LINES.length)
          col.speed = 0.15 + Math.random() * 0.35
        }

        // Desenha 14 linhas "acima" da posição atual, cada uma com fade
        // pra criar a esteira de código vindo de baixo
        for (let i = 0; i < 14; i++) {
          const y = col.y - i * lineHeight
          if (y < -lineHeight || y > height) continue
          const lineIndex = (col.lineIdx - i + SOLIDITY_LINES.length * 10) % SOLIDITY_LINES.length
          const text = SOLIDITY_LINES[lineIndex]
          // head: mais brilhante. cauda: apaga
          const alpha = Math.max(0, 0.28 - i * 0.02)
          if (i === 0) {
            ctx.fillStyle = `rgba(210, 255, 40, 0.85)`
          } else {
            ctx.fillStyle = `rgba(210, 255, 40, ${alpha})`
          }
          ctx.fillText(text, col.x, y)
        }
      }

      if (!reduce) raf = requestAnimationFrame(render)
    }

    if (reduce) {
      render()
    } else {
      raf = requestAnimationFrame(render)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', rebuildCols)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  )
}
