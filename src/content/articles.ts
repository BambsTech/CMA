// Artigos informativos — rascunhos pendentes de revisão jurídica.
// Conteúdo de caráter geral, sem natureza de consulta ou parecer.

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  status: "draft";
  relatedPractice: string;
  body: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "due-diligence-imobiliaria-o-que-verificar",
    title: "Due diligence imobiliária: o que costuma ser verificado",
    category: "Due diligence",
    excerpt:
      "Uma visão geral da análise jurídica prévia de imóveis: matrícula, ônus, certidões, situação fiscal e condominial e aspectos urbanísticos.",
    metaDescription:
      "Entenda o que é due diligence imobiliária e o que costuma ser verificado: matrícula, ônus reais, certidões, débitos e aspectos urbanísticos.",
    image: "/assets/architecture/detail-floor-light.webp",
    imageAlt:
      "Imagem conceitual: luz quente e sombras longas sobre um piso de pedra.",
    status: "draft",
    relatedPractice: "consultoria-e-due-diligence-imobiliaria",
    body: [
      {
        type: "p",
        text: "A compra de um imóvel costuma envolver valores relevantes e compromissos de longo prazo. Ainda assim, não é raro que a decisão seja tomada com base apenas na visita, no preço e em uma cópia da matrícula. A due diligence imobiliária existe para preencher essa lacuna: trata-se de uma análise jurídica organizada, feita antes da assinatura, que procura identificar fatos capazes de afetar a validade, a eficácia ou a conveniência do negócio.",
      },
      {
        type: "p",
        text: "O nível de profundidade varia conforme a operação. A aquisição de um apartamento para moradia pede um roteiro diferente da compra de um terreno para incorporação ou de uma carteira de imóveis para investimento. Em todos os casos, porém, alguns pontos de verificação se repetem.",
      },
      { type: "h2", text: "A matrícula como ponto de partida" },
      {
        type: "p",
        text: "A matrícula é o documento que concentra a história jurídica do imóvel no cartório de registro de imóveis. Nela constam a descrição do bem, os proprietários ao longo do tempo e os atos que o afetaram. A leitura deve ser feita na certidão atualizada, de preferência de inteiro teor, e não em cópias antigas.",
      },
      {
        type: "p",
        text: "Nessa leitura, observa-se se quem se apresenta como vendedor é de fato o titular registrado, se a descrição do imóvel corresponde ao que existe no local e se a sequência de transmissões é contínua. Divergências de área, construções não averbadas e alterações de estado civil não registradas são achados frequentes e, em regra, podem ser tratados antes do fechamento.",
      },
      { type: "h2", text: "Ônus reais e outras restrições" },
      {
        type: "p",
        text: "O segundo eixo da análise são os ônus e gravames que recaem sobre o imóvel. Alguns impedem a venda livre; outros acompanham o bem mesmo depois da transferência. Entre os registros e averbações que merecem atenção estão:",
      },
      {
        type: "list",
        items: [
          "hipoteca e alienação fiduciária em garantia de financiamentos;",
          "penhoras, arrestos e indisponibilidades decorrentes de processos;",
          "usufruto, uso, habitação e servidões;",
          "cláusulas de inalienabilidade, impenhorabilidade e incomunicabilidade;",
          "averbações premonitórias e notícias de ações que envolvam o imóvel.",
        ],
      },
      {
        type: "p",
        text: "Desde a Lei nº 13.097/2015, a legislação reforçou a ideia de que as informações relevantes sobre o imóvel devem constar da matrícula. Isso não elimina, contudo, a utilidade de examinar a situação pessoal do vendedor, pois há riscos que nascem fora do registro.",
      },
      { type: "h2", text: "Certidões do imóvel e das partes" },
      {
        type: "p",
        text: "Além da certidão de ônus reais, a due diligence costuma incluir certidões relativas ao vendedor e, conforme o caso, a antecessores recentes. A finalidade é verificar se existem ações judiciais, execuções ou dívidas que possam comprometer a operação, por exemplo em hipóteses de fraude à execução ou de fraude contra credores. Em geral, são examinadas:",
      },
      {
        type: "list",
        items: [
          "certidões dos distribuidores cíveis da Justiça Estadual e da Justiça Federal;",
          "certidão de débitos trabalhistas e, quando pertinente, certidões da Justiça do Trabalho;",
          "certidões de protesto de títulos;",
          "certidões de débitos tributários federais, estaduais ou distritais e municipais;",
          "documentos societários e poderes de representação, quando o vendedor for pessoa jurídica.",
        ],
      },
      {
        type: "p",
        text: "A existência de um processo não significa, por si só, que o negócio deva ser abandonado. O que importa é entender a natureza da ação, o valor envolvido e a capacidade patrimonial do vendedor, para então avaliar se são necessárias garantias adicionais ou ajustes no contrato.",
      },
      { type: "h2", text: "Situação fiscal, condominial, urbanística e ambiental" },
      {
        type: "p",
        text: "Alguns débitos acompanham o imóvel, independentemente de quem seja o proprietário. É o caso, em regra, dos tributos incidentes sobre o bem e das contribuições condominiais. Por isso, verifica-se a regularidade do IPTU e de taxas vinculadas, bem como a declaração de quitação emitida pela administração do condomínio.",
      },
      {
        type: "p",
        text: "Em linhas gerais, também convém confirmar se o uso pretendido é compatível com as normas urbanísticas aplicáveis e se há restrições ambientais conhecidas sobre a área. Em terrenos destinados a empreendimentos, esse exame tende a ser mais detalhado e costuma contar com o apoio de profissionais técnicos. No Distrito Federal, questões fundiárias locais também podem exigir atenção específica.",
      },
      { type: "h2", text: "Do diagnóstico às providências" },
      {
        type: "p",
        text: "O resultado da due diligence não é apenas uma lista de documentos. Ele deve indicar quais pontos são impeditivos, quais podem ser resolvidos antes da assinatura e quais podem ser tratados por meio de cláusulas contratuais, como retenção de parte do preço, condições suspensivas ou obrigações de regularização assumidas pelo vendedor. Essa leitura permite que comprador e vendedor negociem com mais clareza e que a escritura e o registro ocorram com menos surpresas.",
      },
      {
        type: "p",
        text: "Este texto tem caráter exclusivamente informativo e não substitui orientação jurídica. Cada operação imobiliária apresenta características próprias, e a definição do que deve ser verificado depende da análise específica dos documentos e das circunstâncias do caso.",
      },
    ],
  },
  {
    slug: "regularizacao-de-imoveis-caminhos-possiveis",
    title: "Regularização de imóveis: caminhos possíveis",
    category: "Regularização",
    excerpt:
      "Por que a situação registral do imóvel importa e quais procedimentos costumam ser usados para regularizá-lo, pela via judicial ou extrajudicial.",
    metaDescription:
      "Conheça caminhos para regularizar imóveis: escritura e registro, retificação, usucapião, adjudicação compulsória, Reurb e averbação de construção.",
    image: "/assets/architecture/detail-horizon.webp",
    imageAlt:
      "Imagem conceitual: colunas de concreto emoldurando o horizonte ao pôr do sol.",
    status: "draft",
    relatedPractice: "regularizacao-de-imoveis",
    body: [
      {
        type: "p",
        text: "Muitos imóveis são ocupados, alugados e até vendidos por anos sem que sua situação no cartório corresponda à realidade. Há casas construídas sobre terrenos cuja matrícula ainda descreve um lote vazio, apartamentos quitados que nunca tiveram escritura e propriedades transmitidas por herança sem o registro das etapas anteriores. Enquanto nada muda, a irregularidade pode passar despercebida. Ela costuma aparecer quando surge a necessidade de vender, financiar, dar o bem em garantia ou partilhá-lo.",
      },
      { type: "h2", text: "Por que a regularidade registral importa" },
      {
        type: "p",
        text: "No direito brasileiro, a propriedade de bens imóveis se transmite com o registro do título no cartório de registro de imóveis, conforme o Código Civil. Quem tem apenas um contrato particular, ainda que com o preço integralmente pago, possui um direito em relação ao vendedor, mas ainda não é proprietário perante terceiros. Essa diferença tem efeitos práticos:",
      },
      {
        type: "list",
        items: [
          "instituições financeiras, em geral, não aceitam como garantia imóvel sem registro regular;",
          "compradores tendem a evitar imóveis com documentação incompleta ou a negociar descontos;",
          "o imóvel pode ser alcançado por dívidas do titular registrado;",
          "inventários e partilhas se tornam mais longos e onerosos;",
          "construções não averbadas podem dificultar a venda e o seguro do bem.",
        ],
      },
      { type: "h2", text: "Escritura, registro e retificação" },
      {
        type: "p",
        text: "O caminho mais direto, quando as partes estão disponíveis e de acordo, é formalizar a transmissão por escritura pública e levá-la a registro. Em transmissões antigas, pode ser necessário reconstruir a cadeia de títulos, registrando operações anteriores que ficaram pendentes, em respeito ao princípio da continuidade registral.",
      },
      {
        type: "p",
        text: "Quando o problema está na descrição do imóvel, como área, medidas ou confrontações divergentes, a Lei de Registros Públicos prevê procedimentos de retificação. Dependendo do caso, a retificação pode ser feita diretamente no cartório, com levantamento técnico e anuência dos confrontantes, ou exigir a via judicial.",
      },
      { type: "h2", text: "Usucapião e adjudicação compulsória" },
      {
        type: "p",
        text: "A usucapião permite adquirir a propriedade pela posse prolongada, contínua e sem oposição, desde que preenchidos os requisitos de uma das modalidades previstas em lei. Além da ação judicial, a Lei de Registros Públicos admite a usucapião extrajudicial, processada perante o registro de imóveis, com base em ata notarial, planta, memorial descritivo e demais documentos exigidos. A escolha entre as duas vias depende, entre outros fatores, da documentação disponível e da existência de oposição.",
      },
      {
        type: "p",
        text: "A adjudicação compulsória é o instrumento adequado quando o comprador cumpriu suas obrigações, mas o vendedor não outorga a escritura, seja por recusa, desaparecimento ou falecimento. Tradicionalmente judicial, ela passou a contar com uma alternativa extrajudicial com a Lei nº 14.382/2022, que incluiu o procedimento na Lei de Registros Públicos. Os requisitos e documentos variam conforme a situação concreta.",
      },
      { type: "h2", text: "Reurb e averbação de construção" },
      {
        type: "p",
        text: "Em núcleos urbanos informais, a regularização individual nem sempre é viável. Para essas situações, a Lei nº 13.465/2017 instituiu a Regularização Fundiária Urbana, a Reurb, que reúne medidas jurídicas, urbanísticas, ambientais e sociais. Em linhas gerais, a Reurb pode ser de interesse social ou de interesse específico, e sua condução envolve o poder público municipal ou, no caso de Brasília, o Distrito Federal.",
      },
      {
        type: "p",
        text: "Outra irregularidade frequente é a construção que não consta da matrícula. A averbação da edificação costuma exigir a carta de habite-se ou documento equivalente e a comprovação da regularidade da obra perante os órgãos competentes. Ampliações feitas sem aprovação podem demandar, antes, a regularização perante a administração.",
      },
      { type: "h2", text: "Como escolher o caminho" },
      {
        type: "p",
        text: "Não existe um procedimento único para todos os casos. A definição depende da origem da posse ou da propriedade, dos documentos existentes, da disponibilidade das partes envolvidas e do objetivo de quem busca a regularização. Um diagnóstico inicial bem feito costuma evitar escolhas que se mostram inadequadas no meio do caminho, como iniciar uma usucapião quando uma adjudicação compulsória seria suficiente, ou o contrário.",
      },
      {
        type: "list",
        items: [
          "reunir matrícula atualizada, contratos, recibos e comprovantes de pagamento;",
          "verificar a situação cadastral e tributária do imóvel;",
          "identificar quem consta como titular e se essa pessoa pode ser localizada;",
          "avaliar se há construção ou área a ser corrigida no registro.",
        ],
      },
      {
        type: "p",
        text: "Este texto tem finalidade informativa e apresenta o tema de forma geral. Cada imóvel tem um histórico próprio, e a escolha do procedimento adequado depende da análise específica dos documentos e dos fatos de cada situação.",
      },
    ],
  },
  {
    slug: "riscos-juridicos-em-transacoes-imobiliarias",
    title: "Riscos jurídicos em transações imobiliárias",
    category: "Transações",
    excerpt:
      "Os principais pontos de atenção na compra e venda de imóveis: dívidas do vendedor, vícios documentais, ônus ocultos, compra na planta e registro.",
    metaDescription:
      "Conheça os principais riscos jurídicos na compra e venda de imóveis, como dívidas do vendedor, ônus não identificados, falhas documentais e registro.",
    image: "/assets/architecture/corridor.webp",
    imageAlt:
      "Imagem conceitual: longa galeria de concreto com sombras suaves.",
    status: "draft",
    relatedPractice: "elaboracao-e-revisao-de-contratos",
    body: [
      {
        type: "p",
        text: "A compra e venda de um imóvel envolve mais do que o acordo sobre preço e prazo. Entre a negociação e o registro, há uma série de etapas em que problemas podem surgir, alguns visíveis desde o início e outros que só aparecem depois. Conhecer os riscos mais comuns ajuda comprador e vendedor a fazer as perguntas certas e a organizar a operação com mais segurança.",
      },
      { type: "h2", text: "Dívidas do vendedor e fraude à execução" },
      {
        type: "p",
        text: "Um dos riscos mais relevantes para o comprador está na situação patrimonial do vendedor. Se o vendedor responde a processos capazes de levá-lo à insolvência, a venda pode, em determinadas circunstâncias, ser considerada ineficaz em relação aos credores. O Código de Processo Civil disciplina as hipóteses de fraude à execução, e o Código Civil trata da fraude contra credores.",
      },
      {
        type: "p",
        text: "A legislação valoriza as informações que constam da matrícula, e a boa-fé do adquirente é considerada na análise desses casos. Mesmo assim, a consulta a certidões judiciais e fiscais do vendedor continua sendo uma medida prudente, pois permite identificar riscos antes da assinatura e negociar garantias adequadas.",
      },
      { type: "h2", text: "Vícios documentais e ônus não identificados" },
      {
        type: "p",
        text: "Outra fonte frequente de problemas é a documentação. Uma procuração vencida ou com poderes insuficientes, a falta de anuência do cônjuge quando exigida, divergências entre a área registrada e a real ou construções não averbadas podem atrasar ou impedir o registro. Entre os pontos que costumam merecer atenção estão:",
      },
      {
        type: "list",
        items: [
          "titularidade e estado civil do vendedor, conforme a matrícula;",
          "poderes de quem assina em nome de pessoa jurídica ou por procuração;",
          "hipotecas, alienações fiduciárias, penhoras e indisponibilidades;",
          "usufrutos, servidões e cláusulas restritivas;",
          "débitos de tributos e de condomínio vinculados ao imóvel.",
        ],
      },
      {
        type: "p",
        text: "Ônus que não foram identificados antes do negócio podem significar, para o comprador, a necessidade de quitar dívidas alheias ou de enfrentar disputas sobre o bem. Por isso, a leitura atenta da certidão atualizada da matrícula é um passo que não convém dispensar.",
      },
      { type: "h2", text: "Compra na planta e distrato" },
      {
        type: "p",
        text: "Na aquisição de unidades em construção, o comprador assume riscos ligados ao próprio empreendimento: prazo de entrega, conformidade com o memorial descritivo e capacidade da incorporadora de concluir a obra. A Lei de Incorporações estabelece deveres de informação e exige o registro da incorporação antes da comercialização das unidades. O regime do patrimônio de afetação, quando adotado, separa o patrimônio do empreendimento do restante do patrimônio da incorporadora.",
      },
      {
        type: "p",
        text: "Em caso de desistência ou inadimplemento do comprador, a Lei nº 13.786/2018, conhecida como Lei do Distrato, passou a disciplinar, em linhas gerais, os valores que podem ser retidos e os prazos de restituição, com regras diferentes conforme o empreendimento esteja ou não submetido ao patrimônio de afetação. Conhecer essas regras antes de assinar ajuda a dimensionar as consequências de uma eventual desistência.",
      },
      { type: "h2", text: "Pagamento, posse e propriedade" },
      {
        type: "p",
        text: "A forma de pagamento merece cuidado especial. Pagamentos integrais antes da escritura, sem garantia ou sem condições claras, expõem o comprador ao risco de não receber o imóvel. Do lado do vendedor, a entrega da posse antes do recebimento do preço também gera exposição. Cláusulas que vinculam cada parcela a um evento verificável, como a baixa de um ônus ou a assinatura da escritura, tendem a equilibrar esses riscos.",
      },
      {
        type: "p",
        text: "Também é importante distinguir posse de propriedade. Receber as chaves e ocupar o imóvel não torna o comprador proprietário. Pelo Código Civil, a propriedade imobiliária se transfere com o registro do título no cartório de registro de imóveis. Daí a expressão conhecida no meio jurídico: quem não registra não é dono. Enquanto o registro não ocorre, o imóvel continua, perante terceiros, em nome do vendedor e sujeito às suas dívidas.",
      },
      {
        type: "list",
        items: [
          "prever prazo para a lavratura da escritura e para o registro;",
          "definir quem arca com tributos, emolumentos e custas;",
          "estabelecer o momento da entrega da posse e a responsabilidade por despesas a partir dela;",
          "vincular pagamentos relevantes a etapas verificáveis.",
        ],
      },
      {
        type: "p",
        text: "As informações deste artigo são gerais e não constituem orientação jurídica para um caso concreto. Cada transação envolve partes, imóveis e condições próprias, e a avaliação dos riscos depende da análise específica dos documentos e das circunstâncias do negócio.",
      },
    ],
  },
  {
    slug: "contratos-imobiliarios-pontos-de-atencao",
    title: "Contratos imobiliários: pontos de atenção",
    category: "Contratos",
    excerpt:
      "Aspectos que merecem leitura cuidadosa em contratos imobiliários: promessa de compra e venda, locação comercial, garantias, multas e condições.",
    metaDescription:
      "Pontos de atenção em contratos imobiliários: compromisso de compra e venda, locação comercial, garantias, multas, condições e alienação fiduciária.",
    image: "/assets/architecture/pavilion.webp",
    imageAlt:
      "Imagem conceitual: pavilhão de concreto com fachada de vidro na hora dourada.",
    status: "draft",
    relatedPractice: "elaboracao-e-revisao-de-contratos",
    body: [
      {
        type: "p",
        text: "O contrato é o documento que traduz, em obrigações concretas, aquilo que as partes negociaram. Em operações imobiliárias, em que os valores são relevantes e a execução pode se estender por meses ou anos, a redação das cláusulas tem peso considerável. Este artigo reúne alguns pontos que costumam merecer leitura cuidadosa antes da assinatura.",
      },
      { type: "h2", text: "Compromisso de compra e venda" },
      {
        type: "p",
        text: "O compromisso, ou promessa, de compra e venda é utilizado quando a transferência definitiva depende de etapas futuras, como o pagamento parcelado do preço, a obtenção de financiamento ou a regularização de documentos. Ele estabelece as condições do negócio e a obrigação de outorgar a escritura definitiva quando essas condições forem cumpridas.",
      },
      {
        type: "p",
        text: "Alguns elementos merecem atenção especial nesse tipo de instrumento:",
      },
      {
        type: "list",
        items: [
          "identificação precisa do imóvel, com número da matrícula e do cartório;",
          "preço, forma de pagamento, índices de correção e datas de vencimento;",
          "prazo e condições para a lavratura da escritura definitiva;",
          "momento da entrega da posse e responsabilidade por tributos e despesas;",
          "cláusula de irretratabilidade e possibilidade de registro da promessa.",
        ],
      },
      {
        type: "p",
        text: "O registro do compromisso na matrícula confere ao promitente comprador direito real à aquisição, conforme o Código Civil, o que reforça sua posição perante terceiros.",
      },
      {
        type: "p",
        text: "Quando o vendedor deixa de outorgar a escritura após a quitação, o comprador pode recorrer à adjudicação compulsória, hoje disponível também pela via extrajudicial. Por isso, é útil que o contrato registre com precisão o pagamento de cada parcela e preveja a entrega dos documentos necessários à transferência, evitando dúvidas no momento da formalização.",
      },
      { type: "h2", text: "Locação comercial e ação renovatória" },
      {
        type: "p",
        text: "Nas locações não residenciais, o contrato costuma envolver investimentos do locatário no imóvel e a formação de um ponto comercial. A Lei do Inquilinato prevê, em linhas gerais, o direito à renovação do contrato por meio da ação renovatória, desde que atendidos requisitos legais relativos à forma escrita, ao prazo do contrato e ao tempo de exploração da mesma atividade, e que a ação seja proposta dentro do prazo previsto em lei.",
      },
      {
        type: "p",
        text: "Para o locador, é relevante prever com clareza reajustes, responsabilidade por benfeitorias e obras, destinação do imóvel e regras para cessão ou sublocação. Para o locatário, convém verificar se o contrato preserva as condições necessárias à eventual renovação. Modalidades como a construção sob medida, conhecida como built to suit, têm regras próprias na mesma lei.",
      },
      { type: "h2", text: "Garantias, multas e condições" },
      {
        type: "p",
        text: "As garantias dão segurança ao cumprimento das obrigações. Em locações, a Lei do Inquilinato admite modalidades como caução, fiança e seguro de fiança locatícia, e veda a exigência de mais de uma delas no mesmo contrato. Em compras e vendas e financiamentos, a garantia mais utilizada é a alienação fiduciária, disciplinada pela Lei nº 9.514/1997, na qual a propriedade fica vinculada ao credor até o pagamento da dívida, com procedimento próprio em caso de inadimplemento.",
      },
      {
        type: "p",
        text: "As multas contratuais devem ser proporcionais e coerentes com a obrigação a que se referem. O Código Civil permite a redução da cláusula penal quando manifestamente excessiva ou quando a obrigação tiver sido cumprida em parte. Convém distinguir a multa pelo atraso da multa por rescisão e verificar se há previsão de juros e correção.",
      },
      {
        type: "p",
        text: "Já as condições suspensivas subordinam os efeitos do contrato a um evento futuro e incerto, como a aprovação de crédito, a liberação de uma licença ou a baixa de um ônus. Elas são úteis para operações que dependem de fatores externos, desde que o evento, o prazo e as consequências de sua não ocorrência estejam bem definidos.",
      },
      { type: "h2", text: "Foro, mediação e solução de conflitos" },
      {
        type: "p",
        text: "Por fim, vale observar as cláusulas que tratam de como eventuais divergências serão resolvidas. O contrato pode eleger o foro competente, prever etapas prévias de negociação ou mediação, nos termos da Lei nº 13.140/2015, e, em determinados casos, adotar a arbitragem, regulada pela Lei nº 9.307/1996. Em relações de consumo, como na compra de unidades de incorporadoras, essas cláusulas devem observar as limitações do Código de Defesa do Consumidor.",
      },
      {
        type: "p",
        text: "Este conteúdo é informativo e geral, sem caráter de orientação para situações específicas. Cada contrato reflete um negócio próprio, e a adequação de suas cláusulas depende da análise individual dos documentos, das partes e dos objetivos envolvidos.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function readingMinutes(a: Article): number {
  const text = a.body
    .map((b) => (b.type === "list" ? b.items.join(" ") : b.text))
    .join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
