// ============================================
// BE WATER - Sistema de Internacionalização
// ============================================

// Traduções do site
const translations = {
    pt: {
      // Meta tags
      'meta.title': 'BE WATER | Flow Like Water, Strike Like Lightning',
      'meta.description': 'BE WATER - Centro de treino inspirado na filosofia de Bruce Lee. Treino funcional, artes marciais e desenvolvimento pessoal em Lisboa. Fundado por Bruno Salgueiro.',
      
      // Header Navigation
      'header.logo.tagline': 'by Dicas do Salgueiro',
      'nav.gym': 'GYM',
      'nav.pricing': 'PREÇOS',
      'nav.schedule': 'HORÁRIOS',
      'nav.salgueiro': 'SALGUEIRO',
      'nav.trainers': 'TREINADORES',
      'nav.faq': 'FAQ',
      'nav.contact': 'CONTACTO',
      
      // Hero Section
      'hero.title': 'BE WATER,<br>MY FRIEND',
      'hero.subtitle': 'Desenvolve a tua força, agilidade e flexibilidade num espaço que reflecte a filosofia "be water" popularizada por Bruce Lee. Vem fazer parte desta corrente.',
      'hero.cta': 'INSCREVE-TE JÁ',
      
      
      // About Section
      'gym.hero.title': 'O CENTRO<br>DE TREINO',
      'about.title': 'CONHECE O ESPAÇO',
      'about.lead': 'Vem treinar com o Bruno Salgueiro, conhecido por ser o rosto por detrás das <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a>, e trabalha diretamente com a sua equipa de treinadores pessoalmente selecionada.',
      'about.secondary': '<span class="brand-highlight">BE WATER</span> - O teu clube no centro de Lisboa com 3 zonas distintas: Um lounge de convívio e co-working, um ginásio de treino físico com regime de aulas de grupo e open gym e ainda um dojo dedicado à prática de artes marciais e meditação. Junta-te a esta comunidade!',
      
      // Gym Section
      'gym.collage.mobile.instruction': '👈 Arrasta para o lado para ver mais fotos 👉',
      
      // Pricing Section
      'pricing.title': 'PREÇOS<br><span class="early-bird-text">EARLY BIRD</span>',
      'pricing.promo': 'Oferta de lançamento por tempo limitado!',
      'pricing.period': '/mês',
      'pricing.test.note': '<strong>TESTA PRIMEIRO, DECIDE DEPOIS!</strong><br><a href="#contact" class="test-note__link">Clicka aqui</a> para usar o formulário de contacto e agendar a tua visita.',
      'pricing.elite.title': 'ELITE',
      'pricing.elite.price': '€84.90',
      'pricing.elite.original': '€94.90',
      'pricing.elite.cta': 'INSCREVE-TE JÁ',
          'pricing.elite.feature1': 'Acesso livre trânsito (ilimitado) a todas as modalidades e open gym',
    'pricing.elite.feature2': 'Sem fidelização',
    'pricing.elite.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      'pricing.rise.title': 'RISE',
      'pricing.rise.price': '€69.90',
      'pricing.rise.original': '€79.90',
      'pricing.rise.cta': 'INSCREVE-TE JÁ',
          'pricing.rise.feature1': 'Acesso 3x por semana a todas as modalidades e open gym',
    'pricing.rise.feature2': 'Sem fidelização',
    'pricing.rise.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      'pricing.starter.title': 'STARTER',
      'pricing.starter.price': '€54.90',
      'pricing.starter.original': '€64.90',
      'pricing.starter.cta': 'INSCREVE-TE JÁ',
          'pricing.starter.feature1': 'Acesso 2x por semana a todas as modalidades e open gym',
    'pricing.starter.feature2': 'Sem fidelização',
    'pricing.starter.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      'pricing.badge': 'EARLY BIRD',
      
      // Drop-in pricing
      'pricing.dropin.period': '/aula',
      'pricing.dropin.feature1': 'Aula avulsa única',
      'pricing.dropin.feature2': 'Compra apenas 1 aula sem compromisso',
      'pricing.dropin.feature3': 'Acesso a todas as modalidades e open gym',
      'pricing.dropin.feature4': 'Sem mensalidade - pagas apenas pela aula',
      'pricing.dropin.cta': 'RESERVAR AULA',
      
      // Schedule Section
      'schedule.title': 'HORÁRIOS E MODALIDADES',
      'schedule.mobile.instruction': '👈 Arrasta para o lado para ver todos os dias 👉',
      'schedule.days.mon': 'SEG',
      'schedule.days.tue': 'TER',
      'schedule.days.wed': 'QUA',
      'schedule.days.thu': 'QUI',
      'schedule.days.fri': 'SEX',
      'schedule.days.sat': 'SÁB',
      'schedule.days.sun': 'DOM',
      'schedule.activities.boxe': 'BOXE',
      'schedule.activities.closed': 'FECHADO',
      'schedule.rest.text': 'DIA DE DESCANSO',
      'schedule.rest.subtitle': 'BE WATER, REST DEEP',
      'schedule.legend.opengym': 'Acesso livre a todo o ginásio: área de treino funcional, dojo, sacos de boxe, barras, halteres e tatamis. Treina à tua maneira!',
      'schedule.legend.bewater': 'Treino funcional completo que junta força, condicionamento, calistenia e técnicas híbridas. O treino mais desafiante para te tornar numa máquina!',
      'schedule.legend.lonewarrior': 'Treino express minimalista com peso corporal, halteres e bandas. Intenso, rápido e sem desculpas - ideal para repetir em qualquer lugar.',
      'schedule.legend.jiujitsu': 'Arte marcial tradicional focada em técnicas de solo, defesa pessoal e condicionamento físico e mental no nosso dojo especializado.',
      'schedule.legend.boxe': 'Treino de boxe com foco em técnica, condicionamento cardiovascular e força. Usa os sacos pesados e desenvolve potência e agilidade.',
      'schedule.legend.closed': 'Ginásio encerrado para pausa de almoço e manutenção. Reabrimos às 16h30!',
      'schedule.note.beta': '<strong>🌊 Horários em Fase Beta:</strong> Estamos na época de verão e ainda em fase de testes e afinações das modalidades. Os horários apresentados são iniciais e poderão sofrer ajustes conforme a resposta da comunidade BE WATER e otimização das dinâmicas do clube.',
      'schedule.note.events': '<strong>Nota:</strong> Teremos ainda frequentemente modalidades surpresa e eventos de treino, cultura e convívio no clube.',
      
      // Salgueiro Section
      'salgueiro.title': 'BRUNO SALGUEIRO',
      'salgueiro.subtitle': 'Fundador & Criador das "Dicas do Salgueiro"',
      
      // Trainers Section
      'trainers.title': 'TREINADORES',
      'trainers.bruno.name': 'BRUNO SALGUEIRO',
      'trainers.bruno.specialty': 'Fundador & Head Coach',
      'trainers.bruno.bio': 'Duplo profissional de televisão e cinema com 16 anos de experiência. Background em artes marciais, ginástica e treino de força. Criador da plataforma "Dicas do Salgueiro".',
      'trainers.jorge.name': 'JORGE SEGURADO',
      'trainers.jorge.specialty': 'Preparador Físico',
      'trainers.jorge.bio': 'Ex-seleção nacional de Rugby e preparador físico com vasta experiência no desporto de alto rendimento. Licenciado em Treino Desportivo pela Universidade Lusófona. Especialista em desenvolvimento de força e condicionamento atlético.',
      'trainers.luis.name': 'LUÍS CATARINO',
      'trainers.luis.specialty': 'Performance Coach & Formador',
      'trainers.luis.bio': 'Performance Coach no Sport Lisboa e Benfica com 9 anos de experiência no desporto de alto rendimento. Mestrado em Biocinética e Performance Specialist pela EXOS. Formador especializado em metodologia do treino desportivo.',
      'trainers.ines.name': 'INÊS PIRES',
      'trainers.ines.specialty': 'Strength & Conditioning Coach & Investigadora',
      'trainers.ines.bio': 'S&C Coach no Sport Lisboa e Benfica com experiência em diversas modalidades do alto rendimento. Mestrado em Treino de Alto Rendimento, Pós-Graduação em S&C e Performance Specialist pela EXOS. Doutoranda em Educação Física e Desporto na Universidade Lusófona.',
      
      // FAQ Section
      'faq.title': 'FAQ',
      'faq.section.training': 'TREINOS',
      'faq.section.pricing': 'PREÇOS',
      'faq.section.facilities': 'CENTRO DE TREINO',
      'faq.section.support': 'SUPORTE',
      'faq.question.1': 'Que modalidades posso praticar?',
      'faq.answer.1': '<strong>Treino funcional Be Water</strong>, <strong>treinos express Lone Warrior</strong>, <strong>Jiu-Jitsu</strong>, <strong>Boxe</strong> e acesso <strong>open gym</strong> em três zonas (estúdio, dojo e lounge).',
      'faq.question.2': 'Há idade mínima?',
      'faq.answer.2': 'Recomendamos <strong>16 anos</strong> (menores precisam de <strong>autorização</strong>).',
      'faq.question.3': 'Onde fica o centro de treino e qual o horário?',
      'faq.answer.3': '<strong>Avenida do Brasil 7, 1700-062 Lisboa.</strong><br>Aberto <strong>2.ª-6.ª 07:00-21:00</strong> e <strong>Sáb. 10:00-13:00</strong>; <strong>fechado ao domingo</strong>.',
      'faq.question.4': 'Quanto pago para me inscrever?',
      'faq.answer.4': '<strong>Taxa única de inscrição (+ quota anual e seguro): 25 €.</strong><br><br>Três planos mensais <strong>sem fidelização</strong>:<br><br><strong>Elite – 94,90 €/mês</strong> (uso ilimitado)<br><strong>Rise – 79,90 €/mês</strong> (3×/semana)<br><strong>Starter – 64,90 €/mês</strong> (2×/semana)',
      'faq.question.5': 'Posso cancelar ou pausar?',
      'faq.answer.5': 'Podes sair <strong>quando quiseres sem penalização</strong>; ao regressar poderá ser cobrado um pequeno <strong>custo de reativação</strong>.',
      
      'faq.question.7': 'Exemplo prático de custos',
      'faq.answer.7': 'Plano Rise (79,90 €/mês), início a 15 de agosto (17 dias por treinar num mês de 31):<br><br>Inscrição + quota anual e seguro: 25 €<br>Mensalidade proporcional: 79,90 € × 17/31 ≈ 43,82 €<br><strong>Total no dia da inscrição: 68,82 €.</strong><br><br>No dia 1 de setembro passa a ser debitado o valor completo de 79,90 €',
      'faq.question.8': 'Preciso de experiência prévia para começar?',
      'faq.answer.8': '<strong>Não!</strong> Todos os treinos são <strong>adaptados ao teu nível</strong>. Os nossos trainers ajudam-te a <strong>progredir gradualmente</strong>.',
      'faq.question.9': 'Como funcionam as aulas de grupo?',
      'faq.answer.9': 'As aulas têm <strong>horários fixos</strong> e <strong>grupos limitados</strong>. Podes reservar através da <strong>app</strong> ou no <strong>balcão</strong>.',
      'faq.question.10': 'Posso experimentar antes de me inscrever?',
      'faq.answer.10': '<strong>Sim!</strong> Oferecemos uma <strong>aula experimental gratuita</strong> para conheceres o nosso método de treino.',
      'faq.question.11': 'Qual é a diferença entre os planos?',
      'faq.answer.11': '<strong>Starter (64,90€):</strong> 2× por semana<br><strong>Rise (79,90€):</strong> 3× por semana<br><strong>Elite (94,90€):</strong> Uso ilimitado',
              'faq.question.12': 'Têm estacionamento?',
        'faq.answer.12': 'Temos zona de parking EMEL nas traseiras. Mais informações na <strong>secção CONTACTO</strong>.',
      'faq.question.13': 'Têm duches e balneários?',
      'faq.answer.13': '<strong>Sim</strong>, temos <strong>balneários masculinos e femininos</strong> com <strong>duches</strong>, <strong>cacifos</strong> e todas as comodidades.',
      'faq.question.14': 'O que é o Treino BeWater?',
      'faq.answer.14': 'O Treino BeWater é <strong>CrossTraining/Treino Híbrido</strong>.<br>A ideia é conjugar várias vertentes da preparação física para fazer dos nossos alunos os <strong>atletas mais completos e capazes</strong>. Cruzamos assim os fundamentos do <strong>Treino de Força</strong>, <strong>Explosão e Velocidade</strong>, <strong>Endurance</strong>, <strong>Hipertrofia</strong>, <strong>Calistenia</strong> e <strong>Mobilidade</strong>.<br><br>Parece bom de mais para ser verdade? Pois bem, existem formas já comprovadas de juntar as peças neste puzzle de programação semanal, <strong>sem ferir ou exagerar nenhuma das áreas</strong>.<br><br>Um exemplo de duas sessões pode ser algo do género:<br><br><strong>DIA 1:</strong><br>- Aquecimento<br>- Trabalho de explosão (saltos/arremessos de bola, sprints com ou sem trenó)<br>- Exercício principal de força, talvez copulado com trabalho de Core<br>- Hipertrofia e trabalho Acessório<br>- Circuito Final<br><br><strong>DIA 2:</strong><br>- Aquecimento<br>- Trabalho de técnica de corrida (Footwork)<br>- Séries de Corrida copuladas com trabalho de Core<br>- 10-15 minutos de Mobilidade<br><br>Claro que isto são apenas \'samples\' mas ficas com uma ideia geral da nossa abordagem. <strong>Testa que não te arrependerás!</strong><br><br>Resta dizer que cada dia terá sempre o <strong>mesmo Menu de aulas</strong>, sendo que se deixa o Aquecimento e Acessórios ao gosto e experiência de cada treinador. Gostamos de <strong>fluidez e adaptação</strong> na leitura da sala, nunca nada deve ser demasiado taxativo.',
      'faq.question.15': 'Então mas qual é a diferença entre isto e CrossFit?',
      'faq.answer.15': 'Todos os Treinadores passaram de alguma forma pelo <strong>CrossFit</strong>, o que foi uma excelente escola de modelo de aulas e comunicação. Quanto a metodologia, as coisas já mudam aqui bastante. Alguns exemplos do CrossFit, que aqui <strong>não faremos</strong>, ou <strong>faremos diferente</strong>:<br><br>- CrossFit não repete semanas, geralmente. <strong>Nós repetimos</strong>, para conferir <strong>consistência e progressão linear</strong><br>- Não faremos halterofilismo com componente de tempo e preferimos optar por <strong>exercícios de explosão pura</strong> (arremessos, pliometria, sprints)<br>- Daremos <strong>maior ênfase a hipertrofia</strong> e algum isolamento muscular, porque sem as peças optimizadas, o todo pode não ser tão fluido<br>- O grau de Skill dos exercícios dos circuitos será <strong>baixo, para evitar risco de lesão</strong><br>- <strong>Não faremos kippings</strong> - não interessa ter 10 Kippin Pull-ups e nem uma Strict. Isso é puro défice de força.<br>- Nem tudo o que fazemos é observável, comparável e repetível. Há muitos exercícios e explorações de movimento que não seguem uma \'matemática\' mas <strong>tornam-nos mais aptos e criativos</strong>.<br><br>Apenas alguns exemplos. Teremos todo o gosto em aprofundar, ao vivo.',
      'faq.question.16': 'Isto parece um pouco \'pesado\'/difícil. Qualquer um pode fazer?',
      'faq.answer.16': 'Dado o <strong>Coaching técnico</strong>, a frequência moderada a baixa de alunos por aula (não é estúdio para 30 pessoas/aula) e as <strong>adaptações das cargas sugeridas</strong>, <strong>todos podem fazer estas aulas</strong>, adaptando e nivelando os exercícios e os objectivos. Contudo, agradecemos <strong>SEMPRE</strong> que nos comuniques alguma <strong>lesão ou questão</strong> que te perturbe. Poderá ser necessário uma intervenção à parte e aí cá estaremos para te ajudar. Inclusivamente temos <strong>fisioterapeuta no Staff</strong>.',
      'faq.question.17': 'O que é o Treino Lone Warrior?',
      'faq.answer.17': 'Este treino é uma <strong>versão mais curta (45 minutos)</strong> e com recurso a menos material do que o Treino do Dia BeWater. Será mais baseado em <strong>peso corporal</strong>, <strong>halteres</strong>, <strong>bandas elásticas</strong> e outro material que possa ser usado mais facilmente em <strong>casa/hotel</strong>. É um treino que será também <strong>gravado para um link privado</strong>, que será sempre partilhado com todos os nossos sócios. Assim, se te ausentas uns dias, tens recurso para trabalhar à distância e ainda alinhado/a com a programação semanal.',
      'faq.question.18': 'Tenho outras dúvidas, como posso contactar?',
      'faq.answer.18': 'Para qualquer dúvida adicional, <strong>entra em contacto connosco através do site</strong>. Temos uma secção de <strong>contacto</strong> onde podes enviar-nos as tuas questões e responderemos o mais rapidamente possível.',
      
      // Contact Section
      'contact.title': 'CONTACTO',
      'contact.address.title': 'ONDE ESTAMOS',
      'contact.address.text': 'Av. do Brasil 7<br>1700-062 Lisboa',
      'contact.hours.title': 'HORÁRIO',
      'contact.hours.weekdays': 'SEG-6ª:',
      'contact.hours.weekdays.time': '7H-21H',
      'contact.hours.weekdays.note': '(disponível em horário de aulas)',
      'contact.hours.saturday': 'SÁB:',
      'contact.hours.saturday.time': '10H-13H',
      'contact.hours.saturday.note': '(disponível em horário de aulas)',
      'contact.parking.title': 'ONDE ESTACIONAR',
      'contact.parking.text': 'Queres saber onde estacionar? Tens um parque público mesmo ao lado! 🚗',
      'contact.social.title': 'SEGUE-NOS',
      'contact.form.name': 'NOME',
      'contact.form.email': 'EMAIL',
      'contact.form.phone': 'TELEMÓVEL',
      'contact.form.message': 'MENSAGEM',
      'contact.form.submit': 'ENVIAR MENSAGEM',
      
      // Footer
      'footer.tagline': 'Flow like water, strike like lightning.',
      'footer.nav.title': 'NAVEGAÇÃO',
      'footer.newsletter.title': 'NEWSLETTER',
      'footer.newsletter.placeholder': 'O teu email',
      'footer.newsletter.btn': 'SUBSCREVER',
      'footer.privacy': 'Política de Privacidade',
      'footer.copyright': '© 2025 BE WATER. TODOS OS DIREITOS RESERVADOS.',
      
      // Modals
      'modal.close': 'Fechar',
      'modal.privacy.title': 'POLÍTICA DE PRIVACIDADE',
      
      // Forms
      'form.success.title': 'MENSAGEM RECEBIDA!',
      'form.success.message': 'Obrigado pelo teu contacto. A nossa equipa irá responder-te brevemente.',
      'form.success.tagline': 'BE WATER, MY FRIEND.',
      'form.error.name': 'NOME OBRIGATÓRIO. NÃO EXCUSES.',
      'form.error.email': 'EMAIL REAL NECESSÁRIO. AGORA.',
      'form.error.message': 'MENSAGEM VAZIA? SERIAMENTE?',
      'form.error.submit': 'ERRO NO ENVIO. TENTA NOVAMENTE.',
      
      // Language Toggle
      'lang.current': 'PT',
      'lang.switch': 'EN',
      
      // Salgueiro Section
      'salgueiro.title': 'O CRIADOR',
      'salgueiro.name': 'BRUNO SALGUEIRO',
      'salgueiro.alias': '',
      'salgueiro.subtitle': 'DUPLO PROFISSIONAL DE TELEVISÃO E CINEMA | PERSONAL TRAINER CERTIFICADO',
      'salgueiro.career.title': 'CARREIRA',
      'salgueiro.career.p1': 'Bruno Salgueiro é um Duplo Profissional de Televisão e Cinema, com diversos trabalhos não só em Portugal mas a nível internacional nos últimos 16 anos.',
      'salgueiro.career.p2': 'Com um background de artes marciais (Kung-Fu e Kickboxing), Ginástica e Treino de Força, é a conjugação estas áreas por onde passou que lhe deu a preparação física necessária para estar \'pronto para tudo\', no seio da sua profissão.',
      'salgueiro.career.p3': 'Personal Trainer certificado desde 2012.',
      'salgueiro.career.imdb': 'VER FILMOGRAFIA IMDB',
      'salgueiro.dicas.title': 'DICAS DO SALGUEIRO',
      'salgueiro.dicas.p1': 'Co-criou há 11 anos (2013) a Plataforma Dicas do Salgueiro, um canal de YouTube (mais tarde presente em todas as redes sociais mais relevantes) com o seu sócio Luís Piçarra (Produção) onde partilha dicas de treino e motivação, que conta já com cerca de 400 mil seguidores só no YouTube e mais de 49 milhões de visualizações. Mais recentemente, criou a plataforma inglesa <a href="https://www.instagram.com/thebrucewillow/" target="_blank" rel="noopener noreferrer" class="dicas-link">Bruce Willow</a>, com o mesmo propósito.',
      'salgueiro.bewater.title': 'HOJE - BE WATER',
      'salgueiro.bewater.p1': 'Decidiu aplicar essa visão e com as devidas adaptações ao público geral, de forma a fomenter que TODOS consigam estar na sua melhor forma, não apenas a nível estético mas performativo.',
      'salgueiro.bewater.p2': 'E com vista a reduzir a distância entre o digital e o real, cumpre o seu sonho de ter um espaço aberto ao público. Nasceu em 2025 o BE WATER, um centro de treino onde todos se possam motivar e crescer juntos, não só fisicamente como mental e espiritualmente.',
      'salgueiro.social.followers': 'SEGUIDORES',
      
      // Salgueiro Gallery Captions
      'salgueiro.gallery.caption.1': 'FORÇA ATRAVÉS DA DISCIPLINA',
      'salgueiro.gallery.caption.2': 'MESTRE EM ACÇÃO - TREINO INTENSO',
      'salgueiro.gallery.caption.3': 'A ARTE DA GUERRA INTERIOR',
      'salgueiro.gallery.caption.4': 'CAMINHO DO GUERREIRO MODERNO',
      'salgueiro.gallery.caption.5': 'MENTE, CORPO E ESPÍRITO UNIDOS',
      'salgueiro.gallery.caption.6': 'TRADIÇÃO E INOVAÇÃO EM HARMONIA',
      'salgueiro.gallery.caption.7': 'O DOJO: ESPAÇO SAGRADO DE CRESCIMENTO',
      'salgueiro.gallery.caption.8': 'TÉCNICA PERFEITA ATRAVÉS DA REPETIÇÃO',
      'salgueiro.gallery.caption.9': 'O PODER DA CONCENTRAÇÃO ABSOLUTA',
      'salgueiro.gallery.caption.10': 'PREPARAÇÃO TOTAL PARA TODOS OS DESAFIOS',
      
      // Trainers Section
      'trainers.title': 'TREINADORES',
      'trainers.bruno.name': 'BRUNO SALGUEIRO',
      'trainers.bruno.specialty': 'Fundador & Head Coach',
      'trainers.bruno.bio': 'Duplo profissional de televisão e cinema com 16 anos de experiência. Background em artes marciais, ginástica e treino de força. Criador da plataforma "Dicas do Salgueiro".',
      'trainers.jorge.name': 'JORGE SEGURADO',
      'trainers.jorge.specialty': 'Preparador Físico',
      'trainers.jorge.bio': 'Ex-seleção nacional de Rugby e preparador físico com vasta experiência no desporto de alto rendimento. Licenciado em Treino Desportivo pela Universidade Lusófona. Especialista em desenvolvimento de força e condicionamento atlético.',
      'trainers.luis.name': 'LUÍS CATARINO',
      'trainers.luis.specialty': 'Performance Coach & Formador',
      'trainers.luis.bio': 'Performance Coach no Sport Lisboa e Benfica com 9 anos de experiência no desporto de alto rendimento. Mestrado em Biocinética e Performance Specialist pela EXOS. Formador especializado em metodologia do treino desportivo.',
      'trainers.ines.name': 'INÊS PIRES',
      'trainers.ines.specialty': 'Strength & Conditioning Coach & Investigadora',
      'trainers.ines.bio': 'S&C Coach no Sport Lisboa e Benfica com experiência em diversas modalidades do alto rendimento. Mestrado em Treino de Alto Rendimento, Pós-Graduação em S&C e Performance Specialist pela EXOS. Doutoranda em Educação Física e Desporto na Universidade Lusófona.',
      'trainers.joaquim.name': 'JOAQUIM COELHO',
      'trainers.joaquim.specialty': 'Fisioterapeuta & S&C',
      'trainers.joaquim.bio': 'Fisioterapeuta com experiência no desporto de alto rendimento, especializado em reabilitação, prevenção de lesões e performance física. Trabalha com atletas na melhoria das qualidades físicas e redução do risco de lesão.',
      'trainers.morgado.name': 'LUÍS MORGADO',
      'trainers.morgado.specialty': 'Professor de Surf & CrossFit',
      'trainers.morgado.bio': 'Professor de surf e especialista em CrossFit e treino funcional. Combina a filosofia aquática com movimentos funcionais para um treino completo e desafiante.',
      'trainers.lourenco.name': 'LOURENÇO SANTOS',
      'trainers.lourenco.specialty': 'Personal Trainer & Coach de Corrida',
      'trainers.lourenco.bio': 'Licenciado em Educação Física e Desporto e mestrando em Exercício e Saúde na Faculdade de Motricidade Humana. Ex-atleta de karaté e atletismo, foi também treinador de vela. Com dez anos de treino de ginásio, dedica-se à fisiologia do exercício clínico e ao aperfeiçoamento da corrida.',
      'trainers.alexandre.name': 'ALEXANDRE IZIDRO',
      'trainers.alexandre.specialty': 'Mestre de Jiu-Jitsu',
      'trainers.alexandre.bio': 'Faixa-preta 6.º grau e mestre da Icon Jiu-Jitsu Lisboa com mais de 25 anos de experiência. Ex-lutador profissional, foi 3.º no Campeonato do Mundo e campeão Cage Warriors. Especialista em defesa pessoal e performance marcial.',
      'trainers.carlos.name': 'CARLOS FERNANDES',
      'trainers.carlos.specialty': 'Treinador de Boxe & Fundador Spartacus CF',
      'trainers.carlos.bio': 'Treinador de boxe certificado pelo IPDJ com mais de nove anos de experiência. Conta com 200 combates como treinador e é fundador da equipa Spartacus CF Boxing.',
      
      // Trainer Certifications
      'trainers.bruno.cert1': 'PT certificado',
      'trainers.bruno.cert2': 'Kung-Fu & Kickboxing',
      'trainers.bruno.cert3': 'Duplo Profissional',
      'trainers.jorge.cert1': 'Ex-Seleção Nacional Rugby',
      'trainers.jorge.cert2': 'Preparador Físico',
      'trainers.jorge.cert3': 'Strength & Conditioning',
      'trainers.luis.cert1': 'Performance Coach SL Benfica',
      'trainers.luis.cert2': 'Mestrado Biocinética',
      'trainers.luis.cert3': 'EXOS Performance Specialist',
      'trainers.ines.cert1': 'S&C Coach SL Benfica',
      'trainers.ines.cert2': 'Mestrado Treino Alto Rendimento',
      'trainers.ines.cert3': 'EXOS Performance Specialist',
      'trainers.joaquim.cert1': 'Fisioterapia Desportiva',
      'trainers.joaquim.cert2': 'S&C',
      'trainers.joaquim.cert3': 'Reabilitação Funcional',
      'trainers.morgado.cert1': 'Professor de Surf',
      'trainers.morgado.cert2': 'CrossFit Level 2',
      'trainers.morgado.cert3': 'Treino Funcional',
      'trainers.lourenco.cert1': 'Personal Training',
      'trainers.lourenco.cert2': 'Coach de Corrida',
      'trainers.lourenco.cert3': 'Fisiologia do Exercício',
      'trainers.alexandre.cert1': 'Faixa-preta 6.º grau',
      'trainers.alexandre.cert2': 'Ex-lutador profissional',
      'trainers.alexandre.cert3': 'Campeão Cage Warriors',
      'trainers.carlos.cert1': 'Curso Treinador Boxe IPDJ',
      'trainers.carlos.cert2': 'Fundador Spartacus CF Boxing',
      'trainers.carlos.cert3': '200 Combates como Treinador',
      
      // Contact Section
      'contact.title': 'CONTACTO',
      'contact.address.title': 'ONDE ESTAMOS',
      'contact.address.text': 'Av. do Brasil 7<br>1700-062 Lisboa',
      'contact.hours.title': 'HORÁRIO',
      'contact.hours.weekdays': 'SEG-6ª:',
      'contact.hours.weekdays.time': '7H-21H',
      'contact.hours.weekdays.note': '(disponível em horário de aulas)',
      'contact.hours.saturday': 'SÁB:',
      'contact.hours.saturday.time': '10H-13H',
      'contact.hours.saturday.note': '(disponível em horário de aulas)',
      'contact.parking.title': 'ONDE ESTACIONAR',
      'contact.parking.text': 'Queres saber onde estacionar? Tens um parque público mesmo ao lado! 🚗',
      'contact.social.title': 'SEGUE-NOS',
      'contact.form.name': 'NOME',
      'contact.form.email': 'EMAIL',
      'contact.form.phone': 'TELEMÓVEL',
      'contact.form.message': 'MENSAGEM',
      'contact.form.submit': 'ENVIAR MENSAGEM',
      
      // Footer
      'footer.tagline': 'Flow like water, strike like lightning.',
      'footer.nav.title': 'NAVEGAÇÃO',
      'footer.newsletter.title': 'NEWSLETTER',
      'footer.newsletter.placeholder': 'O teu email',
      'footer.newsletter.submit': 'SUBSCREVER',
      'footer.legal.privacy': 'Política de Privacidade',
      'footer.copyright': '© 2025 BE WATER. TODOS OS DIREITOS RESERVADOS.',
      
      // Plan Modals
      'modal.elite.title': 'PLANO ELITE',
      'modal.elite.access': 'Acesso livre trânsito (ilimitado) a todas as modalidades e open gym',
      'modal.elite.commitment': 'Sem fidelização',
      'modal.elite.billing': 'Pagas hoje: 1ª mensalidade (proporcional) + quota anual e seguro (25€). A partir daí, mensalidade completa no dia 1 de cada mês',
      'modal.rise.title': 'PLANO RISE',
      'modal.rise.access': 'Acesso 3x por semana a todas as modalidades e open gym',
      'modal.rise.commitment': 'Sem fidelização',
      'modal.rise.billing': 'Pagas hoje: 1ª mensalidade (proporcional) + quota anual e seguro (25€). A partir daí, mensalidade completa no dia 1 de cada mês',
      'modal.starter.title': 'PLANO STARTER',
      'modal.starter.access': 'Acesso 2x por semana a todas as modalidades e open gym',
      'modal.starter.commitment': 'Sem fidelização',
      'modal.starter.billing': 'Pagas hoje: 1ª mensalidade (proporcional) + quota anual e seguro (25€). A partir daí, mensalidade completa no dia 1 de cada mês',
      
      // Drop-in Modal
      'modal.dropin.title': 'AULA AVULSA',
      'modal.dropin.access': 'Aula avulsa única',
      'modal.dropin.test': 'Compra apenas 1 aula sem compromisso',
      'modal.dropin.access_all': 'Acesso a todas as modalidades e open gym',
      'modal.dropin.ideal': 'Sem mensalidade - pagas apenas pela aula',
      'modal.dropin.step1': 'Escolhe o número de pessoas que vão fazer drop-in e preenche os teus dados 👥',
      'modal.dropin.step2': 'Escolhe o dia e hora e que aula queres fazer 📅',
      'modal.dropin.step3': 'Confirma a reserva e faz o pagamento ✅',
      

      
      // Purchase Instructions
      'modal.purchase.title': 'Como comprar o teu pack:',
      'modal.purchase.step1': 'Escolhe a <strong>data de início</strong> 📅',
      'modal.purchase.step2': 'Click no <strong>VALOR TOTAL</strong> 💰',
      'modal.purchase.step3': 'Preenche os teus dados 📱',
      'modal.purchase.step4': 'Escolhe a forma de pagamento preferida para finalizar a inscrição! 💳',
      
      // Privacy Policy Modal
      'modal.privacy.title': 'POLÍTICA DE PRIVACIDADE',
      'modal.privacy.info.title': 'INFORMAÇÃO EMPRESARIAL',
      'modal.privacy.info.name': 'Denominação:',
      'modal.privacy.info.tax': 'NIPC:',
      'modal.privacy.info.address': 'Morada:',
      'modal.privacy.data.title': 'RECOLHA E TRATAMENTO DE DADOS',
      'modal.privacy.data.text': 'A ASSOCIAÇÃO SÊ COMO ÁGUA recolhe e trata dados pessoais de acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD) e demais legislação aplicável.',
      'modal.privacy.purposes.title': 'FINALIDADES',
      'modal.privacy.purposes.text': 'Os dados pessoais recolhidos destinam-se a:',
      'modal.privacy.purposes.registration': 'Gestão de pré-inscrições e inscrições no ginásio',
      'modal.privacy.purposes.communication': 'Comunicação com os clientes e potenciais clientes',
      'modal.privacy.purposes.newsletter': 'Envio de newsletter e informações promocionais',
      'modal.privacy.purposes.legal': 'Cumprimento de obrigações legais',
      'modal.privacy.rights.title': 'DIREITOS DOS TITULARES',
      'modal.privacy.rights.text': 'Os titulares dos dados têm direito ao acesso, retificação, apagamento, limitação do tratamento, portabilidade e oposição ao tratamento dos seus dados pessoais.',
      'modal.privacy.contact.title': 'CONTACTO',
      'modal.privacy.contact.text': 'Para exercer os seus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, contacte-nos através dos meios disponibilizados na seção de contacto do website.'
    },
    en: {
      // Meta tags
      'meta.title': 'BE WATER | Flow Like Water, Strike Like Lightning',
      'meta.description': 'BE WATER - Training center inspired by Bruce Lee philosophy. Functional training, martial arts and personal development in Lisbon. Founded by Bruno Salgueiro.',
      
      // Header Navigation
      'header.logo.tagline': 'by Bruce Willow',
      'nav.gym': 'GYM',
      'nav.pricing': 'PRICING',
      'nav.schedule': 'SCHEDULE',
      'nav.salgueiro': 'SALGUEIRO',
      'nav.trainers': 'TRAINERS',
      'nav.faq': 'FAQ',
      'nav.contact': 'CONTACT',
      
      // Hero Section
      'hero.title': 'BE WATER,<br>MY FRIEND',
      'hero.subtitle': 'Develop your strength, agility and flexibility in a space that reflects the "be water" philosophy popularized by Bruce Lee. Come be part of this flow.',
      'hero.cta': 'JOIN NOW',
      
      
      // About Section
      'gym.hero.title': 'THE TRAINING<br>CENTER',
      'about.title': 'MEET THE SPACE',
      'about.lead': 'Come train with Bruno Salgueiro (aka <a href="https://www.instagram.com/thebrucewillow/" target="_blank" rel="noopener noreferrer" class="dicas-link">Bruce Willow</a>), known for being the face behind <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a>, and work directly with his personally selected team of trainers.',
      'about.secondary': '<span class="brand-highlight">BE WATER</span> - Your club in the center of Lisbon with 3 distinct zones: A social lounge and co-working space, a physical training gym with group classes and open gym, and a dojo dedicated to martial arts and meditation practice. Join this community!',
      
      // Gym Section
      'gym.collage.mobile.instruction': '👈 Swipe to see more photos 👉',
      
      // Pricing Section
      'pricing.title': 'PRICING<br><span class="early-bird-text">EARLY BIRD</span>',
      'pricing.promo': 'Limited time launch offer!',
      'pricing.period': '/month',
      'pricing.test.note': '<strong>TEST FIRST, DECIDE LATER!</strong><br><a href="#contact" class="test-note__link">Click here</a> to use the contact form and schedule your visit.',
      'pricing.elite.title': 'ELITE',
      'pricing.elite.price': '€84.90',
      'pricing.elite.original': '€94.90',
      'pricing.elite.cta': 'JOIN NOW',
      'pricing.elite.feature1': 'Unlimited access to all modalities and open gym',
      'pricing.elite.feature2': 'No commitment',
      'pricing.elite.feature3': 'The first month\'s fee is charged only from the date you start training',
      'pricing.rise.title': 'RISE',
      'pricing.rise.price': '€69.90',
      'pricing.rise.original': '€79.90',
      'pricing.rise.cta': 'JOIN NOW',
      'pricing.rise.feature1': '3x per week access to all modalities and open gym',
      'pricing.rise.feature2': 'No commitment',
      'pricing.rise.feature3': 'The first month\'s fee is charged only from the date you start training',
      'pricing.starter.title': 'STARTER',
      'pricing.starter.price': '€54.90',
      'pricing.starter.original': '€64.90',
      'pricing.starter.cta': 'JOIN NOW',
      'pricing.starter.feature1': '2x per week access to all modalities and open gym',
      'pricing.starter.feature2': 'No commitment',
      'pricing.starter.feature3': 'The first month\'s fee is charged only from the date you start training',
      'pricing.badge': 'EARLY BIRD',
      
      // Drop-in pricing
      'pricing.dropin.period': '/class',
      'pricing.dropin.feature1': 'Single drop-in class',
      'pricing.dropin.feature2': 'Buy just 1 class without commitment',
      'pricing.dropin.feature3': 'Access to all modalities and open gym',
      'pricing.dropin.feature4': 'No monthly fee - pay only for the class',
      'pricing.dropin.cta': 'BOOK CLASS',
      
      // Schedule Section
      'schedule.title': 'SCHEDULE & ACTIVITIES',
      'schedule.mobile.instruction': '👈 Swipe to see all days 👉',
      'schedule.days.mon': 'MON',
      'schedule.days.tue': 'TUE',
      'schedule.days.wed': 'WED',
      'schedule.days.thu': 'THU',
      'schedule.days.fri': 'FRI',
      'schedule.days.sat': 'SAT',
      'schedule.days.sun': 'SUN',
      'schedule.activities.boxe': 'BOXING',
      'schedule.activities.closed': 'CLOSED',
      'schedule.rest.text': 'REST DAY',
      'schedule.rest.subtitle': 'BE WATER, REST DEEP',
      'schedule.legend.opengym': 'Free access to the entire gym: functional training area, dojo, boxing bags, bars, dumbbells and mats. Train your way!',
      'schedule.legend.bewater': 'Complete functional training that combines strength, conditioning, calisthenics and hybrid techniques. The most challenging workout to turn you into a machine!',
      'schedule.legend.lonewarrior': 'Minimalist express training with bodyweight, dumbbells and bands. Intense, fast and no excuses - ideal to repeat anywhere.',
      'schedule.legend.jiujitsu': 'Traditional martial art focused on ground techniques, self-defense and physical and mental conditioning in our specialized dojo.',
      'schedule.legend.boxe': 'Boxing training focused on technique, cardiovascular conditioning and strength. Use the heavy bags and develop power and agility.',
      'schedule.legend.closed': 'Gym closed for lunch break. We reopen at 4:30 PM!',
      'schedule.note.beta': '<strong>🌊 Beta Phase Schedule:</strong> We are in summer season and still in testing and fine-tuning phase of activities. The schedules presented are initial and may be adjusted according to the BE WATER community response and club dynamics optimization.',
      'schedule.note.events': '<strong>Note:</strong> We will also frequently have surprise activities and training, cultural and social events at the club.',
      
      // Salgueiro Section
      'salgueiro.title': 'BRUNO SALGUEIRO',
      'salgueiro.subtitle': 'Founder & Creator of "Dicas do Salgueiro"',
      
      // Trainers Section
      'trainers.title': 'TRAINERS',
      'trainers.bruno.name': 'BRUNO SALGUEIRO',
      'trainers.bruno.specialty': 'Founder & Head Coach',
      'trainers.bruno.bio': 'Double professional in television and cinema with 16 years of experience. Background in martial arts, gymnastics and strength training. Creator of "Dicas do Salgueiro" platform.',
      'trainers.jorge.name': 'JORGE SEGURADO',
      'trainers.jorge.specialty': 'Strength & Conditioning Coach',
      'trainers.jorge.bio': 'Former national Rugby team player and strength coach with extensive experience in high-performance sport. Degree in Sports Training from Lusófona University. Specialist in strength and athletic conditioning development.',
      'trainers.luis.name': 'LUÍS CATARINO',
      'trainers.luis.specialty': 'Performance Coach & Trainer',
      'trainers.luis.bio': 'Performance Coach at Sport Lisboa e Benfica with 9 years of experience in high-performance sport. Master\'s in Biokinetics and Performance Specialist by EXOS. Trainer specialized in sports training methodology.',
      'trainers.ines.name': 'INÊS PIRES',
      'trainers.ines.specialty': 'Strength & Conditioning Coach & Researcher',
      'trainers.ines.bio': 'S&C Coach at Sport Lisboa e Benfica with experience in various high-performance sports. Master\'s in High Performance Training, Post-graduate in S&C and Performance Specialist by EXOS. PhD student in Physical Education and Sport at Lusófona University.',
      
      // FAQ Section
      'faq.title': 'FAQ',
      'faq.section.training': 'TRAINING',
      'faq.section.pricing': 'PRICING',
      'faq.section.facilities': 'TRAINING CENTER',
      'faq.section.support': 'SUPPORT',
      'faq.question.1': 'What activities can I practice?',
      'faq.answer.1': '<strong>Be Water functional training</strong>, <strong>Lone Warrior express workouts</strong>, <strong>Jiu-Jitsu</strong>, <strong>Boxing</strong> and <strong>open gym</strong> access in three zones (studio, dojo and lounge).',
      'faq.question.2': 'Is there a minimum age?',
      'faq.answer.2': 'We recommend <strong>16 years old</strong> (minors need <strong>authorization</strong>).',
      'faq.question.3': 'Where is the training center and what are the hours?',
      'faq.answer.3': '<strong>Avenida do Brasil 7, 1700-062 Lisboa.</strong><br>Open <strong>Mon-Fri 07:00-21:00</strong> and <strong>Sat 10:00-13:00</strong>; <strong>closed on Sundays</strong>.',
      'faq.question.4': 'How much do I pay to sign up?',
      'faq.answer.4': '<strong>One-time registration fee (+ annual fee and insurance): 25 €.</strong><br><br>Three monthly plans <strong>without commitment</strong>:<br><br><strong>Elite – 94,90 €/month</strong> (unlimited use)<br><strong>Rise – 79,90 €/month</strong> (3×/week)<br><strong>Starter – 64,90 €/month</strong> (2×/week)',
      'faq.question.5': 'Can I cancel or pause?',
      'faq.answer.5': 'You can leave <strong>whenever you want without penalty</strong>; upon returning, a small <strong>reactivation fee</strong> may be charged.',

      'faq.question.7': 'Practical cost example',
      'faq.answer.7': 'Rise plan (79,90 €/month), starting August 15th (17 days to train in a 31-day month):<br><br>Registration + annual fee and insurance: 25 €<br>Proportional monthly fee: 79,90 € × 17/31 ≈ 43,82 €<br><strong>Total on registration day: 68,82 €.</strong><br><br>On September 1st, the full amount of 79,90 € will be charged',
      'faq.question.8': 'Do I need previous experience to start?',
      'faq.answer.8': '<strong>No!</strong> All workouts are <strong>adapted to your level</strong>. Our trainers help you <strong>progress gradually</strong>.',
      'faq.question.9': 'How do group classes work?',
      'faq.answer.9': 'Classes have <strong>fixed schedules</strong> and <strong>limited groups</strong>. You can book through the <strong>app</strong> or at the <strong>front desk</strong>.',
      'faq.question.10': 'Can I try before signing up?',
      'faq.answer.10': '<strong>Yes!</strong> We offer a <strong>free trial class</strong> so you can experience our training method.',
      'faq.question.11': 'What\'s the difference between plans?',
      'faq.answer.11': '<strong>Starter (64,90€):</strong> 2× per week<br><strong>Rise (79,90€):</strong> 3× per week<br><strong>Elite (94,90€):</strong> Unlimited use',
      'faq.question.12': 'Do you have parking?',
      'faq.answer.12': 'We have EMEL parking zone in the back. More information in the <strong>CONTACT section</strong>.',
      'faq.question.13': 'Do you have showers and locker rooms?',
      'faq.answer.13': '<strong>Yes</strong>, we have <strong>male and female locker rooms</strong> with <strong>showers</strong>, <strong>lockers</strong> and all amenities.',
      'faq.question.14': 'What is BeWater Training?',
      'faq.answer.14': 'BeWater Training is <strong>CrossTraining/Hybrid Training</strong>.<br>The idea is to combine various aspects of physical preparation to make our students the <strong>most complete and capable athletes</strong>. We thus merge the fundamentals of <strong>Strength Training</strong>, <strong>Explosiveness and Speed</strong>, <strong>Endurance</strong>, <strong>Hypertrophy</strong>, <strong>Calisthenics</strong> and <strong>Mobility</strong>.<br><br>Sounds too good to be true? Well, there are proven ways to put the pieces together in this weekly programming puzzle, <strong>without hurting or overdoing any of the areas</strong>.<br><br>An example of two sessions could be something like:<br><br><strong>DAY 1:</strong><br>- Warm-up<br>- Explosive work (jumps/ball throws, sprints with or without sled)<br>- Main strength exercise, perhaps coupled with Core work<br>- Hypertrophy and Accessory work<br>- Final Circuit<br><br><strong>DAY 2:</strong><br>- Warm-up<br>- Running technique work (Footwork)<br>- Running series coupled with Core work<br>- 10-15 minutes of Mobility<br><br>Of course these are just \'samples\' but you get a general idea of our approach. <strong>Try it and you won\'t regret it!</strong><br><br>It remains to say that each day will always have the <strong>same Class Menu</strong>, leaving the Warm-up and Accessories to the taste and experience of each trainer. We like <strong>fluidity and adaptation</strong> in reading the room, nothing should ever be too prescriptive.',
      'faq.question.15': 'So what\'s the difference between this and CrossFit?',
      'faq.answer.15': 'All Trainers have somehow been through <strong>CrossFit</strong>, which was an excellent school of class model and communication. As for methodology, things change quite a bit here. Some examples of CrossFit that we <strong>won\'t do here</strong>, or <strong>will do differently</strong>:<br><br>- CrossFit generally doesn\'t repeat weeks. <strong>We repeat</strong>, to ensure <strong>consistency and linear progression</strong><br>- We won\'t do weightlifting with a time component and prefer to opt for <strong>pure explosive exercises</strong> (throws, plyometrics, sprints)<br>- We will give <strong>greater emphasis to hypertrophy</strong> and some muscle isolation, because without optimized pieces, the whole may not be so fluid<br>- The Skill level of circuit exercises will be <strong>low, to avoid injury risk</strong><br>- <strong>We won\'t do kippings</strong> - it doesn\'t matter to have 10 Kipping Pull-ups and not even one Strict. That\'s pure strength deficit.<br>- Not everything we do is observable, comparable and repeatable. There are many exercises and movement explorations that don\'t follow a \'mathematics\' but <strong>make us more capable and creative</strong>.<br><br>Just a few examples. We\'ll be happy to elaborate, live.',
      'faq.question.16': 'This seems a bit \'heavy\'/difficult. Can anyone do it?',
      'faq.answer.16': 'Given the <strong>technical Coaching</strong>, the moderate to low frequency of students per class (it\'s not a studio for 30 people/class) and the <strong>suggested load adaptations</strong>, <strong>everyone can do these classes</strong>, adapting and leveling the exercises and objectives. However, we <strong>ALWAYS</strong> appreciate you communicating any <strong>injury or issue</strong> that bothers you. A separate intervention may be necessary and we\'ll be here to help you. We even have a <strong>physiotherapist on Staff</strong>.',
      'faq.question.17': 'What is Lone Warrior Training?',
      'faq.answer.17': 'This training is a <strong>shorter version (45 minutes)</strong> and uses less equipment than the BeWater Day Training. It will be more based on <strong>bodyweight</strong>, <strong>dumbbells</strong>, <strong>elastic bands</strong> and other equipment that can be used more easily at <strong>home/hotel</strong>. It\'s a workout that will also be <strong>recorded for a private link</strong>, which will always be shared with all our members. So, if you\'re away for a few days, you have a resource to <strong>work remotely</strong> and still aligned with the weekly programming.',
      'faq.question.18': 'I have other questions, how can I contact?',
      'faq.answer.18': 'For any additional questions, <strong>contact us through the website</strong>. We have a <strong>contact section</strong> where you can send us your questions and we will respond as quickly as possible.',
      
      // Contact Section
      'contact.title': 'CONTACT',
      'contact.address.title': 'WHERE WE ARE',
      'contact.address.text': 'Av. do Brasil 7<br>1700-062 Lisboa',
      'contact.hours.title': 'SCHEDULE',
      'contact.hours.weekdays': 'MON-FRI:',
      'contact.hours.weekdays.time': '7AM-9PM',
      'contact.hours.weekdays.note': '(available during class hours)',
      'contact.hours.saturday': 'SAT:',
      'contact.hours.saturday.time': '10AM-1PM',
      'contact.hours.saturday.note': '(available during class hours)',
      'contact.parking.title': 'WHERE TO PARK',
      'contact.parking.text': 'Want to know where to park? You have a public parking right next door! 🚗',
      'contact.social.title': 'FOLLOW US',
      'contact.form.name': 'NAME',
      'contact.form.email': 'EMAIL',
      'contact.form.phone': 'PHONE',
      'contact.form.message': 'MESSAGE',
      'contact.form.submit': 'SEND MESSAGE',
      
      // Footer
      'footer.tagline': 'Flow like water, strike like lightning.',
      'footer.nav.title': 'NAVIGATION',
      'footer.newsletter.title': 'NEWSLETTER',
      'footer.newsletter.placeholder': 'Your email',
      'footer.newsletter.btn': 'SUBSCRIBE',
      'footer.privacy': 'Privacy Policy',
      'footer.copyright': '© 2025 BE WATER. ALL RIGHTS RESERVED.',
      
      // Modals
      'modal.close': 'Close',
      'modal.privacy.title': 'PRIVACY POLICY',
      
      // Forms
      'form.success.title': 'MESSAGE RECEIVED!',
      'form.success.message': 'Thank you for your contact. Our team will respond to you shortly.',
      'form.success.tagline': 'BE WATER, MY FRIEND.',
      'form.error.name': 'NAME REQUIRED. NO EXCUSES.',
      'form.error.email': 'REAL EMAIL NEEDED. NOW.',
      'form.error.message': 'EMPTY MESSAGE? SERIOUSLY?',
      'form.error.submit': 'SEND ERROR. TRY AGAIN.',
      
      // Language Toggle
      'lang.current': 'EN',
      'lang.switch': 'PT',
      
      // Salgueiro Section
      'salgueiro.title': 'THE CREATOR',
      'salgueiro.name': 'BRUNO SALGUEIRO',
      'salgueiro.alias': 'aka Bruce Willow',
      'salgueiro.subtitle': 'TELEVISION AND CINEMA PROFESSIONAL STUNT DOUBLE | CERTIFIED PERSONAL TRAINER',
      'salgueiro.career.title': 'CAREER',
      'salgueiro.career.p1': 'Bruno Salgueiro is a Professional Stunt Double for Television and Cinema, with diverse work not only in Portugal but internationally over the past 16 years.',
      'salgueiro.career.p2': 'With a background in martial arts (Kung-Fu and Kickboxing), Gymnastics and Strength Training, it is the combination of these areas that gave him the physical preparation necessary to be \'ready for everything\' in his profession.',
      'salgueiro.career.p3': 'Certified Personal Trainer since 2012.',
      'salgueiro.career.imdb': 'VIEW IMDB FILMOGRAPHY',
      'salgueiro.dicas.title': 'DICAS DO SALGUEIRO',
      'salgueiro.dicas.p1': 'Co-created 11 years ago (2013) the Dicas do Salgueiro Platform, a YouTube channel (later present on all relevant social networks) with his partner Luís Piçarra (Production) where he shares training tips and motivation, which already has about 400 thousand followers on YouTube alone and over 49 million views. More recently, created the english platform <a href="https://www.instagram.com/thebrucewillow/" target="_blank" rel="noopener noreferrer" class="dicas-link">Bruce Willow</a>, with the same purpose in mind.',
      'salgueiro.bewater.title': 'TODAY - BE WATER',
      'salgueiro.bewater.p1': 'He decided to apply this vision and with the appropriate adaptations to the general public, in order to encourage EVERYONE to be in their best shape, not only aesthetically but also performatively.',
      'salgueiro.bewater.p2': 'And with a view to reducing the distance between digital and real, he fulfills his dream of having a space open to the public. Born in 2025, BE WATER, a training center where everyone can motivate and grow together, not only physically but also mentally and spiritually.',
      'salgueiro.social.followers': 'FOLLOWERS',
      
      // Salgueiro Gallery Captions
      'salgueiro.gallery.caption.1': 'STRENGTH THROUGH DISCIPLINE',
      'salgueiro.gallery.caption.2': 'MASTER IN ACTION - INTENSE TRAINING',
      'salgueiro.gallery.caption.3': 'THE ART OF INNER WAR',
      'salgueiro.gallery.caption.4': 'PATH OF THE MODERN WARRIOR',
      'salgueiro.gallery.caption.5': 'MIND, BODY AND SPIRIT UNITED',
      'salgueiro.gallery.caption.6': 'TRADITION AND INNOVATION IN HARMONY',
      'salgueiro.gallery.caption.7': 'THE DOJO: SACRED SPACE OF GROWTH',
      'salgueiro.gallery.caption.8': 'PERFECT TECHNIQUE THROUGH REPETITION',
      'salgueiro.gallery.caption.9': 'THE POWER OF ABSOLUTE CONCENTRATION',
      'salgueiro.gallery.caption.10': 'TOTAL PREPARATION FOR ALL CHALLENGES',
      
      // Trainers Section
      'trainers.title': 'TRAINERS',
      'trainers.bruno.name': 'BRUNO SALGUEIRO',
      'trainers.bruno.specialty': 'Founder & Head Coach',
      'trainers.bruno.bio': 'Professional stunt double for television and cinema with 16 years of experience. Background in martial arts, gymnastics and strength training. Creator of the "Dicas do Salgueiro" platform.',
      'trainers.jorge.name': 'JORGE SEGURADO',
      'trainers.jorge.specialty': 'Physical Conditioner',
      'trainers.jorge.bio': 'Former national rugby team player and physical trainer with extensive experience in high-performance sports. Degree in Sports Training from Lusófona University. Specialist in strength development and athletic conditioning.',
      'trainers.luis.name': 'LUÍS CATARINO',
      'trainers.luis.specialty': 'Performance Coach & Trainer',
      'trainers.luis.bio': 'Performance Coach at Sport Lisboa e Benfica with 9 years of experience in high-performance sports. Master\'s in Biokinetics and Performance Specialist at EXOS. Specialist trainer in sports training methodology.',
      'trainers.ines.name': 'INÊS PIRES',
      'trainers.ines.specialty': 'Strength & Conditioning Coach & Researcher',
      'trainers.ines.bio': 'S&C Coach at Sport Lisboa e Benfica with experience in various high-performance sports. Master\'s in High Performance Training, Post-Graduation in S&C and Performance Specialist at EXOS. PhD student in Physical Education and Sports at Lusófona University.',
      'trainers.joaquim.name': 'JOAQUIM COELHO',
      'trainers.joaquim.specialty': 'Physiotherapist & S&C',
      'trainers.joaquim.bio': 'Physiotherapist with experience in high-performance sports, specialized in rehabilitation, injury prevention and physical performance. Works with athletes to improve physical qualities and reduce injury risk.',
      'trainers.morgado.name': 'LUÍS MORGADO',
      'trainers.morgado.specialty': 'Surf Instructor & CrossFit',
      'trainers.morgado.bio': 'Surf instructor and specialist in CrossFit and functional training. Combines aquatic philosophy with functional movements for a complete and challenging workout.',
      'trainers.lourenco.name': 'LOURENÇO SANTOS',
      'trainers.lourenco.specialty': 'Personal Trainer & Running Coach',
      'trainers.lourenco.bio': 'Degree in Physical Education and Sports and Master\'s student in Exercise and Health at the Faculty of Human Kinetics. Former karate and athletics athlete, was also a sailing coach. With ten years of gym training, he dedicates himself to clinical exercise physiology and running improvement.',
      'trainers.alexandre.name': 'ALEXANDRE IZIDRO',
      'trainers.alexandre.specialty': 'Jiu-Jitsu Master',
      'trainers.alexandre.bio': '6th degree black belt and master at Icon Jiu-Jitsu Lisboa with over 25 years of experience. Former professional fighter, was 3rd at the World Championship and Cage Warriors champion. Specialist in personal defense and martial performance.',
      'trainers.carlos.name': 'CARLOS FERNANDES',
      'trainers.carlos.specialty': 'Boxing Trainer & Spartacus CF Founder',
      'trainers.carlos.bio': 'Boxing trainer certified by IPDJ with over nine years of experience. Has 200 fights as a trainer and is founder of the Spartacus CF Boxing team.',
      
      // Trainer Certifications
      'trainers.bruno.cert1': 'Certified PT',
      'trainers.bruno.cert2': 'Kung-Fu & Kickboxing',
      'trainers.bruno.cert3': 'Professional Stunt Double',
      'trainers.jorge.cert1': 'Former National Rugby Team',
      'trainers.jorge.cert2': 'Physical Conditioner',
      'trainers.jorge.cert3': 'Strength & Conditioning',
      'trainers.luis.cert1': 'Performance Coach SL Benfica',
      'trainers.luis.cert2': 'Master\'s in Biokinetics',
      'trainers.luis.cert3': 'EXOS Performance Specialist',
      'trainers.ines.cert1': 'S&C Coach SL Benfica',
      'trainers.ines.cert2': 'Master\'s in High Performance Training',
      'trainers.ines.cert3': 'EXOS Performance Specialist',
      'trainers.joaquim.cert1': 'Sports Physiotherapy',
      'trainers.joaquim.cert2': 'S&C',
      'trainers.joaquim.cert3': 'Functional Rehabilitation',
      'trainers.morgado.cert1': 'Surf Instructor',
      'trainers.morgado.cert2': 'CrossFit Level 2',
      'trainers.morgado.cert3': 'Functional Training',
      'trainers.lourenco.cert1': 'Personal Training',
      'trainers.lourenco.cert2': 'Running Coach',
      'trainers.lourenco.cert3': 'Exercise Physiology',
      'trainers.alexandre.cert1': '6th Degree Black Belt',
      'trainers.alexandre.cert2': 'Former Professional Fighter',
      'trainers.alexandre.cert3': 'Cage Warriors Champion',
      'trainers.carlos.cert1': 'Boxing Trainer Course IPDJ',
      'trainers.carlos.cert2': 'Spartacus CF Boxing Founder',
      'trainers.carlos.cert3': '200 Fights as Trainer',
      
      // Contact Section
      'contact.title': 'CONTACT',
      'contact.address.title': 'WHERE WE ARE',
      'contact.address.text': 'Av. do Brasil 7<br>1700-062 Lisboa',
      'contact.hours.title': 'HOURS',
      'contact.hours.weekdays': 'MON-FRI:',
      'contact.hours.weekdays.time': '7AM-9PM',
      'contact.hours.weekdays.note': '(available during class hours)',
      'contact.hours.saturday': 'SAT:',
      'contact.hours.saturday.time': '10AM-1PM',
      'contact.hours.saturday.note': '(available during class hours)',
      'contact.parking.title': 'WHERE TO PARK',
      'contact.parking.text': 'Want to know where to park? You have a public parking lot right next door! 🚗',
      'contact.social.title': 'FOLLOW US',
      'contact.form.name': 'NAME',
      'contact.form.email': 'EMAIL',
      'contact.form.phone': 'PHONE',
      'contact.form.message': 'MESSAGE',
      'contact.form.submit': 'SEND MESSAGE',
      
      // Footer
      'footer.tagline': 'Flow like water, strike like lightning.',
      'footer.nav.title': 'NAVIGATION',
      'footer.newsletter.title': 'NEWSLETTER',
      'footer.newsletter.placeholder': 'Your email',
      'footer.newsletter.submit': 'SUBSCRIBE',
      'footer.legal.privacy': 'Privacy Policy',
      'footer.copyright': '© 2025 BE WATER. ALL RIGHTS RESERVED.',
      
      // Plan Modals
      'modal.elite.title': 'ELITE PLAN',
      'modal.elite.access': 'Unlimited access to all modalities and open gym',
      'modal.elite.commitment': 'No commitment',
      'modal.elite.billing': 'You pay today: 1st month (proportional) + annual fee and insurance (€25). From then on, full monthly fee on the 1st of each month',
      'modal.rise.title': 'RISE PLAN',
      'modal.rise.access': '3x per week access to all modalities and open gym',
      'modal.rise.commitment': 'No commitment',
      'modal.rise.billing': 'You pay today: 1st month (proportional) + annual fee and insurance (€25). From then on, full monthly fee on the 1st of each month',
      'modal.starter.title': 'STARTER PLAN',
      'modal.starter.access': '2x per week access to all modalities and open gym',
      'modal.starter.commitment': 'No commitment',
      'modal.starter.billing': 'You pay today: 1st month (proportional) + annual fee and insurance (€25). From then on, full monthly fee on the 1st of each month',
      
      // Drop-in Modal
      'modal.dropin.title': 'DROP-IN CLASS',
      'modal.dropin.access': 'Single drop-in class',
      'modal.dropin.test': 'Buy just 1 class without commitment',
      'modal.dropin.access_all': 'Access to all modalities and open gym',
      'modal.dropin.ideal': 'No monthly fee - pay only for the class',
      'modal.dropin.step1': 'Choose the number of people doing drop-in and fill in your details 👥',
      'modal.dropin.step2': 'Choose the day and time and which class you want to take 📅',
      'modal.dropin.step3': 'Confirm the booking and make the payment ✅',
      

      
      // Purchase Instructions
      'modal.purchase.title': 'How to purchase your pack:',
      'modal.purchase.step1': 'Choose your <strong>start date</strong> 📅',
      'modal.purchase.step2': 'Click on <strong>TOTAL AMOUNT</strong> 💰',
      'modal.purchase.step3': 'Fill in your details 📱',
      'modal.purchase.step4': 'Choose your preferred payment method to complete registration! 💳',
      
      // Privacy Policy Modal
      'modal.privacy.title': 'PRIVACY POLICY',
      'modal.privacy.info.title': 'BUSINESS INFORMATION',
      'modal.privacy.info.name': 'Name:',
      'modal.privacy.info.tax': 'Tax ID:',
      'modal.privacy.info.address': 'Address:',
      'modal.privacy.data.title': 'DATA COLLECTION AND PROCESSING',
      'modal.privacy.data.text': 'ASSOCIAÇÃO SÊ COMO ÁGUA collects and processes personal data in accordance with the General Data Protection Regulation (GDPR) and other applicable legislation.',
      'modal.privacy.purposes.title': 'PURPOSES',
      'modal.privacy.purposes.text': 'The personal data collected is intended for:',
      'modal.privacy.purposes.registration': 'Management of gym registrations',
      'modal.privacy.purposes.communication': 'Communication with customers and potential customers',
      'modal.privacy.purposes.newsletter': 'Sending newsletter and promotional information',
      'modal.privacy.purposes.legal': 'Compliance with legal obligations',
      'modal.privacy.rights.title': 'DATA SUBJECTS\' RIGHTS',
      'modal.privacy.rights.text': 'Data subjects have the right to access, rectification, deletion, limitation of processing, portability and opposition to the processing of their personal data.',
      'modal.privacy.contact.title': 'CONTACT',
      'modal.privacy.contact.text': 'To exercise your rights or clarify doubts about the processing of personal data, contact us through the means available in the contact section of the website.'
    }
  };
  
  // Sistema de gestão de idiomas
  class LanguageManager {
    constructor() {
      this.currentLang = this.getStoredLanguage() || this.detectBrowserLanguage();
      this.defaultLang = 'pt';
      this.init();
    }
  
    init() {
      this.createLanguageToggle();
      this.applyLanguage(this.currentLang);
      this.setupEventListeners();
    }
  
    getStoredLanguage() {
      try {
        return localStorage.getItem('be-water-lang');
      } catch (e) {
        return null;
      }
    }
  
    detectBrowserLanguage() {
      // Always default to Portuguese - users can switch to English using the toggle
      return 'pt';
    }
  
    setStoredLanguage(lang) {
      try {
        localStorage.setItem('be-water-lang', lang);
      } catch (e) {
        console.warn('Could not store language preference');
      }
    }
  
    createLanguageToggle() {
      // Criar o toggle de idioma sem alterar o HTML existente
      const headerContainer = document.querySelector('.header__container');
      if (!headerContainer) return;
  
      const langToggle = document.createElement('div');
      langToggle.className = 'language-toggle';
      langToggle.innerHTML = `
        <button class="language-toggle__btn" id="languageToggle" aria-label="Change language">
          <span class="lang-current" data-i18n="lang.current">PT</span>
          <span class="lang-separator">/</span>
          <span class="lang-switch" data-i18n="lang.switch">EN</span>
        </button>
      `;
  
      // Adicionar estilos inline para não alterar CSS existente
      langToggle.style.cssText = `
        display: flex;
        align-items: center;
        margin-left: 1rem;
      `;
  
      const toggleBtn = langToggle.querySelector('.language-toggle__btn');
      toggleBtn.style.cssText = `
        background: none;
        border: 2px solid var(--color-black);
        color: var(--color-black);
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      `;
  
      // Efeito hover
      toggleBtn.addEventListener('mouseenter', () => {
        toggleBtn.style.backgroundColor = 'var(--color-black)';
        toggleBtn.style.color = 'var(--color-white)';
        toggleBtn.style.transform = 'translate(-2px, -2px)';
        toggleBtn.style.boxShadow = '4px 4px 0 var(--color-primary)';
      });
  
      toggleBtn.addEventListener('mouseleave', () => {
        toggleBtn.style.backgroundColor = 'transparent';
        toggleBtn.style.color = 'var(--color-black)';
        toggleBtn.style.transform = 'translate(0, 0)';
        toggleBtn.style.boxShadow = 'none';
      });
  
      // Inserir antes do menu toggle (mobile)
      const menuToggle = headerContainer.querySelector('.header__menu-toggle');
      if (menuToggle) {
        headerContainer.insertBefore(langToggle, menuToggle);
      } else {
        headerContainer.appendChild(langToggle);
      }
  
      // Adicionar estilos responsivos
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 768px) {
          .header__container {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .header__logo {
            order: 2;
            flex: 1;
            display: flex;
            justify-content: center;
          }
          .header__menu-toggle {
            order: 1;
          }
          .language-toggle {
            order: 3;
            margin-left: 0;
            margin-right: 0;
          }
          .language-toggle__btn {
            padding: 0.3rem 0.5rem !important;
            font-size: 0.7rem !important;
            flex-direction: column !important;
            gap: 0 !important;
            line-height: 1 !important;
            min-width: auto !important;
            position: relative !important;
          }
          .language-toggle__btn .lang-separator {
            display: block !important;
            font-size: 0.6rem !important;
            line-height: 1 !important;
            margin: 1px 0 !important;
            text-indent: -9999px !important;
            position: relative !important;
          }
          .language-toggle__btn .lang-separator::before {
            content: "-" !important;
            text-indent: 0 !important;
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  
    setupEventListeners() {
      const toggleBtn = document.getElementById('languageToggle');
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.toggleLanguage();
        });
      }
    }
  
    toggleLanguage() {
      const newLang = this.currentLang === 'pt' ? 'en' : 'pt';
      this.setLanguage(newLang);
    }
  
    setLanguage(lang) {
      if (!translations[lang]) {
        console.warn(`Language ${lang} not supported`);
        return;
      }
  
      this.currentLang = lang;
      this.setStoredLanguage(lang);
      this.applyLanguage(lang);
      this.updateURL(lang);
      this.updateMetaTags(lang);
    }
  
    applyLanguage(lang) {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = this.getTranslation(key, lang);
        
        // Verificar se é um input placeholder
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
          // Esconder elemento se tradução for vazia
          if (translation === '') {
            element.style.display = 'none';
          } else {
            element.style.display = '';
          }
        }
      });
  
      // Atualizar classe do body para CSS específico de idioma
      document.body.className = document.body.className.replace(/lang-\w+/g, '');
      document.body.classList.add(`lang-${lang}`);
  
      // Atualizar atributo lang do HTML
      document.documentElement.lang = lang;
      
      // Disparar evento para components que precisam de atualização manual
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
  
    getTranslation(key, lang = this.currentLang) {
      const langTranslations = translations[lang] || translations[this.defaultLang];
      if (langTranslations.hasOwnProperty(key)) {
        return langTranslations[key];
      }
      if (translations[this.defaultLang].hasOwnProperty(key)) {
        return translations[this.defaultLang][key];
      }
      return key;
    }
  
    updateURL(lang) {
      if (lang !== this.defaultLang) {
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
      } else {
        const url = new URL(window.location);
        url.searchParams.delete('lang');
        window.history.replaceState({}, '', url.toString());
      }
    }
  
    updateMetaTags(lang) {
      // Atualizar título da página
      const title = this.getTranslation('meta.title', lang);
      document.title = title;
  
      // Atualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = this.getTranslation('meta.description', lang);
      }
  
      // Atualizar meta lang
      const metaLang = document.querySelector('meta[name="language"]');
      if (metaLang) {
        metaLang.content = lang;
      } else {
        const newMetaLang = document.createElement('meta');
        newMetaLang.name = 'language';
        newMetaLang.content = lang;
        document.head.appendChild(newMetaLang);
      }
    }
  
    // Método para inicializar com parâmetro URL
    initializeFromURL() {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      
      if (urlLang && translations[urlLang]) {
        this.setLanguage(urlLang);
      }
    }
  }
  
  // Inicializar o sistema quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    
    // Atualizar referência i18n com o LanguageManager inicializado
    window.i18n.t = (key) => window.languageManager.getTranslation(key);
    window.i18n.currentLang = () => window.languageManager.currentLang;
    
    // Inicializar com parâmetro URL se existir
    window.languageManager.initializeFromURL();
  });
  
  // Exportar para uso global
  window.LanguageManager = LanguageManager;
  window.translations = translations;
  
  // Criar referência i18n imediatamente para compatibilidade
  window.i18n = {
    t: (key) => {
      if (window.languageManager) {
        return window.languageManager.getTranslation(key);
      } else if (window.translations) {
        const currentLang = document.documentElement.lang || 'pt';
        if (window.translations[currentLang]?.hasOwnProperty(key)) {
          return window.translations[currentLang][key];
        }
        if (window.translations.pt?.hasOwnProperty(key)) {
          return window.translations.pt[key];
        }
      }
      return key;
    },
    currentLang: () => window.languageManager?.currentLang || 'pt'
  }; 