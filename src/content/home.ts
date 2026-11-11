/**
 * Homepage copy — central and editable.
 * Status markers: [MANUAL] = phrase taken from the official brand manual applications;
 * [PROPOSTA] = new copy proposed for client approval.
 */
export const home = {
  hero: {
    kicker: "Advocacia em Direito Imobiliário · Brasília", // [PROPOSTA]
    line1: "Objetividade", // [MANUAL]
    line2: "e inteligência.", // [MANUAL]
    lede: "Assessoria jurídica estratégica em Direito Imobiliário para decisões que envolvem negócios, investimentos e patrimônio.", // [PROPOSTA]
  },
  sequence: {
    caption: "Advocacia especializada em Direito Imobiliário", // [MANUAL] p. 38
    statementLabel: "O escritório", // [PROPOSTA]
    practicesLabel: "Áreas de atuação",
    /** The three areas shown on the homepage, in order. The full list of six lives on /areas-de-atuacao. */
    featured: ["consultoria-e-due-diligence-imobiliaria", "elaboracao-e-revisao-de-contratos", "regularizacao-de-imoveis"],
    practicesIntro: "Seis frentes dentro do Direito Imobiliário, da análise que antecede um negócio à solução de conflitos já instaurados.", // [PROPOSTA]
  },
  intro: {
    statement: ["Direito imobiliário", "com estratégia,", "clareza e precisão."], // [PROPOSTA]
    // [MANUAL] — texto institucional presente nas aplicações do manual (p. 32).
    lead: "Somos um escritório especializado em Direito Imobiliário, oferecendo assessoria jurídica estratégica para clientes que buscam segurança, agilidade e transparência em transações e disputas imobiliárias.",
    // [PROPOSTA]
    body: "Com uma atuação objetiva e atenta aos detalhes, o escritório acompanha decisões que envolvem imóveis — da análise prévia de riscos à formalização de contratos, da regularização documental à condução de conflitos.",
    values: [
      // Os três valores são citados no manual; os textos de apoio são [PROPOSTA].
      { title: "Segurança", text: "Análise documental cuidadosa e decisões fundamentadas antes de cada passo." },
      { title: "Agilidade", text: "Respostas objetivas e comunicação direta ao longo de todo o trabalho." },
      { title: "Transparência", text: "Clareza sobre riscos, alternativas e etapas, sem linguagem desnecessária." },
    ],
  },
  story: {
    title: ["Nossa", "História"], // [MANUAL] p. 31
    label: "Carreira", // [MANUAL] p. 31
    heading: ["Tradição no", "direito imobiliário."], // [MANUAL] p. 31
    // The manual shows placeholder text here. Paragraphs go in this list once the firm supplies
    // its history; until then the section shows a discreet "a confirmar" marker. Never invent dates or facts.
    text: [] as string[],
  },
  practices: {
    intro: "Seis frentes de atuação dentro do Direito Imobiliário, da análise que antecede um negócio à solução de conflitos já instaurados.", // [PROPOSTA]
  },
  audiences: {
    title: ["Quem", "assessoramos."], // [PROPOSTA]
    intro: "Empresas, investidores e proprietários lidam com questões imobiliárias diferentes. O cuidado com a análise e a clareza na orientação são os mesmos.", // [PROPOSTA]
  },
  founder: {
    // [PROPOSTA] — introdução neutra até o envio da biografia aprovada.
    intro: [
      "À frente do escritório, a advogada Carolina Meirelles conduz uma atuação dedicada ao Direito Imobiliário, orientada pela objetividade e pelo cuidado com os detalhes.",
      "A trajetória profissional, a formação e as credenciais completas serão publicadas após confirmação pelo escritório.",
    ],
  },
  place: {
    // [PROPOSTA]
    text: "O escritório atua a partir de Brasília. A arquitetura moderna da capital — estrutura aparente, luz intensa, ritmo e proporção — inspira a identidade da CMA e traduz a forma como conduzimos cada trabalho: estrutura clara e precisão nos detalhes.",
  },
} as const;
