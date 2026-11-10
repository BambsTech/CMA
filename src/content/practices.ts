// Conteúdo das áreas de atuação — rascunho sujeito a revisão jurídica.
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
};

export const practices: Practice[] = [
  {
    slug: "consultoria-e-due-diligence-imobiliaria",
    number: "01",
    title: "Consultoria e Due Diligence Imobiliária",
    shortTitle: "Consultoria e Due Diligence",
    summary:
      "Análise jurídica prévia de imóveis e das partes envolvidas, para que decisões de compra, venda ou investimento sejam tomadas com informação.",
    metaDescription:
      "Due diligence imobiliária em Brasília: análise de matrícula, ônus, certidões e riscos jurídicos antes de comprar, vender ou investir em imóveis.",
    keywords: [
      "due diligence imobiliária",
      "auditoria jurídica de imóvel",
      "análise de matrícula de imóvel",
      "consultoria imobiliária em Brasília",
    ],
    image: "/assets/architecture/detail-glass-reflection.webp",
    imageAlt:
      "Imagem conceitual: fachada de vidro refletindo luz quente sob uma marquise de concreto.",
    lead:
      "Antes de uma aquisição, de um investimento ou de uma operação estruturada, é prudente conhecer a situação jurídica do imóvel e de quem o negocia. O escritório conduz essa análise de forma organizada, identificando pontos de atenção e indicando caminhos para tratá-los antes da assinatura.",
    scope: [
      {
        title: "Matrícula e cadeia dominial",
        text: "Leitura da matrícula atualizada e do histórico de transmissões, verificando titularidade, descrição do imóvel e eventuais inconsistências.",
      },
      {
        title: "Ônus e gravames",
        text: "Identificação de hipotecas, alienações fiduciárias, penhoras, usufrutos, servidões e outras restrições registradas ou averbadas.",
      },
      {
        title: "Certidões das partes",
        text: "Exame de certidões judiciais, fiscais e trabalhistas de vendedores e, quando pertinente, de antecessores, para avaliar riscos sobre a operação.",
      },
      {
        title: "Situação fiscal e condominial",
        text: "Verificação de débitos de tributos incidentes sobre o imóvel e de obrigações condominiais pendentes.",
      },
      {
        title: "Aspectos urbanísticos e ambientais",
        text: "Análise, em linhas gerais, da compatibilidade do uso pretendido com as normas aplicáveis e da existência de restrições conhecidas.",
      },
      {
        title: "Relatório e recomendações",
        text: "Consolidação dos achados em relatório objetivo, com a indicação de providências, condições contratuais e documentos complementares.",
      },
    ],
    situations: [
      "Aquisição de imóvel residencial, comercial ou de terreno destinado a empreendimento.",
      "Investimento em carteira de imóveis ou em ativos com histórico documental extenso.",
      "Recebimento de imóvel em dação em pagamento, permuta ou integralização de capital.",
      "Compra de imóvel cuja matrícula apresenta averbações ou registros pouco claros.",
      "Negociação com vendedor que responde a processos judiciais ou possui débitos fiscais.",
    ],
    approach: [
      {
        title: "Entendimento da operação",
        text: "Conversamos sobre o objetivo do negócio, o cronograma e o nível de profundidade adequado para a análise.",
      },
      {
        title: "Levantamento documental",
        text: "Definimos a lista de documentos e certidões necessários e organizamos sua obtenção junto às partes e aos órgãos competentes.",
      },
      {
        title: "Análise e diagnóstico",
        text: "Examinamos o material reunido e classificamos os pontos identificados conforme sua relevância para a operação.",
      },
      {
        title: "Orientação para a decisão",
        text: "Apresentamos as conclusões e as alternativas disponíveis, inclusive cláusulas e providências que podem ser exigidas antes do fechamento.",
      },
    ],
    legalBasis: [
      "Código Civil (Lei nº 10.406/2002)",
      "Lei de Registros Públicos (Lei nº 6.015/1973)",
      "Lei nº 13.097/2015 (concentração de atos na matrícula)",
      "Lei nº 7.433/1985 (requisitos das escrituras públicas)",
      "Código de Processo Civil (Lei nº 13.105/2015)",
    ],
    audiences: ["empresas", "investidores", "proprietarios"],
    related: ["elaboracao-e-revisao-de-contratos", "direito-registral-e-notarial"],
  },
  {
    slug: "elaboracao-e-revisao-de-contratos",
    number: "02",
    title: "Elaboração e Revisão de Contratos",
    shortTitle: "Contratos Imobiliários",
    summary:
      "Redação e revisão de contratos imobiliários com atenção ao equilíbrio entre as partes, às garantias e à clareza das obrigações assumidas.",
    metaDescription:
      "Elaboração e revisão de contratos imobiliários em Brasília: compra e venda, locação, permuta, incorporação e garantias, com cláusulas claras.",
    keywords: [
      "contrato de compra e venda de imóvel",
      "revisão de contrato imobiliário",
      "advogado para contrato imobiliário em Brasília",
      "compromisso de compra e venda",
    ],
    image: "/assets/architecture/detail-colonnade-rhythm.webp",
    imageAlt: "Imagem conceitual: ritmo de colunas de concreto ao pôr do sol.",
    lead:
      "Um contrato imobiliário bem estruturado traduz o que foi negociado e antecipa situações que podem surgir ao longo da sua execução. O escritório elabora e revisa instrumentos para operações de diferentes portes, buscando redação precisa e cláusulas coerentes com o negócio.",
    scope: [
      {
        title: "Compra e venda e promessa",
        text: "Instrumentos particulares e minutas de escritura, com definição de preço, forma de pagamento, condições e prazos de entrega.",
      },
      {
        title: "Locações residenciais e comerciais",
        text: "Contratos de locação, inclusive modalidades específicas como locação em shopping center e construção sob medida (built to suit).",
      },
      {
        title: "Permuta e parcerias",
        text: "Permutas de terreno por unidades futuras e acordos de parceria para desenvolvimento imobiliário.",
      },
      {
        title: "Incorporação imobiliária",
        text: "Contratos de aquisição de unidades na planta, observando as exigências da Lei de Incorporações e da Lei do Distrato.",
      },
      {
        title: "Garantias",
        text: "Estruturação de alienação fiduciária, hipoteca, fiança, caução e demais garantias, conforme a natureza da operação.",
      },
      {
        title: "Revisão e negociação",
        text: "Análise de minutas recebidas da outra parte, com apontamento de riscos e sugestão de redação alternativa.",
      },
    ],
    situations: [
      "Recebimento de minuta padrão da incorporadora, do vendedor ou do locador para assinatura.",
      "Venda com pagamento parcelado, financiamento bancário ou uso de recursos do FGTS.",
      "Negociação de locação comercial de longo prazo com investimentos do locatário no imóvel.",
      "Operação condicionada à aprovação de projeto, à liberação de crédito ou à baixa de ônus.",
      "Permuta de terreno por unidades a serem construídas.",
    ],
    approach: [
      {
        title: "Mapeamento do negócio",
        text: "Identificamos as partes, o objeto, as condições comerciais já acertadas e os riscos próprios daquela operação.",
      },
      {
        title: "Redação ou revisão",
        text: "Elaboramos a minuta ou comentamos a versão recebida, explicando o efeito prático de cada cláusula relevante.",
      },
      {
        title: "Apoio na negociação",
        text: "Acompanhamos as rodadas de ajuste com a outra parte, registrando de forma clara o que foi alterado.",
      },
      {
        title: "Formalização",
        text: "Orientamos a assinatura, o reconhecimento de firmas, a lavratura de escritura e o registro, quando necessários.",
      },
    ],
    legalBasis: [
      "Código Civil (Lei nº 10.406/2002)",
      "Lei do Inquilinato (Lei nº 8.245/1991)",
      "Lei de Incorporações (Lei nº 4.591/1964)",
      "Lei nº 9.514/1997 (alienação fiduciária de imóveis)",
      "Lei do Distrato (Lei nº 13.786/2018)",
    ],
    audiences: ["empresas", "investidores", "proprietarios"],
    related: ["consultoria-e-due-diligence-imobiliaria", "litigios-imobiliarios"],
  },
  {
    slug: "regularizacao-de-imoveis",
    number: "03",
    title: "Regularização de Imóveis",
    shortTitle: "Regularização de Imóveis",
    summary:
      "Identificação da irregularidade e condução do caminho adequado, judicial ou extrajudicial, para que o imóvel tenha situação registral coerente.",
    metaDescription:
      "Regularização de imóveis em Brasília: escritura, registro, usucapião, adjudicação compulsória, retificação de área e averbação de construção.",
    keywords: [
      "regularização de imóvel",
      "usucapião extrajudicial",
      "adjudicação compulsória extrajudicial",
      "imóvel sem escritura em Brasília",
      "averbação de construção",
    ],
    image: "/assets/architecture/detail-curved-wall.webp",
    imageAlt:
      "Imagem conceitual: parede curva de concreto com sombras de folhas.",
    lead:
      "Imóveis sem escritura, sem registro ou com área e construção diferentes do que consta na matrícula enfrentam limitações para venda, financiamento e sucessão. A atuação do escritório começa pelo diagnóstico da situação e segue pelo procedimento mais adequado aos documentos disponíveis.",
    scope: [
      {
        title: "Diagnóstico documental",
        text: "Levantamento da origem da posse ou da propriedade, dos documentos existentes e das lacunas a serem supridas.",
      },
      {
        title: "Escritura e registro",
        text: "Organização da lavratura da escritura pública e do registro do título, inclusive em transmissões antigas não formalizadas.",
      },
      {
        title: "Usucapião",
        text: "Avaliação do cabimento da usucapião e condução pela via extrajudicial, perante o cartório de registro de imóveis, ou judicial.",
      },
      {
        title: "Adjudicação compulsória",
        text: "Medida para obter o registro quando o preço foi pago e o vendedor não outorga a escritura, inclusive pela via extrajudicial.",
      },
      {
        title: "Retificação de registro",
        text: "Correção de área, medidas, confrontações e outros dados da matrícula, conforme o procedimento cabível.",
      },
      {
        title: "Averbação de construção",
        text: "Apoio na reunião de documentos como habite-se e comprovação de regularidade da obra para averbar a edificação.",
      },
      {
        title: "Regularização fundiária",
        text: "Orientação, em linhas gerais, sobre a Reurb e sua aplicação a núcleos urbanos informais.",
      },
    ],
    situations: [
      "Imóvel adquirido por contrato particular, com preço quitado, mas sem escritura.",
      "Posse longa e contínua sem título registrado em nome do possuidor.",
      "Construção ou ampliação que não consta na matrícula.",
      "Divergência entre a área real do terreno e a área descrita no registro.",
      "Imóvel recebido por herança cuja transmissão anterior nunca foi registrada.",
      "Necessidade de vender ou financiar um imóvel que não pode ser aceito como garantia.",
    ],
    approach: [
      {
        title: "Diagnóstico",
        text: "Examinamos matrícula, contratos, comprovantes e a situação de fato para identificar a natureza da irregularidade.",
      },
      {
        title: "Definição do caminho",
        text: "Apresentamos os procedimentos possíveis, com seus requisitos, etapas e documentos, para uma decisão informada.",
      },
      {
        title: "Instrução e protocolo",
        text: "Reunimos a documentação, coordenamos profissionais técnicos quando necessário e protocolamos o pedido no órgão competente.",
      },
      {
        title: "Acompanhamento",
        text: "Respondemos a exigências e notas devolutivas até a conclusão do procedimento e o registro final.",
      },
    ],
    legalBasis: [
      "Lei de Registros Públicos (Lei nº 6.015/1973), arts. 216-A e 216-B",
      "Lei nº 14.382/2022 (Sistema Eletrônico dos Registros Públicos)",
      "Lei nº 13.465/2017 (Reurb)",
      "Código Civil (Lei nº 10.406/2002)",
      "Código de Processo Civil (Lei nº 13.105/2015)",
    ],
    audiences: ["proprietarios", "investidores", "empresas"],
    related: ["direito-registral-e-notarial", "consultoria-e-due-diligence-imobiliaria"],
  },
  {
    slug: "locacao-e-condominios",
    number: "04",
    title: "Assessoria em Locação e Condomínios",
    shortTitle: "Locação e Condomínios",
    summary:
      "Orientação a locadores, locatários, síndicos e condôminos sobre contratos, convenções, cobranças e a rotina jurídica de imóveis em uso.",
    metaDescription:
      "Assessoria em locação e condomínios em Brasília: contratos, renovatória, garantias locatícias, convenção, assembleias e cobrança condominial.",
    keywords: [
      "advogado de locação em Brasília",
      "ação renovatória",
      "assessoria jurídica para condomínio",
      "cobrança de taxa condominial",
    ],
    image: "/assets/architecture/detail-ceiling.webp",
    imageAlt:
      "Imagem conceitual: teto e colunas de concreto de uma longa galeria.",
    lead:
      "Locações e condomínios concentram relações continuadas, em que pequenas questões podem se acumular ao longo do tempo. O escritório assessora proprietários, locatários e administrações condominiais na prevenção e no encaminhamento dessas questões, com atenção às regras da Lei do Inquilinato e do Código Civil.",
    scope: [
      {
        title: "Contratos de locação",
        text: "Elaboração e revisão de contratos residenciais, não residenciais e por temporada, com cláusulas compatíveis com a lei.",
      },
      {
        title: "Garantias locatícias",
        text: "Orientação sobre caução, fiança, seguro-fiança e demais modalidades, observada a vedação legal de cumular garantias no mesmo contrato.",
      },
      {
        title: "Reajuste, revisão e renovação",
        text: "Análise de reajustes, pedidos de revisão do aluguel e, em linhas gerais, dos requisitos da ação renovatória em locações comerciais.",
      },
      {
        title: "Encerramento da locação",
        text: "Notificações, devolução do imóvel, vistoria e, quando necessário, ação de despejo.",
      },
      {
        title: "Convenção e regimento",
        text: "Elaboração e atualização de convenção condominial e regimento interno, conforme o quórum aplicável.",
      },
      {
        title: "Assembleias e gestão",
        text: "Apoio na convocação, condução e registro de assembleias, e orientação ao síndico sobre seus deveres.",
      },
      {
        title: "Cobrança condominial",
        text: "Cobrança extrajudicial e judicial de cotas em atraso, considerando a natureza da dívida vinculada à unidade.",
      },
    ],
    situations: [
      "Proximidade do término de uma locação comercial em que o locatário pretende permanecer no ponto.",
      "Inadimplência de aluguel ou de encargos locatícios.",
      "Dúvida sobre o reajuste ou sobre a revisão do valor do aluguel.",
      "Convenção de condomínio desatualizada ou em conflito com a legislação vigente.",
      "Divergência entre condôminos sobre uso de áreas comuns, obras ou deliberações de assembleia.",
    ],
    approach: [
      {
        title: "Escuta e leitura",
        text: "Examinamos o contrato, a convenção, as atas e a correspondência trocada para compreender a relação como um todo.",
      },
      {
        title: "Orientação preventiva",
        text: "Indicamos ajustes documentais e condutas que reduzem a probabilidade de conflito futuro.",
      },
      {
        title: "Tratativas",
        text: "Conduzimos notificações e negociações com a outra parte, buscando soluções compatíveis com a relação continuada.",
      },
      {
        title: "Medidas judiciais",
        text: "Quando a via consensual não é suficiente, ajuizamos e acompanhamos a ação adequada ao caso.",
      },
    ],
    legalBasis: [
      "Lei do Inquilinato (Lei nº 8.245/1991)",
      "Código Civil (Lei nº 10.406/2002), disciplina do condomínio edilício",
      "Código de Processo Civil (Lei nº 13.105/2015)",
    ],
    audiences: ["proprietarios", "investidores", "empresas"],
    related: ["elaboracao-e-revisao-de-contratos", "litigios-imobiliarios"],
  },
  {
    slug: "litigios-imobiliarios",
    number: "05",
    title: "Soluções para Litígios Imobiliários",
    shortTitle: "Litígios Imobiliários",
    summary:
      "Atuação em conflitos imobiliários com foco na prevenção e na negociação e, quando necessário, em medidas judiciais e extrajudiciais.",
    metaDescription:
      "Litígios imobiliários em Brasília: negociação, mediação e medidas judiciais em disputas de posse, contratos, distrato, locação e condomínio.",
    keywords: [
      "advogado imobiliário em Brasília",
      "ação possessória",
      "rescisão de contrato de imóvel",
      "distrato imobiliário",
    ],
    image: "/assets/architecture/detail-leaf-shadow.webp",
    imageAlt:
      "Imagem conceitual: parede de concreto aparente com marcas de fôrma e sombras de folhas.",
    lead:
      "Conflitos envolvendo imóveis costumam reunir questões contratuais, registrais e possessórias ao mesmo tempo. O escritório avalia cada caso a partir dos documentos e dos fatos específicos, considera primeiro as possibilidades de composição e, quando necessário, adota as medidas judiciais ou extrajudiciais cabíveis.",
    scope: [
      {
        title: "Avaliação do conflito",
        text: "Análise dos documentos, da cronologia dos fatos e das posições das partes, com indicação dos riscos e das alternativas existentes.",
      },
      {
        title: "Negociação e mediação",
        text: "Condução de tratativas e participação em mediação ou conciliação, com formalização dos acordos alcançados.",
      },
      {
        title: "Disputas contratuais",
        text: "Inadimplemento, rescisão, distrato e revisão de contratos de compra e venda, promessa e incorporação.",
      },
      {
        title: "Posse e propriedade",
        text: "Ações possessórias, reivindicatórias e de imissão na posse, conforme a situação de fato e de direito.",
      },
      {
        title: "Vícios e atrasos em empreendimentos",
        text: "Questões relacionadas a atraso de obra e vícios construtivos, considerando as normas contratuais e de consumo aplicáveis.",
      },
      {
        title: "Execuções e garantias",
        text: "Atuação em execuções que envolvam imóveis, embargos de terceiro e procedimentos ligados à alienação fiduciária.",
      },
    ],
    situations: [
      "Ocupação indevida de imóvel ou resistência à entrega da posse após a venda.",
      "Inadimplência do comprador ou descumprimento de obrigações pelo vendedor.",
      "Atraso na entrega de unidade adquirida na planta ou pedido de distrato.",
      "Penhora sobre imóvel adquirido de boa-fé por terceiro.",
      "Divergência sobre limites, confrontações ou uso de áreas entre vizinhos.",
    ],
    approach: [
      {
        title: "Análise do caso",
        text: "Estudamos os documentos e os fatos para delimitar o que está em discussão e quais são as alternativas juridicamente viáveis.",
      },
      {
        title: "Tentativa de composição",
        text: "Sempre que possível, buscamos solução negociada, por notificação, reunião, mediação ou conciliação.",
      },
      {
        title: "Estratégia processual",
        text: "Se a via consensual não for suficiente, definimos com o cliente a medida adequada e seus custos, prazos e riscos.",
      },
      {
        title: "Acompanhamento",
        text: "Mantemos o cliente informado sobre cada etapa do procedimento e sobre eventuais oportunidades de acordo.",
      },
    ],
    legalBasis: [
      "Código de Processo Civil (Lei nº 13.105/2015)",
      "Código Civil (Lei nº 10.406/2002)",
      "Lei de Mediação (Lei nº 13.140/2015)",
      "Lei do Distrato (Lei nº 13.786/2018)",
      "Código de Defesa do Consumidor (Lei nº 8.078/1990), quando aplicável",
    ],
    audiences: ["proprietarios", "investidores", "empresas"],
    related: ["elaboracao-e-revisao-de-contratos", "regularizacao-de-imoveis"],
  },
  {
    slug: "direito-registral-e-notarial",
    number: "06",
    title: "Direito Registral e Notarial",
    shortTitle: "Registral e Notarial",
    summary:
      "Assessoria em atos de cartório, como escrituras, registros, averbações e notas devolutivas, para que cada título produza seus efeitos.",
    metaDescription:
      "Direito registral e notarial em Brasília: escrituras, registro de títulos, averbações, notas devolutivas e procedimentos no registro de imóveis.",
    keywords: [
      "direito registral imobiliário",
      "registro de escritura de imóvel",
      "nota devolutiva cartório",
      "registro de imóveis em Brasília",
    ],
    image: "/assets/architecture/detail-vanishing-point.webp",
    imageAlt:
      "Imagem conceitual: colunata que se estende até um ponto de fuga.",
    lead:
      "No direito brasileiro, a transmissão da propriedade imobiliária se completa com o registro do título no cartório competente. O escritório acompanha a preparação, a lavratura e o registro de atos notariais e registrais, e atua na solução de exigências que impedem sua conclusão.",
    scope: [
      {
        title: "Escrituras públicas",
        text: "Preparação e conferência de minutas de compra e venda, doação, permuta, divisão e constituição de direitos reais.",
      },
      {
        title: "Registro e averbação",
        text: "Protocolo e acompanhamento de títulos no registro de imóveis, incluindo averbações de construção, casamento e demais alterações.",
      },
      {
        title: "Notas devolutivas",
        text: "Análise de exigências formuladas pelo registrador e providências para atendê-las ou questioná-las pela via adequada.",
      },
      {
        title: "Suscitação de dúvida",
        text: "Atuação no procedimento de dúvida registral quando há divergência sobre a registrabilidade do título.",
      },
      {
        title: "Atos de incorporação e instituição",
        text: "Registro de incorporação, instituição de condomínio e especificação de unidades, em apoio a incorporadoras.",
      },
      {
        title: "Procedimentos extrajudiciais",
        text: "Inventário e partilha, usucapião e adjudicação compulsória pela via extrajudicial, quando cabíveis.",
      },
    ],
    situations: [
      "Título apresentado ao registro de imóveis e devolvido com exigências.",
      "Escritura lavrada há anos e nunca levada a registro.",
      "Necessidade de averbar casamento, divórcio, óbito ou alteração de dados das partes.",
      "Lançamento de empreendimento que depende do registro da incorporação.",
      "Partilha de bens imóveis em inventário que pode ser feito em cartório.",
    ],
    approach: [
      {
        title: "Exame do título",
        text: "Verificamos se o documento atende aos requisitos formais e ao princípio da continuidade registral.",
      },
      {
        title: "Preparação",
        text: "Organizamos certidões, guias de tributos e documentos complementares antes do protocolo.",
      },
      {
        title: "Interlocução com a serventia",
        text: "Acompanhamos o andamento junto ao tabelionato e ao registro de imóveis, de forma técnica e cordial.",
      },
      {
        title: "Solução de exigências",
        text: "Atendemos às exigências cabíveis ou, quando houver fundamento, adotamos o procedimento para discuti-las.",
      },
    ],
    legalBasis: [
      "Lei de Registros Públicos (Lei nº 6.015/1973)",
      "Lei nº 8.935/1994 (serviços notariais e de registro)",
      "Lei nº 7.433/1985 (requisitos das escrituras públicas)",
      "Lei nº 14.382/2022 (Sistema Eletrônico dos Registros Públicos)",
      "Código Civil (Lei nº 10.406/2002)",
    ],
    audiences: ["proprietarios", "empresas", "investidores"],
    related: ["regularizacao-de-imoveis", "consultoria-e-due-diligence-imobiliaria"],
  },
];

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}
