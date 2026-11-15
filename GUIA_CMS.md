# Guia de atualização do site — CMA Advogados

Este guia explica como atualizar o site sem depender da agência: artigos, equipe, áreas de atuação e dados de contato.

## Como funciona

- O painel de conteúdo fica em **`/admin`** (por exemplo, `https://cma-tawny-one.vercel.app/admin`). Ele não aparece no menu do site nem nos buscadores.
- O painel é o **Sveltia CMS**, gratuito e de código aberto. O conteúdo fica guardado no próprio repositório do site (pasta `content/`), sem banco de dados e sem mensalidade.
- Cada vez que você clica em **Salvar/Publicar**, o painel registra a alteração no GitHub e a Vercel publica a nova versão do site em cerca de 1 a 2 minutos.
- O histórico de todas as versões fica guardado no GitHub. Qualquer alteração pode ser desfeita.

## Primeiro acesso

O painel entra com uma conta do GitHub que tenha permissão de escrita no repositório `BambsTech/CMA`.

**Opção simples (recomendada para começar): token de acesso**

1. No GitHub, abra *Settings → Developer settings → Personal access tokens → Fine-grained tokens* e clique em *Generate new token*.
2. Em *Repository access*, escolha somente o repositório `BambsTech/CMA`.
3. Em *Permissions → Contents*, marque **Read and write**.
4. Copie o token gerado. Ele aparece uma única vez.
5. Em `/admin`, escolha **“Entrar com token de acesso”** e cole o token.

O token fica salvo apenas no seu navegador. Para revogá-lo, apague-o no GitHub.

**Opção com botão “Entrar com GitHub”**

Exige um pequeno serviço de autenticação (OAuth), configurado uma única vez pela agência; o projeto Sveltia CMS Authenticator é gratuito. Depois de configurado, basta acrescentar o endereço dele em `public/admin/config.yml` (`backend.base_url`).

## O que pode ser editado

| Seção do painel | O que muda no site |
|---|---|
| **Artigos** | Página *Conhecimento* e a seção de publicações da página inicial |
| **Equipe** | Página *Equipe*, perfis individuais e a seção da equipe na página inicial |
| **Áreas de atuação** | Página *Áreas de atuação*, as páginas de cada área e o índice da página inicial |
| **Institucional → Contato e identificação** | Telefone, e-mail, endereço, WhatsApp, horário, redes sociais e registro na OAB, em todo o site |
| **Institucional → O escritório** | Assinatura, introdução, abordagem, valores, públicos, modelo de atendimento e história |

## Regras de publicação (importante)

O site só exibe o que está explicitamente liberado:

- **Artigos:** aparecem somente com **Status = Publicado** *e* **Data de publicação** preenchida. “Rascunho” e “Em revisão jurídica” nunca aparecem no site.
- **Equipe e Áreas:** aparecem somente com **Publicado** marcado. A área *Tribunais Superiores* está pronta, mas desmarcada até a confirmação da experiência da equipe.
- **História do escritório:** aparece somente com **Publicado** marcado.
- **Dados de contato vazios** aparecem no site como “a confirmar”. Preencha somente informações confirmadas.

Fluxo recomendado para artigos: *Rascunho* → *Em revisão jurídica* (revisão pelo advogado responsável) → *Publicado* (com a data real).

## Artigos: passo a passo

1. Em **Artigos**, clique em **Novo artigo**.
2. Preencha o **endereço (URL)** com letras minúsculas e hífens, por exemplo `holding-patrimonial`.
3. Escolha a **categoria**, o **autor** (precisa existir em Equipe), escreva o **resumo** (duas ou três linhas) e o **texto**.
4. No texto, use o botão de títulos para intertítulos e evite colar texto direto do Word com formatação; se colar, revise a formatação.
5. Mantenha o status como **Rascunho** até a revisão jurídica.
6. Para publicar: status **Publicado** + **data de publicação** → **Salvar**.

## Imagens

- Envie imagens pelo próprio campo de imagem. Elas ficam na pasta `public/uploads`.
- Use fotografias autorais e autorizadas (retratos da equipe, arquitetura, ambientes). Evite imagens de banco com martelos, balanças e tribunais genéricos.
- Retratos: formato vertical (4:5), boa resolução (mínimo 1.600 px de altura). Preencha sempre a descrição da imagem (acessibilidade).
- Não publique imagens de clientes, de processos ou de documentos.

## Cuidados de conteúdo (OAB e LGPD)

O site deve seguir o Provimento 205/2021 do Conselho Federal da OAB, as regras de sigilo profissional e a LGPD:

- não prometer resultados nem usar linguagem de captação (“garantimos”, “o melhor”, “ganhe sua causa”);
- não citar clientes, casos ou valores sem autorização expressa;
- não publicar credenciais, títulos ou especializações que não possam ser comprovados;
- análises de decisões devem citar decisões reais, com número do processo e tribunal, revisadas antes da publicação;
- todo texto técnico deve ser revisado pelo advogado responsável antes de ser publicado.

## Se algo der errado

- **A alteração não apareceu:** aguarde 2 minutos e recarregue a página. Confira se o item está publicado (veja as regras acima).
- **Erro ao salvar:** verifique a conexão e se o token ainda é válido.
- **Desfazer uma alteração:** no GitHub, o histórico de commits do repositório guarda todas as versões; a agência pode restaurar qualquer uma delas.
