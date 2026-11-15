/**
 * Homepage copy — central and editable.
 * Status markers: [MANUAL] = phrase taken from the official brand manual applications;
 * [PROPOSTA] = new copy proposed for client approval.
 */
export const home = {
  hero: {
    kicker: "CMA Advogados · Brasília", // [BRIEFING NOV 2026]
    line1: "Excelência jurídica.", // [BRIEFING NOV 2026] assinatura preferencial
    line2: "Visão estratégica.", // [BRIEFING NOV 2026]
    lede: "Advocacia estratégica para patrimônio, negócios e questões de alta complexidade.", // [BRIEFING NOV 2026]
  },
  sequence: {
    caption: "Excelência jurídica. Visão estratégica.", // [BRIEFING NOV 2026] — same position as the manual's p. 38 line
    statementLabel: "O escritório", // [PROPOSTA]
    practicesLabel: "Áreas de atuação",
    /** The three areas shown on the homepage, in order (client asked for three). The full list lives on /areas-de-atuacao. */
    featured: ["direito-imobiliario", "sucessorio-patrimonial", "direito-fundiario"],
    practicesIntro: "Áreas conectadas — imobiliária, fundiária, sucessória e patrimonial e tributária — tratadas em conjunto.", // [BRIEFING NOV 2026]
  },
  intro: {
    statement: ["Advocacia estratégica", "para patrimônio", "e negócios."], // [BRIEFING NOV 2026]
    // [BRIEFING NOV 2026] — posicionamento institucional (sujeito a aprovação).
    lead: "A CMA Advogados é um escritório boutique dedicado a questões que envolvem patrimônio, negócios e imóveis — da advocacia imobiliária e fundiária ao planejamento sucessório, patrimonial e tributário.",
    // [BRIEFING NOV 2026]
    body: "O trabalho combina profundidade técnica, visão de negócios e atendimento próximo: cada assunto é conduzido diretamente pelos advogados responsáveis, com discrição e pensado para relações profissionais de longo prazo.",
    values: [
      // Os três valores são citados no manual; os textos de apoio são [PROPOSTA].
      { title: "Segurança", text: "Análise documental cuidadosa e decisões fundamentadas antes de cada passo." },
      { title: "Agilidade", text: "Respostas objetivas e comunicação direta ao longo de todo o trabalho." },
      { title: "Transparência", text: "Clareza sobre riscos, alternativas e etapas, sem linguagem desnecessária." },
    ],
  },
  story: {
    title: ["Nossa", "História"], // [MANUAL] p. 31
    label: "O escritório", // [BRIEFING NOV 2026] (manual p. 31: "Carreira")
    heading: ["Um escritório", "boutique."], // [BRIEFING NOV 2026] (manual p. 31: "Tradição no direito imobiliário.")
    // The manual shows placeholder text here. Paragraphs go in this list once the firm supplies
    // its history; until then the section shows a discreet "a confirmar" marker. Never invent dates or facts.
    // [BRIEFING NOV 2026] Institutional description (not a history — no dates or facts invented).
    text: [
      "Excelência técnica e atenção individualizada, com discrição e relações profissionais de longo prazo.",
    ] as string[],
  },
  practices: {
    intro: "Direito Imobiliário, Fundiário, Sucessório e Patrimonial e Tributário — áreas conectadas, tratadas em conjunto.", // [BRIEFING NOV 2026]
  },
  audiences: {
    title: ["Quem", "assessoramos."], // [PROPOSTA]
    intro: "Empresários, investidores, incorporadores, proprietários de imóveis, famílias empresárias e titulares de patrimônio relevante.", // [BRIEFING NOV 2026]
  },
  founder: {
    // [PROPOSTA] — introdução neutra até o envio da biografia aprovada.
    intro: [
      "Na CMA Advogados, cada assunto é conduzido diretamente pelos advogados responsáveis. À frente do escritório está a advogada Carolina Meirelles.",
      "A trajetória profissional, a formação e as credenciais da equipe serão publicadas após confirmação pelo escritório.",
    ],
  },
  place: {
    // [PROPOSTA]
    text: "O escritório atua a partir de Brasília. A arquitetura moderna da capital — estrutura aparente, luz intensa, ritmo e proporção — inspira a identidade da CMA e traduz a forma como conduzimos cada trabalho: estrutura clara e precisão nos detalhes.",
  },
} as const;
