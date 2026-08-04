import { LegalPage, LegalSection } from '@/components/layout/LegalPage'
import { useSEO } from '@/lib/seo'
import { CONTACT_EMAIL, LEGAL_NAME, BRAND_NAME, CNPJ, ADDRESS_LINE } from '@/lib/contact'

export default function Privacidade() {
  useSEO({
    title: 'Política de Privacidade — Mazari Corp',
    description:
      'Como a Mazari Corp coleta, usa e protege dados pessoais, e como exercer seus direitos previstos na LGPD (Lei 13.709/2018).',
    path: '/privacidade',
  })

  return (
    <LegalPage
      eyebrow="Privacidade"
      title="Política de Privacidade"
      updatedAt="4 de agosto de 2026"
    >
      <LegalSection title="1. Quem é o controlador dos seus dados">
        <p>
          O controlador dos dados pessoais tratados neste site é <strong>{LEGAL_NAME}</strong>,
          inscrita no CNPJ sob o nº <strong>{CNPJ}</strong>, que opera sob a marca{' '}
          <strong>{BRAND_NAME}</strong>, com endereço em {ADDRESS_LINE}.
        </p>
        <p>
          Para qualquer assunto relacionado a dados pessoais, o canal de contato é{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Quais dados coletamos">
        <p>
          <strong>Dados que você nos envia.</strong> Quando você preenche o formulário de contato,
          coletamos os dados informados por você — normalmente nome, e-mail, telefone/WhatsApp e o
          conteúdo da mensagem. O envio é voluntário e depende de você.
        </p>
        <p>
          <strong>Dados de navegação.</strong> Se você aceitar os cookies de análise, coletamos
          dados agregados sobre o uso do site (páginas visitadas, tempo de permanência, origem do
          acesso, tipo de dispositivo e navegador) por meio do Google Analytics 4, com anonimização
          de IP. Enquanto você não aceitar, nenhum cookie de análise é gravado.
        </p>
        <p>
          Não coletamos dados pessoais sensíveis, não fazemos perfilamento publicitário e não
          coletamos dados de crianças e adolescentes de forma intencional.
        </p>
      </LegalSection>

      <LegalSection title="3. Por que tratamos esses dados">
        <p>
          <strong>Para responder ao seu contato</strong> e conduzir tratativas comerciais — base
          legal: procedimentos preliminares relacionados a contrato, a seu pedido (art. 7º, V, da
          LGPD).
        </p>
        <p>
          <strong>Para entender e melhorar o site</strong> — base legal: seu consentimento (art. 7º,
          I, da LGPD), manifestado no banner de cookies e revogável a qualquer momento.
        </p>
        <p>
          <strong>Para cumprir obrigações legais e regulatórias</strong>, quando aplicável — base
          legal: art. 7º, II, da LGPD.
        </p>
      </LegalSection>

      <LegalSection title="4. Com quem compartilhamos">
        <p>
          Não vendemos nem cedemos dados pessoais. Compartilhamos apenas com prestadores de serviço
          necessários à operação do site, que atuam como operadores e ficam limitados às nossas
          instruções:
        </p>
        <p>
          <strong>Google Analytics</strong> (Google LLC) — métricas de uso do site.{' '}
          <strong>Render</strong> (Render Services, Inc.) — hospedagem. Esses serviços podem
          processar dados fora do Brasil; nesses casos, a transferência internacional se apoia nas
          hipóteses do art. 33 da LGPD e nas cláusulas contratuais adotadas por esses fornecedores.
        </p>
        <p>
          Também poderemos compartilhar dados para cumprir ordem judicial ou requisição de
          autoridade competente.
        </p>
      </LegalSection>

      <LegalSection title="5. Por quanto tempo guardamos">
        <p>
          Mensagens de contato: mantidas enquanto durar a tratativa comercial e por até 5 anos após
          o último contato, prazo que acompanha a prescrição de pretensões de natureza civil.
        </p>
        <p>
          Dados de navegação: mantidos pelo período de retenção configurado no Google Analytics, de
          até 14 meses. Registros de acesso podem ser mantidos por 6 meses, conforme o art. 15 do
          Marco Civil da Internet.
        </p>
      </LegalSection>

      <LegalSection title="6. Seus direitos">
        <p>
          A LGPD garante a você, a qualquer momento e sem custo, o direito de: confirmar a
          existência de tratamento; acessar seus dados; corrigir dados incompletos, inexatos ou
          desatualizados; solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou
          tratados em desconformidade com a lei; solicitar portabilidade; obter informação sobre
          compartilhamentos; revogar o consentimento; e se opor a tratamento feito com base em
          outra hipótese legal.
        </p>
        <p>
          Para exercer qualquer um desses direitos, escreva para{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          . Responderemos no menor prazo possível, observados os prazos legais. Podemos pedir
          informações adicionais para confirmar sua identidade antes de atender ao pedido.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies">
        <p>
          <strong>Cookies necessários.</strong> Guardam apenas sua escolha sobre cookies e
          preferências básicas de navegação. Não dependem de consentimento porque sem eles o site
          não funciona corretamente.
        </p>
        <p>
          <strong>Cookies de análise.</strong> Só são gravados depois que você clica em "Aceitar" no
          banner. Se você recusar, o Google Analytics permanece em modo restrito, sem gravar cookies
          nem identificadores.
        </p>
        <p>
          Você pode mudar de ideia a qualquer momento limpando os dados do site no seu navegador —
          o banner voltará a aparecer. Também é possível bloquear cookies diretamente nas
          configurações do navegador.
        </p>
      </LegalSection>

      <LegalSection title="8. Segurança">
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados pessoais contra acesso
          não autorizado, perda, alteração ou divulgação indevida — incluindo tráfego cifrado por
          HTTPS em todo o site e controle de acesso às ferramentas de gestão. Nenhum sistema é
          absolutamente inviolável; em caso de incidente de segurança relevante, comunicaremos os
          titulares afetados e a ANPD nos termos do art. 48 da LGPD.
        </p>
      </LegalSection>

      <LegalSection title="9. Alterações desta política">
        <p>
          Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na
          legislação. A data da última atualização fica sempre no topo desta página. Mudanças
          relevantes serão sinalizadas no próprio site.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
