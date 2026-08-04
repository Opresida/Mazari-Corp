import { LegalPage, LegalSection } from '@/components/layout/LegalPage'
import { useSEO } from '@/lib/seo'
import { CONTACT_EMAIL, LEGAL_NAME, BRAND_NAME, CNPJ, ADDRESS_LINE, ADDRESS } from '@/lib/contact'

export default function Termos() {
  useSEO({
    title: 'Termos de Uso — Mazari Corp',
    description:
      'Condições de uso do site da Mazari Corp: escopo, propriedade intelectual, responsabilidades e foro.',
    path: '/termos',
  })

  return (
    <LegalPage eyebrow="Legal" title="Termos de Uso" updatedAt="4 de agosto de 2026">
      <LegalSection title="1. Quem somos">
        <p>
          Este site é mantido por <strong>{LEGAL_NAME}</strong>, CNPJ <strong>{CNPJ}</strong>, que
          opera sob a marca <strong>{BRAND_NAME}</strong>, com endereço em {ADDRESS_LINE}. Ao
          navegar por este site, você concorda com estes Termos de Uso.
        </p>
      </LegalSection>

      <LegalSection title="2. O que este site é">
        <p>
          Este é um site institucional. Ele apresenta os serviços da {BRAND_NAME} — desenvolvimento
          de software, inteligência artificial, blockchain, pentest, pesquisa e desenvolvimento e
          consultoria de estruturação — e serve como canal de contato.
        </p>
        <p>
          <strong>O conteúdo deste site não é proposta comercial vinculante.</strong> Escopo,
          prazos, valores e responsabilidades de qualquer projeto são definidos exclusivamente em
          contrato ou proposta assinada entre as partes. Números apresentados a título de
          apresentação institucional não constituem garantia de resultado.
        </p>
      </LegalSection>

      <LegalSection title="3. Uso aceitável">
        <p>Ao usar este site, você concorda em não:</p>
        <p>
          Praticar atos que comprometam a disponibilidade, a integridade ou a segurança do site;
          tentar obter acesso não autorizado a sistemas, contas ou dados; usar meios automatizados
          que sobrecarreguem a infraestrutura; extrair conteúdo em massa para reprodução comercial;
          ou empregar o site para qualquer finalidade ilícita.
        </p>
      </LegalSection>

      <LegalSection title="4. Propriedade intelectual">
        <p>
          Marca, nome, logotipo, identidade visual, textos, imagens, código-fonte, layout e demais
          elementos deste site são de titularidade da {BRAND_NAME} ou de terceiros que autorizaram
          seu uso, e estão protegidos pela Lei 9.610/1998 (Direitos Autorais) e pela Lei 9.279/1996
          (Propriedade Industrial).
        </p>
        <p>
          É permitido citar e compartilhar links para o conteúdo. É vedada a reprodução,
          distribuição, modificação ou uso comercial sem autorização prévia e por escrito. Marcas de
          terceiros eventualmente exibidas pertencem aos seus respectivos titulares.
        </p>
      </LegalSection>

      <LegalSection title="5. Links e serviços de terceiros">
        <p>
          O site pode conter links para serviços de terceiros. A {BRAND_NAME} não controla esses
          serviços e não responde por seu conteúdo, disponibilidade ou práticas de privacidade. O
          acesso a eles é de responsabilidade do usuário e se sujeita aos termos daqueles serviços.
        </p>
      </LegalSection>

      <LegalSection title="6. Disponibilidade e limitação de responsabilidade">
        <p>
          Trabalhamos para manter o site disponível e as informações corretas e atualizadas, mas não
          garantimos operação ininterrupta ou livre de erros. O site pode ficar indisponível por
          manutenção, falha técnica ou fatores fora do nosso controle.
        </p>
        <p>
          Na máxima extensão permitida pela legislação aplicável, a {BRAND_NAME} não responde por
          danos indiretos, lucros cessantes ou perda de dados decorrentes do uso ou da
          impossibilidade de uso deste site. Nada nestes Termos afasta direitos assegurados ao
          consumidor pela Lei 8.078/1990.
        </p>
      </LegalSection>

      <LegalSection title="7. Privacidade">
        <p>
          O tratamento de dados pessoais é descrito na{' '}
          <a href="/privacidade" className="text-primary underline underline-offset-2 hover:opacity-80">
            Política de Privacidade
          </a>
          , que integra estes Termos.
        </p>
      </LegalSection>

      <LegalSection title="8. Alterações">
        <p>
          Estes Termos podem ser alterados a qualquer momento. A versão vigente é sempre a publicada
          nesta página, com a data de atualização no topo. O uso continuado do site após mudanças
          significa concordância com a versão em vigor.
        </p>
      </LegalSection>

      <LegalSection title="9. Lei aplicável e foro">
        <p>
          Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
          da Comarca de {ADDRESS.city}/{ADDRESS.state} para dirimir controvérsias, com renúncia a
          qualquer outro, por mais privilegiado que seja — ressalvada, nas relações de consumo, a
          faculdade do consumidor de demandar no foro de seu domicílio.
        </p>
      </LegalSection>

      <LegalSection title="10. Contato">
        <p>
          Dúvidas sobre estes Termos:{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
