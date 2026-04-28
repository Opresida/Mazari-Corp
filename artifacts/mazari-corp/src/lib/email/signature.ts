/**
 * Mazari Corp — Email Signature HTML builder
 * --------------------------------------------
 * Gera assinatura de e-mail HTML pronta pra Gmail / Outlook / Apple Mail.
 *  - Table-based (Outlook compatível)
 *  - CSS inline (Gmail strips <style>)
 *  - Web-safe font stack (Plus Jakarta não carrega em clients de email)
 *  - 2 variantes: dark · light
 *  - Largura máxima 480px
 *  - SVG inline para o ponto lime + dividers
 */

export interface SignatureData {
  name: string
  role: string
  email: string
  phone: string
  location: string
  website: string
  linkedin?: string
}

export type SignatureVariant = 'dark' | 'light'

const FONT_STACK =
  "'Helvetica Neue', Helvetica, Arial, sans-serif"
const MONO_STACK = "'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace"

const PALETTE: Record<
  SignatureVariant,
  {
    bg: string
    fg: string
    fgSecondary: string
    fgMuted: string
    lime: string
    border: string
  }
> = {
  dark: {
    bg: '#080908',
    fg: '#FFFFFF',
    fgSecondary: 'rgba(255,255,255,0.78)',
    fgMuted: 'rgba(255,255,255,0.42)',
    lime: '#D2FF28',
    border: 'rgba(255,255,255,0.12)',
  },
  light: {
    bg: '#FFFFFF',
    fg: '#080908',
    fgSecondary: '#3A3A3A',
    fgMuted: '#888888',
    lime: '#7A9E0F', // lime mais escuro para contraste sobre branco
    border: '#E5E5E5',
  },
}

