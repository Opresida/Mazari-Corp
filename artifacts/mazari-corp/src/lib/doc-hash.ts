export const MAZARI_MARKER_PREFIX = 'MAZARI-AUTH:v1:'

export interface MazariMarker {
  hash: string
  date: string
  signer: string
}

/** SHA-256 (hex) de um ArrayBuffer/Uint8Array, via Web Crypto. */
export async function sha256Hex(bytes: ArrayBuffer | Uint8Array): Promise<string> {
  const buf = bytes instanceof Uint8Array ? bytes.slice() : new Uint8Array(bytes)
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Marcador embutido nos metadados (Keywords) do PDF carimbado. */
export function buildMarker(m: MazariMarker): string {
  return `${MAZARI_MARKER_PREFIX}${m.hash}:${m.date}:${m.signer.replace(/:/g, ' ')}`
}

/** Extrai o marcador MAZARI de uma string de keywords/metadados, se existir. */
export function parseMarker(raw: string | undefined | null): MazariMarker | null {
  if (!raw) return null
  const idx = raw.indexOf(MAZARI_MARKER_PREFIX)
  if (idx === -1) return null
  const rest = raw.slice(idx + MAZARI_MARKER_PREFIX.length)
  const [hash, date, ...signerParts] = rest.split(':')
  if (!hash) return null
  return { hash, date: date || '', signer: signerParts.join(':') || '' }
}

export function shortHash(hash: string): string {
  if (hash.length <= 16) return hash
  return `${hash.slice(0, 8)}…${hash.slice(-8)}`
}
