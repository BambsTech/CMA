// Conteúdo das áreas de atuação — briefing estratégico de novembro de 2026.
// Rascunho sujeito a revisão jurídica.
// Observância do Provimento nº 205/2021 do Conselho Federal da OAB:
// texto informativo, sem promessa de resultado e sem caráter mercantil.

export type AudienceKey = "empresas" | "investidores" | "proprietarios";

export type Practice = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  imageAlt: string;
  lead: string;
  scope: { title: string; text: string }[];
  situations: string[];
  approach: { title: string; text: string }[];
  legalBasis: string[];
  audiences: AudienceKey[];
  related: string[];
  /** Only published areas are rendered, listed or linked (see `practices` below). */
  published: boolean;
};

const allPractices: Practice[] = [
  {
    slug: "direito-imobiliario",
    number: "01",
    title: "Direito Imobiliário",
    shortTitle: "Imobiliário",
    summary:
      "Aquisições, alienações, incorporações, contratos, due diligence, locações, condomínios e operações imobiliárias complexas.",
    metaDescription:
      "Direito Imobiliário em Brasília: aquisições e alienações, incorporações, contratos, due diligence, locações, condomínios e operações imobiliárias complexas.",
    keywords: ["direito imobiliário em Brasília", "due diligence imobiliária", "contratos imobiliários", "incorporação imobiliária"],
    image: "/assets/office/porta.webp",
    imageAlt: "Porta pivotante de madeira aberta para o jardim do escritório.",
    lead:
      "Operações imobiliárias envolvem documentos, registros, contratos e, com frequência, questões societárias, sucessórias e tributárias. A CMA estrutura e acompanha essas operações da análise prévia à formalização, com atenção aos riscos e aos objetivos de cada cliente.",
    scope: [
      { title: "Aquisições e alienações", text: "Estruturação jurídica da compra e venda de imóveis, com análise de riscos e acompanhamento até o registro." },
      { title: "Due diligence", text: "Análise da matrícula, da cadeia dominial, de ônus, certidões e da situação fiscal do imóvel e das partes antes da decisão." },
      { title: "Contratos imobiliários", text: "Elaboração, revisão e negociação de contratos de compra e venda, promessa, permuta e garantias." },
      { title: "Incorporações imobiliárias", text: "Apoio jurídico a incorporações, do memorial e do registro à relação com os adquirentes." },
      { title: "Locações e condomínios", text: "Contratos de locação residencial e comercial, convenções, regimentos e questões condominiais." },
      { title: "Operações complexas", text: "Operações com múltiplas partes, garantias ou etapas, estruturadas de forma integrada com as demais áreas." },
    ],
    situations: [
      "Aquisição de imóvel de alto valor ou de terreno destinado a empreendimento.",
      "Investimento em imóveis com histórico documental extenso.",
      "Lançamento de incorporação ou de empreendimento em condomínio.",
      "Negociação de locação comercial de longo prazo.",
      "Operação que envolve permuta, dação em pagamento ou integralização de capital com imóveis.",
    ],
    approach: [
      { title: "Entendimento da operação", text: "Compreensão do objetivo do negócio, do cronograma e das partes envolvidas." },
      { title: "Análise", text: "Levantamento documental e diagnóstico dos pontos de atenção." },
      { title: "Estruturação", text: "Definição da forma jurídica, das garantias e das cláusulas adequadas." },
      { title: "Formalização", text: "Acompanhamento da assinatura, da escritura e do registro." },
    ],
    legalBasis: [
      "Código Civil (Lei nº 10.406/2002)",
      "Lei de Registros Públicos (Lei nº 6.015/1973)",
      "Lei nº 4.591/1964 (condomínios e incorporações)",
      "Lei do Inquilinato (Lei nº 8.245/1991)",
      "Lei nº 13.097/2015 (concentração de atos na matrícula)",
    ],
    audiences: ["empresas", "investidores", "proprietarios"],
    related: ["direito-fundiario", "direito-tributario"],
    published: true,
  },
  {
    slug: "direito-fundiario",
    number: "02",
    title: "Direito Fundiário",
    shortTitle: "Fundiário",
    summary: "Regularização urbana e rural, questões registrais, dominiais e possessórias, parcelamento do solo e titulação.",
    metaDescription:
      "Direito Fundiário: regularização urbana e rural, questões registrais, dominiais e possessórias, parcelamento do solo e titulação.",
    keywords: ["direito fundiário", "regularização fundiária", "regularização de imóveis", "parcelamento do solo"],
    image: "/assets/office/fachada-arvore.webp",
    imageAlt: "Fachada de tijolos do escritório entre árvores e jardim.",
    lead:
      "Questões fundiárias exigem leitura cuidadosa da cadeia dominial, dos registros e da situação de fato de cada área. A CMA atua na regularização de imóveis urbanos e rurais, na solução de pendências registrais e possessórias e na titulação, em diálogo com cartórios e órgãos públicos.",
    scope: [
      { title: "Regularização urbana e rural", text: "Diagnóstico e condução dos procedimentos de regularização de imóveis e áreas." },
      { title: "Questões registrais", text: "Registros, averbações, retificações e respostas a exigências do registro de imóveis." },
      { title: "Questões dominiais", text: "Análise da cadeia de titularidade e solução de inconsistências dominiais." },
      { title: "Questões possessórias", text: "Orientação e atuação em situações que envolvem a posse e sua proteção." },
      { title: "Parcelamento do solo", text: "Aspectos jurídicos de loteamentos e desmembramentos." },
      { title: "Titulação", text: "Procedimentos para a obtenção do título de propriedade." },
    ],
    situations: [
      "Imóvel sem matrícula regular ou com descrição divergente da realidade.",
      "Área ocupada há anos sem título de propriedade.",
      "Exigências do cartório que impedem o registro de uma escritura.",
      "Projeto de loteamento ou desmembramento.",
      "Divergências de limites ou sobreposição de áreas.",
    ],
    approach: [
      { title: "Diagnóstico", text: "Levantamento da situação documental, registral e de fato." },
      { title: "Estratégia", text: "Definição do procedimento adequado, judicial ou extrajudicial." },
      { title: "Condução", text: "Acompanhamento junto a cartórios, órgãos públicos e, se necessário, ao Judiciário." },
      { title: "Titulação", text: "Conclusão com o registro e a regularidade do título." },
    ],
    legalBasis: [
      "Lei de Registros Públicos (Lei nº 6.015/1973)",
      "Lei nº 13.465/2017 (regularização fundiária urbana e rural)",
      "Lei nº 6.766/1979 (parcelamento do solo urbano)",
      "Código Civil (Lei nº 10.406/2002)",
      "Código de Processo Civil (Lei nº 13.105/2015)",
    ],
    audiences: ["proprietarios", "empresas", "investidores"],
    related: ["direito-imobiliario", "sucessorio-patrimonial"],
    published: true,
  },
  {
    slug: "sucessorio-patrimonial",
    number: "03",
    title: "Direito Sucessório e Patrimonial",
    shortTitle: "Sucessório e Patrimonial",
    summary: "Inventários, partilhas, testamentos, doações, sucessão empresarial, holdings e governança familiar.",
    metaDescription:
      "Direito Sucessório e Patrimonial: inventários, partilhas, testamentos, doações, sucessão empresarial, holdings, governança familiar e planejamento patrimonial.",
    keywords: ["planejamento sucessório", "inventário", "holding patrimonial", "governança familiar"],
    image: "/assets/office/planta.webp",
    imageAlt: "Planta em vaso diante de parede de tijolos e viga de madeira, com luz e sombra.",
    lead:
      "Organizar o patrimônio e a sucessão envolve decisões familiares, societárias e tributárias que se influenciam mutuamente. A CMA atua em inventários e partilhas, em instrumentos de planejamento como testamentos e doações, na sucessão de empresas familiares e na estruturação de holdings e de regras de governança.",
    scope: [
      { title: "Inventários e partilhas", text: "Condução de inventários judiciais e extrajudiciais e das respectivas partilhas." },
      { title: "Testamentos e doações", text: "Orientação na elaboração de testamentos e na estruturação de doações, com atenção a seus efeitos." },
      { title: "Sucessão empresarial", text: "Planejamento da transição na gestão e na titularidade de empresas familiares." },
      { title: "Holdings", text: "Avaliação e estruturação de holdings patrimoniais, com seus objetivos e limites." },
      { title: "Governança familiar", text: "Acordos e regras que organizam a relação da família com o patrimônio e os negócios." },
      { title: "Planejamento patrimonial", text: "Organização do patrimônio de acordo com objetivos definidos pela família." },
    ],
    situations: [
      "Família que deseja organizar o patrimônio e a sucessão com antecedência.",
      "Inventário com imóveis em diferentes situações documentais.",
      "Empresa familiar que se prepara para a transição entre gerações.",
      "Avaliação da conveniência de uma holding patrimonial.",
      "Doação de bens a herdeiros com cláusulas de proteção.",
    ],
    approach: [
      { title: "Escuta", text: "Compreensão da família, do patrimônio e dos objetivos de cada pessoa envolvida." },
      { title: "Diagnóstico", text: "Levantamento dos bens, das estruturas existentes e de seus efeitos sucessórios e tributários." },
      { title: "Proposta", text: "Apresentação das alternativas, com seus custos, riscos e limites." },
      { title: "Implementação", text: "Formalização dos instrumentos e acompanhamento ao longo do tempo." },
    ],
    legalBasis: [
      "Código Civil (Lei nº 10.406/2002), Livro V — Direito das Sucessões",
      "Código de Processo Civil (Lei nº 13.105/2015)",
      "Lei nº 11.441/2007 (inventário e partilha extrajudiciais)",
      "Constituição Federal, art. 155, I (ITCMD)",
    ],
    audiences: ["investidores", "empresas", "proprietarios"],
    related: ["direito-tributario", "direito-imobiliario"],
    published: true,
  },
  {
    slug: "direito-tributario",
    number: "04",
    title: "Direito Tributário",
    shortTitle: "Tributário",
    summary: "Planejamento tributário lícito, estruturação e reorganização patrimonial e aspectos tributários de operações imobiliárias.",
    metaDescription:
      "Direito Tributário patrimonial e imobiliário: planejamento tributário lícito, estruturação e reorganização patrimonial e tributação de operações imobiliárias.",
    keywords: ["planejamento tributário", "tributação imobiliária", "estruturação patrimonial", "ITBI ITCMD"],
    image: "/assets/office/fachada.webp",
    imageAlt: "Fachada de tijolos e madeira do escritório sob o beiral de concreto.",
    lead:
      "A atuação tributária da CMA acompanha o patrimônio e as operações imobiliárias: o planejamento tributário lícito, a estruturação e a reorganização patrimonial e a análise dos efeitos fiscais de cada operação antes de sua realização.",
    scope: [
      { title: "Planejamento tributário lícito", text: "Análise de alternativas legais para a organização de operações e estruturas." },
      { title: "Estruturação patrimonial", text: "Avaliação dos efeitos tributários na constituição de estruturas patrimoniais." },
      { title: "Reorganização patrimonial", text: "Aspectos tributários de reorganizações societárias e patrimoniais." },
      { title: "Operações imobiliárias", text: "Tributos incidentes sobre aquisições, alienações, incorporações e permutas." },
    ],
    situations: [
      "Constituição de holding ou reorganização de participações.",
      "Venda, permuta ou incorporação de imóveis.",
      "Doações e transmissões em vida dentro do planejamento sucessório.",
      "Revisão de estruturas patrimoniais existentes.",
    ],
    approach: [
      { title: "Mapeamento", text: "Levantamento das operações, das estruturas e dos tributos envolvidos." },
      { title: "Análise", text: "Comparação das alternativas legais disponíveis e de seus efeitos." },
      { title: "Recomendação", text: "Indicação do caminho adequado, com seus fundamentos e riscos." },
      { title: "Acompanhamento", text: "Apoio na implementação e nas obrigações decorrentes." },
    ],
    legalBasis: [
      "Código Tributário Nacional (Lei nº 5.172/1966)",
      "Constituição Federal, arts. 155 e 156 (ITCMD e ITBI)",
      "Código Civil (Lei nº 10.406/2002)",
    ],
    audiences: ["empresas", "investidores", "proprietarios"],
    related: ["sucessorio-patrimonial", "direito-imobiliario"],
    published: true,
  },
  {
    // NÃO PUBLICAR até a confirmação da experiência efetiva dos profissionais perante o STJ e o STF
    // e a aprovação do texto (briefing de novembro de 2026, item 03).
    slug: "tribunais-superiores",
    number: "05",
    title: "Tribunais Superiores",
    shortTitle: "Tribunais Superiores",
    summary: "Recursos e contencioso estratégico perante o STJ e o STF.",
    metaDescription: "Recursos e contencioso estratégico perante os tribunais superiores.",
    keywords: ["tribunais superiores", "STJ", "STF"],
    image: "https://images.unsplash.com/photo-1593458018624-21ae71908e8c?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Brasília: monumento de concreto contra o sol na Praça dos Três Poderes.",
    lead: "Texto provisório. Descrever a atuação perante o STJ e o STF conforme a experiência efetiva dos profissionais, após confirmação.",
    scope: [
      { title: "Recursos especiais e extraordinários", text: "Texto provisório, sujeito à confirmação." },
      { title: "Contencioso estratégico", text: "Texto provisório, sujeito à confirmação." },
    ],
    situations: [],
    approach: [],
    legalBasis: ["Código de Processo Civil (Lei nº 13.105/2015), arts. 1.029 e seguintes"],
    audiences: ["empresas", "investidores"],
    related: ["direito-imobiliario"],
    published: false,
  },
];

/** Published areas only: everything on the site reads from this list. */
export const practices: Practice[] = allPractices.filter((p) => p.published);

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
