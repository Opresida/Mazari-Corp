const UNIDADES = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
const DEZ_DEZENOVE = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
const DEZENAS = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
const CENTENAS = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
const ESCALAS: [string, string][] = [
  ['', ''],
  ['mil', 'mil'],
  ['milhão', 'milhões'],
  ['bilhão', 'bilhões'],
  ['trilhão', 'trilhões'],
]

function ate999(n: number): string {
  if (n === 0) return ''
  if (n === 100) return 'cem'
  const c = Math.floor(n / 100)
  const resto = n % 100
  const partes: string[] = []
  if (c > 0) partes.push(CENTENAS[c])
  if (resto > 0) {
    if (resto < 10) partes.push(UNIDADES[resto])
    else if (resto < 20) partes.push(DEZ_DEZENOVE[resto - 10])
    else {
      const d = Math.floor(resto / 10)
      const u = resto % 10
      partes.push(u === 0 ? DEZENAS[d] : `${DEZENAS[d]} e ${UNIDADES[u]}`)
    }
  }
  return partes.join(' e ')
}

function inteiroPorExtenso(n: number): string {
  if (n === 0) return 'zero'
  const grupos: number[] = []
  let x = n
  while (x > 0) {
    grupos.push(x % 1000)
    x = Math.floor(x / 1000)
  }
  const partes: string[] = []
  for (let i = grupos.length - 1; i >= 0; i--) {
    const g = grupos[i]
    if (g === 0) continue
    if (i === 1) {
      partes.push(g === 1 ? 'mil' : `${ate999(g)} mil`)
    } else if (i >= 2) {
      const [sing, plur] = ESCALAS[i]
      partes.push(`${ate999(g)} ${g === 1 ? sing : plur}`)
    } else {
      partes.push(ate999(g))
    }
  }
  return partes.join(', ')
}

/** Converte centavos em valor por extenso pt-BR. Ex.: 500000 → "cinco mil reais". */
export function valorPorExtenso(cents: number): string {
  const reais = Math.floor(cents / 100)
  const centavos = cents % 100
  const blocos: string[] = []
  if (reais > 0) blocos.push(`${inteiroPorExtenso(reais)} ${reais === 1 ? 'real' : 'reais'}`)
  if (centavos > 0) blocos.push(`${inteiroPorExtenso(centavos)} ${centavos === 1 ? 'centavo' : 'centavos'}`)
  if (blocos.length === 0) return 'zero reais'
  const texto = blocos.join(' e ')
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
