import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Pending } from "@/components/Pending";
import { firm } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como o site de Carolina Meirelles & Advogados trata dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
  path: "/privacidade",
});

/**
 * Draft prepared from the site's ACTUAL data processing (contact form only, no analytics,
 * no advertising cookies). Must be reviewed by the firm before publication.
 */
export default function PrivacidadePage() {
  return (
    <>
      <PageHero
        label="Privacidade"
        title={["Política de", "Privacidade."]}
        intro="Esta política descreve como este site trata dados pessoais, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais — LGPD)."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Privacidade", path: "/privacidade" },
        ]}
      />
      <section className="section section--paper legal" aria-label="Texto da política">
        <div className="container grid">
          <aside className="legal__aside">
            <p className="caption">Versão preliminar, sujeita à revisão do escritório.</p>
          </aside>
          <div className="prose legal__body">
            <h2>1. Quem é o controlador</h2>
            <p>
              O controlador dos dados pessoais tratados por meio deste site é {firm.name}, com atuação em {firm.city}/{firm.state}.
              CNPJ e endereço: <Pending />. Encarregado pelo tratamento de dados (DPO) e canal de contato: <Pending />.
            </p>

            <h2>2. Quais dados coletamos</h2>
            <p>Este site coleta apenas os dados que você decide informar no formulário de contato:</p>
            <ul>
              <li>nome e e-mail (obrigatórios);</li>
              <li>telefone, perfil e assunto (opcionais);</li>
              <li>o conteúdo da mensagem.</li>
            </ul>
            <p>
              Recomendamos não enviar documentos nem informações sensíveis no primeiro contato. Registros técnicos mínimos (como
              endereço IP e data de acesso) podem ser mantidos temporariamente pelo provedor de hospedagem para fins de segurança.
            </p>

            <h2>3. Para que usamos os dados</h2>
            <p>
              Os dados do formulário são utilizados exclusivamente para responder ao seu contato e, se for o caso, avaliar a
              possibilidade de atendimento. O tratamento se apoia no seu consentimento e na realização de procedimentos
              preliminares solicitados por você (art. 7º, incisos I e V, da LGPD).
            </p>

            <h2>4. Cookies e medição de audiência</h2>
            <p>
              Este site não utiliza cookies de publicidade nem ferramentas de análise de audiência. Caso isso venha a mudar, esta
              política será atualizada e, quando exigido, seu consentimento será solicitado previamente.
            </p>

            <h2>5. Compartilhamento</h2>
            <p>
              As mensagens são transmitidas ao escritório por meio de um provedor de envio de e-mails e o site é mantido por um
              provedor de hospedagem, que atuam como operadores. Os dados não são vendidos nem compartilhados para fins de
              marketing. Provedores utilizados: <Pending />.
            </p>

            <h2>6. Por quanto tempo</h2>
            <p>
              Os dados são mantidos pelo tempo necessário para responder ao contato e, se houver contratação, pelo período exigido
              pelas obrigações legais e profissionais aplicáveis. Prazo de retenção de mensagens sem contratação: <Pending />.
            </p>

            <h2>7. Seus direitos</h2>
            <p>Nos termos do art. 18 da LGPD, você pode solicitar, a qualquer momento:</p>
            <ul>
              <li>confirmação da existência de tratamento e acesso aos dados;</li>
              <li>correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>eliminação dos dados tratados com base no consentimento e revogação desse consentimento;</li>
              <li>informação sobre compartilhamento de dados.</li>
            </ul>
            <p>
              Os pedidos podem ser feitos pelos canais indicados na página de{" "}
              <Link href="/contato" className="inline-link">
                contato
              </Link>
              . Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
            </p>

            <h2>8. Segurança e sigilo</h2>
            <p>
              A comunicação com o site é protegida por conexão criptografada (HTTPS). As informações recebidas são tratadas com a
              reserva própria do sigilo profissional da advocacia.
            </p>

            <h2>9. Atualizações</h2>
            <p>Esta política pode ser atualizada para refletir mudanças no site ou na legislação. Data da última atualização: <Pending />.</p>
          </div>
        </div>
      </section>
    </>
  );
}