function escapeHTML(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface ContactItem {
  value: string
  highlight?: boolean
}

function buildContactRow(
  item: ContactItem,
  lime: string,
  fg: string,
  fgStrong: string,
): string {
  if (!item.value.trim()) return ''
  return `
        <tr>
          <td valign="top" style="padding: 3px 8px 3px 0; font-family: ${MONO_STACK}; font-size: 11px; line-height: 1.5; font-weight: 800; color: ${lime}; vertical-align: top;">▸</td>
          <td valign="top" style="padding: 3px 0; font-family: ${MONO_STACK}; font-size: 12px; line-height: 1.5; color: ${item.highlight ? fgStrong : fg}; ${item.highlight ? 'font-weight: 700;' : ''} word-break: break-word; vertical-align: top;">${escapeHTML(item.value)}</td>
        </tr>`
}

export function buildSignatureHTML(
  data: SignatureData,
  variant: SignatureVariant = 'dark',
): string {
  const c = PALETTE[variant]

  return `<!--mazari-signature-start-->
<table width="520" cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse: collapse; background: ${c.bg}; border: 1px solid ${c.border}; border-radius: 6px; max-width: 520px; font-family: ${FONT_STACK};">
  <tr>
    <!-- ═══ COLUNA BRAND ═══ -->
    <td width="150" valign="top" style="width: 150px; padding: 24px 22px; border-right: 2px solid ${c.lime}; vertical-align: top;">

      <!-- Logo MAZARI. -->
      <div style="font-family: ${MONO_STACK}; font-size: 22px; line-height: 1; font-weight: 800; letter-spacing: -0.5px; color: ${c.fg};">
        MAZARI<span style="color: ${c.lime};">.</span>
      </div>

      <!-- Tagline vertical (3 linhas, brand pillar) -->
      <div style="margin-top: 18px; font-family: ${MONO_STACK}; font-size: 9px; line-height: 1.85; letter-spacing: 2.5px; text-transform: uppercase; font-weight: 700; color: ${c.fgSecondary};">
        Engineering<br>Blockchain<br>AI
      </div>

      <!-- Divider sutil -->
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td height="1" style="height: 1px; line-height: 1px; font-size: 0; background: ${c.border};">&nbsp;</td>
        </tr>
      </table>

      <!-- Stats numéricos -->
      <div style="margin-top: 14px; font-family: ${MONO_STACK}; font-size: 9px; line-height: 1.7; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; color: ${c.fgMuted};">
        10+ years<br>30+ projects<br>5 continents
      </div>

    </td>

    <!-- ═══ COLUNA PESSOA ═══ -->
    <td valign="top" style="padding: 24px 26px; vertical-align: top;">

      <!-- Nome -->
      <div style="font-family: ${FONT_STACK}; font-size: 18px; line-height: 1.2; font-weight: 700; color: ${c.fg}; letter-spacing: -0.2px;">
        ${escapeHTML(data.name)}
      </div>

      <!-- Cargo (lime, mono caps) -->
      <div style="margin-top: 5px; font-family: ${MONO_STACK}; font-size: 10px; line-height: 1.4; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; color: ${c.lime};">
        ${escapeHTML(data.role)}
      </div>

      <!-- Divider sutil entre cargo e contatos -->
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" width="100%" style="border-collapse: collapse; margin-top: 14px; margin-bottom: 14px;">
        <tr>
          <td height="1" style="height: 1px; line-height: 1px; font-size: 0; background: ${c.border};">&nbsp;</td>
        </tr>
      </table>

      <!-- Contatos (table-based pra alinhamento perfeito) -->
      <table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse: collapse;">
        ${buildContactRow({ value: data.email }, c.lime, c.fgSecondary, c.fg)}
        ${buildContactRow({ value: data.phone }, c.lime, c.fgSecondary, c.fg)}
        ${buildContactRow({ value: data.location }, c.lime, c.fgSecondary, c.fg)}
        ${buildContactRow({ value: data.website, highlight: true }, c.lime, c.fgSecondary, c.fg)}
        ${data.linkedin ? buildContactRow({ value: data.linkedin }, c.lime, c.fgSecondary, c.fg) : ''}
      </table>

    </td>
  </tr>
</table>
<!--mazari-signature-end-->`
}

/** HTML completo standalone (com DOCTYPE) — para download como arquivo .html */
export function buildSignatureFile(
  data: SignatureData,
  variant: SignatureVariant = 'dark',
): string {
  const html = buildSignatureHTML(data, variant)
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assinatura — ${escapeHTML(data.name)}</title>
  <style>
    body { margin: 0; padding: 32px; background: ${variant === 'dark' ? '#1a1b1a' : '#f5f5f5'}; font-family: ${FONT_STACK}; }
    .instructions { max-width: 480px; margin: 0 auto 24px; padding: 16px; background: rgba(0,0,0,0.04); border-left: 3px solid #D2FF28; border-radius: 4px; font-size: 13px; line-height: 1.6; color: ${variant === 'dark' ? '#fff' : '#333'}; }
    .instructions h2 { margin: 0 0 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; color: #D2FF28; }
    .signature-wrapper { max-width: 480px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="instructions">
    <h2>Como instalar</h2>
    <strong>Gmail:</strong> Configurações → Geral → Assinatura → cole abaixo (Ctrl+A no preview, Ctrl+C, depois Ctrl+V no campo).<br>
    <strong>Outlook:</strong> Arquivo → Opções → Email → Assinaturas → criar nova → cole abaixo.<br>
    <strong>Apple Mail:</strong> Mail → Preferências → Assinaturas → cole abaixo (desmarque "use system fonts").
  </div>
  <div class="signature-wrapper">
    ${html}
  </div>
</body>
</html>`
}

/** Versão plain-text para fallback (alguns clients exigem) */
export function buildSignaturePlainText(data: SignatureData): string {
  const lines = [
    'MAZARI.',
    'Engineering · Blockchain · AI',
    '─────────────────────────',
    data.name,
    data.role,
    '',
    `▸ ${data.email}`,
    `▸ ${data.phone}`,
    `▸ ${data.location}`,
    `▸ ${data.website}`,
    data.linkedin ? `▸ ${data.linkedin}` : null,
    '',
    '10+ years · 30+ projects · 5 continents',
  ].filter(Boolean)
  return lines.join('\n')
}
