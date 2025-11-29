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
      'nav.pricing': 'PLANOS',
      'nav.schedule': 'HORÁRIOS',
      'nav.events': 'EVENTOS',
      'nav.salgueiro': 'SALGUEIRO',
      'nav.trainers': 'TREINADORES',
      'nav.faq': 'FAQ',
      'nav.contact': 'CONTACTO',
      
      // Hero Section
      'hero.title': 'BE WATER,<br>MY FRIEND',
      'hero.subtitle': 'O teu clube de treino funcional e artes marciais no centro de Lisboa.',
      'hero.cta_eyebrow': '',
      'hero.cta_main': 'AULA EXPERIMENTAL',
      'hero.benefit1': '✓ Sem Compromisso',
      'hero.benefit2': '',
      'hero.benefit3': '',
      'hero.secondary_text': 'Já conheces os planos?',
      'hero.secondary_link': 'Adere Já',
      
      // Event Section
      'event.eyebrow': 'EVENTO!',
      'event.date.short': 'SÁB., 4 OUT',
      'event.title': 'Evento de Nutrição — 4 OUT (Sábado)',
      'event.text': 'Treino BeWater 15h · Palestra 17h · Convívio no Jardim do Campo Grande',
      'event.cta': 'SABER MAIS E INSCREVER',
      
      
      // About Section
      'gym.hero.title': 'O CENTRO<br>DE TREINO',
      'about.title': 'CONHECE O ESPAÇO',
      'about.lead': 'Vem treinar com o Bruno Salgueiro, conhecido por ser o rosto por detrás das <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a>, e trabalha diretamente com a sua equipa de treinadores pessoalmente selecionada.',
      'about.secondary': '<span class="brand-highlight">BE WATER</span> - O teu clube no centro de Lisboa com 3 zonas distintas: Um lounge de convívio e co-working, um ginásio de treino físico com regime de aulas de grupo e open gym e ainda um dojo dedicado à prática de artes marciais e meditação. Junta-te a esta comunidade!',
      'gym.pillar.1.title': 'DOJO & LUTAS',
      'gym.pillar.1.desc': 'Artes Marciais e Defesa Pessoal.',
      'gym.pillar.2.title': 'GINÁSIO & FUNCIONAL',
      'gym.pillar.2.desc': 'Treino de força e condicionamento.',
      'gym.pillar.3.title': 'LOUNGE & COWORK',
      'gym.pillar.3.desc': 'Comunidade, eventos e trabalho.',
      
      // Gym Section
      'gym.collage.mobile.instruction': '👈 Arrasta para o lado para ver mais fotos 👉',
      'gym.gallery.alt.detail': 'Detalhe do Ginásio',
      'gym.gallery.alt.equipment': 'Equipamento de Ginásio',
      'gym.gallery.alt.training': 'Área de Treino',
      'gym.gallery.alt.weights': 'Pesos do Ginásio',
      'gym.gallery.alt.view': 'Vista do Ginásio',
      'gym.gallery.alt.atmosphere': 'Atmosfera do Ginásio',
      'gym.gallery.alt.details': 'Detalhes do Ginásio',
      
      
      // Reviews
      'reviews.title': 'O QUE DIZEM OS NOSSOS ATLETAS',
      'reviews.source.google': 'Google Review',
      'reviews.1.text': '"Excelentes instalações, equipa fantástica! A melhor parte é que posso escolher livremente o que quero experimentar, desde treino funcional a artes marciais. A localização ajuda muito, com ótimos acessos de transportes públicos."',
      'reviews.1.author': '- Bernardo',
      'reviews.2.text': '"O melhor centro de treino. Os instrutores são pros, a dinâmica do treino é muito diversificada e motivadora, as instalações são impecáveis, o ambiente é ótimo. Mesmo para quem acha que não vai “aguentar” o treino, arranjam sempre uma adaptação fazível. Ainda por cima têm bom gosto musical! Como não gostar?"',
      'reviews.2.author': '- Ana',
      'reviews.3.text': '"Espaço super acolhedor, com decoração original. Material novo e de qualidade, staff super disponivel e atencioso. Instalações com condições otimas. Vale definitivamente uma visita."',
      'reviews.3.author': '- Isabel',
      
      // Pricing Section
      'pricing.title': 'PLANOS',
      'pricing.promo_part1': 'Planos desde',
      'pricing.promo_price': '3,7€ por treino',
      'pricing.promo_part2': 'Treino em',
      'pricing.promo_highlight_blue': 'grupos exclusivos',
      'pricing.promo_part3': 'e acompanhamento contínuo dos nossos coaches — funciona para quem está a',
      'pricing.promo_highlight_blue2': 'dar os primeiros passos',
      'pricing.promo_part4': 'e para quem quer',
      'pricing.promo_highlight_blue3': 'elevar o nível',
      'pricing.period': '/mês',
      'pricing.anchor_text': 'Desde 5€ / treino',
      'pricing.elite.title': 'ELITE',
      'pricing.elite.subtitle': 'Plano Sem Limites',
      'pricing.elite.anchor': 'A partir de 3,7€ / treino',
      'pricing.elite.price': '€84.90',
      'pricing.elite.original': '€94.90',
      'pricing.elite.cta': 'VER PLANO',
      'pricing.coupon_link': 'Tens cupão? Inscreve-te aqui',
      'pricing.elite.feature1': 'Acesso livre trânsito (ilimitado) a todas as modalidades e open gym',
      'pricing.elite.feature2': 'Sem fidelização',
      'pricing.elite.feature3': 'Acesso ilimitado ao lounge & co-working',
      'pricing.elite.feature4': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      'pricing.rise.title': 'RISE',
      'pricing.rise.subtitle': 'Plano Consistência',
      'pricing.rise.anchor': 'A partir de 6,2€ / treino',
      'pricing.rise.price': '€69.90',
      'pricing.rise.original': '€79.90',
      'pricing.rise.cta': 'VER PLANO',
      'pricing.rise.feature1': 'Acesso 3x por semana a todas as modalidades e open gym (podes assistir a várias aulas no mesmo dia)',
      'pricing.rise.feature2': 'Sem fidelização',
      'pricing.rise.feature3': 'Acesso ilimitado ao lounge & co-working',
      'pricing.rise.feature4': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      'pricing.starter.title': 'STARTER',
      'pricing.starter.subtitle': 'Plano Introdução',
      'pricing.starter.anchor': 'A partir de 7,2€ / treino',
      'pricing.starter.price': '€54.90',
      'pricing.starter.original': '€64.90',
      'pricing.starter.cta': 'VER PLANO',
      'pricing.starter.feature1': 'Acesso 2x por semana a todas as modalidades e open gym (podes assistir a várias aulas no mesmo dia)',
      'pricing.starter.feature2': 'Sem fidelização',
      'pricing.starter.feature3': 'Acesso ilimitado ao lounge & co-working',
      'pricing.starter.feature4': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
      
      // Drop-in pricing
      'pricing.dropin.period': '/aula',
      'pricing.dropin.feature1': 'Aula avulsa única',
      'pricing.dropin.feature2': 'Compra apenas 1 aula sem compromisso',
      'pricing.dropin.feature3': 'Acesso a todas as modalidades e open gym',
      'pricing.dropin.feature4': 'Sem mensalidade - pagas apenas pela aula',
      'pricing.dropin.cta': 'RESERVAR AULA',

      // Pack 10 pricing
      'pricing.pack10.title': 'PACK 10',
      'pricing.pack10.period': '/pack',
      'pricing.pack10.feature1': 'Pack de 10 aulas',
      'pricing.pack10.feature2': 'Sem mensalidade',
      'pricing.pack10.feature3': 'Acesso a todas as modalidades e open gym',
      'pricing.pack10.cta': 'COMPRAR PACK',

      // Pack 5 pricing
      'pricing.pack5.title': 'PACK 5',
      'pricing.pack5.period': '/pack',
      'pricing.pack5.feature1': 'Pack de 5 aulas',
      'pricing.pack5.feature2': 'Sem mensalidade',
      'pricing.pack5.feature3': 'Acesso a todas as modalidades e open gym',
      'pricing.pack5.cta': 'COMPRAR PACK',
      
      // Events Section
      'events.title': 'EVENTOS',
      'events.upcoming': 'Próximos',
      'events.past': 'Passados',
      'events.ideas.title': 'Ideias em desenvolvimento',
      'events.badge.open': 'Inscrições Abertas',
      'events.badge.soon': 'Em Breve',
      'events.badge.completed': 'Concluído',
      'events.stamp.upcoming': 'PRÓXIMAMENTE',
      'events.date.tba': 'A anunciar',
      'events.btn.register': 'Inscrever',
      'events.btn.details': 'Ver detalhes',
      'events.muaythai.title': 'Muay Thai Clinic',
      'events.muaythai.desc': 'Workshop técnico com os nossos coaches.',
      'events.jiujitsu.title': 'Clínica de Jiu Jitsu',
      'events.jiujitsu.desc': 'Sessão técnica focada em posições e finalizações.',
      'events.filme.title': 'Visionamento de Filme + Comentário',
      'events.filme.desc': 'Filme de combate seguido de debate com os treinadores.',
      'events.cenicas.title': 'Workshop de Lutas Cênicas',
      'events.cenicas.desc': 'Coreografia de combate para teatro, cinema e performance.',
      'events.publicspeaking.title': 'Workshop de Public Speaking',
      'events.publicspeaking.desc': 'Desenvolve confiança e técnicas de comunicação em público.',
      'events.danca.title': 'Workshop de Dança',
      'events.danca.desc': 'Exploração de movimento, ritmo e expressão corporal.',
      'events.teatro.title': 'Workshop de Teatro',
      'events.teatro.desc': 'Técnicas de interpretação, presença cénica e improvisação.',
      'events.standup.title': 'Sessão de Stand-Up Comedy',
      'events.standup.desc': 'Noite de comédia com atletas e comediantes convidados.',
      'events.comunicacao.title': 'Workshop de Comunicação',
      'events.comunicacao.desc': 'Comunicação eficaz e gestão de conflitos no desporto.',
      'events.presunto.title': 'Workshop de Cortar Presunto',
      'events.presunto.desc': 'A arte tradicional do corte à faca. Perfeição em cada fatia.',
      'events.nutricao.title': 'Nutrição + Treino BeWater',
      'events.nutricao.desc': 'Treino com Bruno Salgueiro e palestra com Dr. Alexandre Azevedo.',
      'events.saomartinho.title': 'São Martinho no BE WATER',
      'events.saomartinho.desc': 'Treino com Bernardo Simões e convívio com castanhas e minis.',
      
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
      'schedule.activities.muaythai': 'MUAY THAI',
      'schedule.activities.closed': 'FECHADO',
      'schedule.rest.text': 'DIA DE DESCANSO',
      'schedule.rest.subtitle': 'BE WATER, REST DEEP',
      'schedule.legend.opengym': 'Acesso livre a todo o ginásio: área de treino funcional, dojo, sacos de boxe, barras, halteres e tatamis. Treina à tua maneira!',
      'schedule.legend.bewater': 'Treino funcional completo que junta força, condicionamento, calistenia e técnicas híbridas. O treino mais desafiante para te tornar numa máquina!',
      'schedule.legend.bewaterlive': 'Treino funcional BeWater gravado e transmitido ao vivo, adaptado para ser realizado em casa com menos equipamento. Todas as sessões BeWater (Live) são gravadas e ficam disponíveis no YouTube e na app BeWater.',
      'schedule.legend.jiujitsu': 'Jiu‑Jitsu com e sem kimono: GI (tradicional, pegadas e controlo de pano) e NO GI (dinâmico, foco em alavancas e controlo sem pano). OPEN MAT: treino livre e sparring.',
      'schedule.legend.boxe': 'Treino de boxe com foco em técnica, condicionamento cardiovascular e força. Usa os sacos pesados e desenvolve potência e agilidade.',
      'schedule.legend.muaythai': 'Treino técnico de striking focado em condicionamento e trabalho de almofadas/sacos.',
      'schedule.legend.closed': 'Ginásio encerrado para pausa de almoço e manutenção. Reabrimos às 16h30!',
      'schedule.note.beta': 'Os horários apresentados estão sujeitos a alterações conforme a resposta da comunidade BE WATER e otimização das dinâmicas do clube.',
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
      'faq.answer.1': '<strong>Treino funcional Be Water</strong>, <strong>treinos BeWater (Live)</strong>, <strong>Jiu-Jitsu</strong>, <strong>Boxe</strong>, <strong>Muay Thai</strong> e acesso <strong>open gym</strong> em três zonas (estúdio, dojo e lounge).',
      'faq.question.2': 'Há idade mínima?',
      'faq.answer.2': 'Recomendamos <strong>16 anos</strong> (menores precisam de <strong>autorização</strong>).',
      'faq.question.3': 'Onde fica o centro de treino e qual o horário?',
      'faq.answer.3': '<strong>Avenida do Brasil 7, 1700-062 Lisboa.</strong><br>Aberto <strong>2.ª-6.ª 07:00-21:00</strong> e <strong>Sáb. 10:00-13:00</strong>; <strong>fechado ao domingo</strong>.',
      'faq.question.5': 'Posso cancelar ou pausar?',
      'faq.answer.5': 'Podes sair <strong>quando quiseres sem penalização</strong>; ao regressar poderá ser cobrado um pequeno <strong>custo de reativação</strong>.',
      'faq.question.8': 'Preciso de experiência prévia para começar?',
      'faq.answer.8': '<strong>Não!</strong> Todos os treinos são <strong>adaptados ao teu nível</strong>. Os nossos trainers ajudam-te a <strong>progredir gradualmente</strong>.',
      'faq.question.9': 'Como funcionam as aulas de grupo?',
      'faq.answer.9': 'As aulas têm <strong>horários fixos</strong> e <strong>grupos limitados</strong>. Podes reservar através da <strong>app</strong> ou no <strong>balcão</strong>.',
      'faq.question.10': 'Posso experimentar antes de me inscrever?',
      'faq.answer.10': '<strong>Sim!</strong> Oferecemos uma <strong>aula experimental gratuita</strong> para conheceres o nosso método de treino.',
      'faq.question.11': 'Qual é a diferença entre os planos?',
      'faq.answer.11': '<strong>Starter:</strong> 2× por semana<br><strong>Rise:</strong> 3× por semana<br><strong>Elite:</strong> Uso ilimitado<br><br>Em todos os planos podes assistir a <strong>múltiplas aulas no mesmo dia</strong>.',
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
      'faq.question.17': 'O que é o Treino BeWater (Live)?',
      'faq.answer.17': 'As aulas BeWater (Live) são <strong>treinos funcionais completos gravados em direto</strong>, adaptados para serem realizados <strong>em casa ou em qualquer lugar com menos equipamento</strong> (peso corporal, halteres, bandas elásticas). Todas as sessões são <strong>disponibilizadas no YouTube e na app BeWater</strong>, permitindo que treines onde quiseres e quando quiseres, sempre alinhado/a com a nossa programação semanal.',
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
      'trainers.diogo.name': 'DIOGO CALADO',
      'trainers.diogo.specialty': 'Treinador de Muay Thai',
      'trainers.diogo.bio': 'Lutador profissional e um dos nomes mais respeitados do Muay Thai português. Campeão mundial e europeu em várias organizações, traz para o Be Water a experiência de quem já competiu entre os melhores do mundo. Nas suas aulas, combina técnica, intensidade e foco mental — ensinando os princípios do Muay Thai com a mesma paixão com que sempre subiu ao ringue.',
      'trainers.diogo.cert1': 'Campeão do Mundo',
      'trainers.diogo.cert2': 'Campeão Europeu',
      'trainers.diogo.cert3': 'Lutador Profissional',
      
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

      // Pack 10 Modal
      'modal.pack10.title': 'PACK 10',
      'modal.pack10.access': 'Pack de 10 aulas',
      'modal.pack10.access_all': 'Acesso a todas as modalidades e open gym',
      'modal.pack10.ideal': 'Sem mensalidade - pagas apenas o pack',

      // Pack 5 Modal
      'modal.pack5.title': 'PACK 5',
      'modal.pack5.access': 'Pack de 5 aulas',
      'modal.pack5.access_all': 'Acesso a todas as modalidades e open gym',
      'modal.pack5.ideal': 'Sem mensalidade - pagas apenas o pack',
      

      
      // Purchase Instructions
      'modal.purchase.title': 'Como comprar o teu pack:',
      'modal.purchase.step1': 'Escolhe a <strong>data de início</strong> 📅',
      'modal.purchase.step2': 'Clica no <strong>VALOR TOTAL</strong> 💰',
      'modal.purchase.step3': 'Preenche os teus dados 📱',
      'modal.purchase.step4': 'Escolhe a forma de pagamento preferida para finalizar a inscrição! 💳',
      
      // Membership Instructions
      'modal.membership.step1': 'Escolhe a data de início',
      'modal.membership.step2': 'Preenche os teus dados pessoais',
      'modal.membership.step3': 'Clica no valor "total a pagar"',
      'modal.membership.step4': 'Escolhe a forma de pagamento preferida',
      
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
      'modal.privacy.contact.text': 'Para exerceres os teus direitos ou esclarecer dúvidas sobre o tratamento de dados pessoais, contacta-nos através dos meios disponibilizados na seção de contacto do website.',
      
      // Coupon System
      'coupon.modal_title': 'Inscrever com Cupão',
      'coupon.title': 'Tens um Cupão de Desconto?',
      'coupon.subtitle': 'Usa o email de um sócio ou código promocional',
      'coupon.label': 'Cupão',
      'coupon.placeholder': 'Email de sócio ou código',
      'coupon.validate': 'VALIDAR CUPÃO',
      'coupon.skip': 'NÃO TENHO CUPÃO',
      'coupon.valid': '✅ Cupão válido!',
      'coupon.invalid': '❌ Cupão inválido',
      'coupon.error.empty': '⚠️ Insere um cupão',
      'coupon.continue': 'CONTINUAR PARA INSCRIÇÃO',
      'coupon.discount_info': '💰 <strong>50% desconto na tua mensalidade AGORA</strong> + 50% desconto na próxima mensalidade do sócio!',
      'coupon.how_it_works': 'ℹ️ Como funciona:',
      'coupon.step1': '1️⃣ Pagas a primeira mensalidade + inscrição com 50% de desconto na mensalidade',
      'coupon.step2': '2️⃣ O sócio que te referenciou recebe 50% de desconto na próxima mensalidade dele',
      'coupon.step3': '3️⃣ Staff aplica os descontos automaticamente',
      'coupon.step4': '4️⃣ Mensalidades seguintes ao preço normal',
      // Cupões especiais (instruções vêm da base de dados)
      'coupon.special.discount_info': '🎉 <strong>Desconto Especial Aplicado!</strong>',
      'coupon.special.how_it_works': 'ℹ️ Como funciona:',
      
      // Mobile Bottom Bar
      'mobile_bottom_bar.cta': 'AULA EXPERIMENTAL',
      'mobile_bottom_bar.menu_label': 'Mais',
      'mobile_bottom_bar.whatsapp': 'WhatsApp',
      'mobile_bottom_bar.instagram': 'Instagram DM',
      
      // Trial Class Booking
      'trial.button': 'AULA EXPERIMENTAL',
      'trial.modal.title': 'AULA EXPERIMENTAL',
      'trial.modal.intro': 'Preenche o formulário abaixo e entraremos em contacto para agendar a tua aula experimental gratuita!',
      'trial.modal.flexibility': 'Queremos muito que treines connosco! Diz-nos a tua disponibilidade e fala connosco na visita para encontrarmos a melhor solução para ti.',
      'trial.form.name': 'Nome',
      'trial.form.phone': 'Telefone (opcional)',
      'trial.form.email': 'Email',
      'trial.form.schedule': 'Preferência de Horários (opcional)',
      'trial.form.schedule_placeholder': 'Ex: Manhãs de 2ª a 6ª, ou Sábados. Tenho flexibilidade à tarde. Gostava de vir 3x por semana.',
      'trial.form.submit': 'SOLICITAR AULA',
      'trial.form.submitting': 'A ENVIAR...',
      'trial.form.error': 'Erro ao enviar formulário. Por favor tente novamente.',
      'trial.form.invalid_email': 'Por favor, insere um email válido no formato: nome@dominio.com',
      'trial.success.title': 'Pedido Enviado!',
      'trial.success.message': 'Obrigado! Entraremos em contacto em breve para agendar a tua aula experimental.',
      
      // Modal Trial CTA (Sidebar for Memberships)
        'modal.trial_cta.title': 'PRECISAS DE OPÇÕES?',
        'modal.trial_cta.text': 'Não deixes que o pagamento te impeça. Vem treinar e encontramos a solução perfeita para ti.',
        'modal.trial_cta.button': 'MARCAR AULA',
        'modal.trial_cta.mobile': 'PRECISAS DE OPÇÕES? MARCA AULA',
        'modal.trial_cta.text_mobile': 'Não deixes que o pagamento te impeça. Vem treinar e encontramos a solução perfeita para ti.',
      
      // Modal Pack Trial CTA (Banner for Packs/Drop-ins)
      'modal.pack_trial_cta.title': 'Experimenta grátis e falamos!',
      'modal.pack_trial_cta.text': 'Não pagues já. Marca a experimental e vemos qual a melhor opção.',
      'modal.pack_trial_cta.button': 'Aula Experimental Grátis',
      
      // Hidden Prices
      'pricing.price_on_request': 'SOLICITA O TEU CÓDIGO',
      
      // Registration Code System
      'registration_code.modal.title': 'Código de Inscrição',
      'registration_code.placeholder': 'Insere o teu código',
      'registration_code.validate': 'VALIDAR CÓDIGO',
      'registration_code.no_code_button': 'NÃO TENHO CÓDIGO',
      
      // Request Code Form
      'registration_code.request_form.title': 'Solicitar Código de Inscrição',
      'registration_code.request_form.subtitle': 'Preenche os teus dados e receberás o código com a promoção atual no teu email.',
      'registration_code.request_form.name': 'Nome',
      'registration_code.request_form.phone': 'Telefone (opcional)',
      'registration_code.request_form.email': 'Email',
      'registration_code.request_form.submit': 'SOLICITAR CÓDIGO',
      'registration_code.request_form.submitting': 'A ENVIAR...',
      'registration_code.request_form.back': 'VOLTAR',
      'registration_code.request_form.error': 'Erro ao enviar pedido. Por favor tente novamente.',
      'registration_code.request_form.invalid_email': 'Por favor, insere um email válido no formato: nome@dominio.com',
      'registration_code.request_form.success_title': 'Pedido Enviado!',
      'registration_code.request_form.success_message': 'Receberás o código de inscrição no teu email em breve com a promoção atual.',
      
      // Discount Display
      'discount.standard_price': 'Preço Standard',
      'discount.your_discount': 'O Seu Desconto',
      'discount.final_price': 'Preço Final',
      
      // Pricing Request Form
      'pricing_request.title': 'Receber Preçário Completo',
      'pricing_request.subtitle': 'Insere os teus dados para receberes a tabela detalhada de preços e as campanhas em vigor. A nossa equipa entrará em contacto contigo brevemente.',
      'pricing_request.name': 'Nome',
      'pricing_request.email': 'Email',
      'pricing_request.phone': 'Telefone (opcional)',
      'pricing_request.submit': 'PEDIR INFORMAÇÃO',
      'pricing_request.submitting': 'A ENVIAR...',
      'pricing_request.error': 'Erro ao enviar formulário. Por favor tente novamente.',
      'pricing_request.success_title': 'Obrigado!',
      'pricing_request.success_message': 'Recebemos o teu pedido. Vamos enviar a informação para o teu email muito em breve.',
      'pricing_request.success_upsell': 'Não precisas de esperar para treinar. Marca já a tua aula experimental sem compromisso.',
      'pricing_request.success_cta': 'MARCAR AULA EXPERIMENTAL AGORA',
      'pricing_request.have_coupon': 'Já tens um cupão de sócio? Clica aqui.',
      'pricing_request.invalid_email': 'Por favor, insere um email válido no formato: nome@dominio.com'
    },
    en: {
      // Meta tags
      'meta.title': 'BE WATER | Flow Like Water, Strike Like Lightning',
      'meta.description': 'BE WATER - Training center inspired by Bruce Lee philosophy. Functional training, martial arts and personal development in Lisbon. Founded by Bruno Salgueiro.',
      
      // Header Navigation
      'header.logo.tagline': 'by Bruce Willow',
      'nav.gym': 'GYM',
      'nav.pricing': 'PLANS',
      'nav.schedule': 'SCHEDULE',
      'nav.events': 'EVENTS',
      'nav.salgueiro': 'SALGUEIRO',
      'nav.trainers': 'TRAINERS',
      'nav.faq': 'FAQ',
      'nav.contact': 'CONTACT',
      
      // Hero Section
      'hero.title': 'BE WATER,<br>MY FRIEND',
      'hero.subtitle': 'Your functional training and martial arts club in the center of Lisbon.',
      'hero.cta_eyebrow': '',
      'hero.cta_main': 'TRIAL CLASS',
      'hero.benefit1': '✓ No Commitment',
      'hero.benefit2': '',
      'hero.benefit3': '',
      'hero.secondary_text': 'Already know the plans?',
      'hero.secondary_link': 'Join Now',
      
      // Event Section
      'event.eyebrow': 'EVENT!',
      'event.date.short': 'SAT, OCT 4',
      'event.title': 'Nutrition Event — OCT 4 (Saturday)',
      'event.text': 'BeWater training 3 PM · Talk 5 PM · Social at Jardim do Campo Grande',
      'event.cta': 'LEARN MORE & REGISTER',
      
      
      // About Section
      'gym.hero.title': 'THE TRAINING<br>CENTER',
      'about.title': 'MEET THE SPACE',
      'about.lead': 'Come train with Bruno Salgueiro (aka <a href="https://www.instagram.com/thebrucewillow/" target="_blank" rel="noopener noreferrer" class="dicas-link">Bruce Willow</a>), known for being the face behind <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a>, and work directly with his personally selected team of trainers.',
      'about.secondary': '<span class="brand-highlight">BE WATER</span> - Your club in the center of Lisbon with 3 distinct zones: A social lounge and co-working space, a physical training gym with group classes and open gym, and a dojo dedicated to martial arts and meditation practice. Join this community!',
      'gym.pillar.1.title': 'DOJO & FIGHTS',
      'gym.pillar.1.desc': 'Martial Arts and Self Defense.',
      'gym.pillar.2.title': 'GYM & FUNCTIONAL',
      'gym.pillar.2.desc': 'Strength training and conditioning.',
      'gym.pillar.3.title': 'LOUNGE & CO-WORKING',
      'gym.pillar.3.desc': 'Community, events and work.',
      
      // Gym Section
      'gym.collage.mobile.instruction': '👈 Swipe to see more photos 👉',
      'gym.gallery.alt.detail': 'Gym Detail',
      'gym.gallery.alt.equipment': 'Gym Equipment',
      'gym.gallery.alt.training': 'Training Area',
      'gym.gallery.alt.weights': 'Gym Weights',
      'gym.gallery.alt.view': 'Gym View',
      'gym.gallery.alt.atmosphere': 'Gym Atmosphere',
      'gym.gallery.alt.details': 'Gym Details',
      
      
      // Reviews
      'reviews.title': 'WHAT OUR ATHLETES SAY',
      'reviews.source.google': 'Google Review',
      'reviews.1.text': '"Great amenities, amazing staff! The best thing about it is that I can freely choose what I want to try out, from bodywork training, martial arts. Location helps a lot, with great access from public transportation."',
      'reviews.1.author': '- Bernardo',
      'reviews.2.text': '"The best training center. The instructors are pros, the training dynamics are very diverse and motivating, the facilities are impeccable, the atmosphere is great. Even for those who think they won\'t “handle” the workout, they always find a feasible adaptation. Plus, they have great taste in music! How can you not like it?"',
      'reviews.2.author': '- Ana',
      'reviews.3.text': '"Super welcoming space with original decoration. New and quality equipment, super available and attentive staff. Facilities with great conditions. Definitely worth a visit."',
      'reviews.3.author': '- Isabel',
      
      // Pricing Section
      'pricing.title': 'PLANS',
      'pricing.promo_part1': 'Plans from',
      'pricing.promo_price': '3.7€ per session',
      'pricing.promo_part2': 'Training in',
      'pricing.promo_highlight_blue': 'exclusive groups',
      'pricing.promo_part3': 'with continuous coaching from our coaches — works for those taking their',
      'pricing.promo_highlight_blue2': 'first steps',
      'pricing.promo_part4': 'and for those who want to',
      'pricing.promo_highlight_blue3': 'level up',
      'pricing.period': '/month',
      'pricing.anchor_text': 'From 5€ / session',
      'pricing.elite.title': 'ELITE',
      'pricing.elite.subtitle': 'No Limits Plan',
      'pricing.elite.anchor': 'From 3.7€ / session',
      'pricing.elite.price': '€84.90',
      'pricing.elite.original': '€94.90',
      'pricing.elite.cta': 'LEARN MORE',
      'pricing.coupon_link': 'Have a coupon? Sign up here',
      'pricing.elite.feature1': 'Unlimited access to all modalities and open gym',
      'pricing.elite.feature2': 'No commitment',
      'pricing.elite.feature3': 'Unlimited access to lounge & co-working',
      'pricing.elite.feature4': 'First month\'s fee charged only from your start date',
      'pricing.rise.title': 'RISE',
      'pricing.rise.subtitle': 'Consistency Plan',
      'pricing.rise.anchor': 'From 6.2€ / session',
      'pricing.rise.price': '€69.90',
      'pricing.rise.original': '€79.90',
      'pricing.rise.cta': 'LEARN MORE',
      'pricing.rise.feature1': 'Access 3x per week to all modalities and open gym (you can attend multiple classes on the same day)',
      'pricing.rise.feature2': 'No commitment',
      'pricing.rise.feature3': 'Unlimited access to lounge & co-working',
      'pricing.rise.feature4': 'First month\'s fee charged only from your start date',
      'pricing.starter.title': 'STARTER',
      'pricing.starter.subtitle': 'Introduction Plan',
      'pricing.starter.anchor': 'From 7.2€ / session',
      'pricing.starter.price': '€54.90',
      'pricing.starter.original': '€64.90',
      'pricing.starter.cta': 'VIEW PLAN',
      'pricing.starter.feature1': 'Access 2x per week to all modalities and open gym (you can attend multiple classes on the same day)',
      'pricing.starter.feature2': 'No commitment',
      'pricing.starter.feature3': 'Unlimited access to lounge & co-working',
      'pricing.starter.feature4': 'First month\'s fee charged only from your start date',
      
      // Drop-in pricing
      'pricing.dropin.period': '/class',
      'pricing.dropin.feature1': 'Single drop-in class',
      'pricing.dropin.feature2': 'Buy just 1 class without commitment',
      'pricing.dropin.feature3': 'Access to all modalities and open gym',
      'pricing.dropin.feature4': 'No monthly fee - pay only for the class',
      'pricing.dropin.cta': 'BOOK CLASS',

      // Pack 10 pricing
      'pricing.pack10.title': 'PACK 10',
      'pricing.pack10.period': '/pack',
      'pricing.pack10.feature1': '10-class pack',
      'pricing.pack10.feature2': 'No monthly fee',
      'pricing.pack10.feature3': 'Access to all modalities and open gym',
      'pricing.pack10.cta': 'BUY PACK',

      // Pack 5 pricing
      'pricing.pack5.title': 'PACK 5',
      'pricing.pack5.period': '/pack',
      'pricing.pack5.feature1': '5-class pack',
      'pricing.pack5.feature2': 'No monthly fee',
      'pricing.pack5.feature3': 'Access to all modalities and open gym',
      'pricing.pack5.cta': 'BUY PACK',
      
      // Events Section
      'events.title': 'EVENTS',
      'events.upcoming': 'Upcoming',
      'events.past': 'Past',
      'events.ideas.title': 'Ideas in development',
      'events.badge.open': 'Open Registration',
      'events.badge.soon': 'Coming Soon',
      'events.badge.completed': 'Completed',
      'events.stamp.upcoming': 'COMING SOON',
      'events.date.tba': 'To be announced',
      'events.btn.register': 'Register',
      'events.btn.details': 'View details',
      'events.muaythai.title': 'Muay Thai Clinic',
      'events.muaythai.desc': 'Technical workshop with our coaches.',
      'events.jiujitsu.title': 'Jiu Jitsu Clinic',
      'events.jiujitsu.desc': 'Technical session focused on positions and submissions.',
      'events.filme.title': 'Fight Film Screening + Commentary',
      'events.filme.desc': 'Combat film followed by discussion with coaches.',
      'events.cenicas.title': 'Stage Combat Workshop',
      'events.cenicas.desc': 'Fight choreography for theater, film and performance.',
      'events.publicspeaking.title': 'Public Speaking Workshop',
      'events.publicspeaking.desc': 'Build confidence and master public communication techniques.',
      'events.danca.title': 'Dance Workshop',
      'events.danca.desc': 'Exploration of movement, rhythm and body expression.',
      'events.teatro.title': 'Theater Workshop',
      'events.teatro.desc': 'Acting techniques, stage presence and improvisation.',
      'events.standup.title': 'Stand-Up Comedy Session',
      'events.standup.desc': 'Comedy night with athletes and guest comedians.',
      'events.comunicacao.title': 'Communication Workshop',
      'events.comunicacao.desc': 'Effective communication and conflict management in sports.',
      'events.presunto.title': 'Ham Carving Workshop',
      'events.presunto.desc': 'The traditional art of knife carving. Perfection in every slice.',
      'events.nutricao.title': 'Nutrition + BeWater Training',
      'events.nutricao.desc': 'Training with Bruno Salgueiro and talk with Dr. Alexandre Azevedo.',
      'events.saomartinho.title': 'São Martinho at BE WATER',
      'events.saomartinho.desc': 'Training with Bernardo Simões and gathering with chestnuts and drinks.',
      
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
      'schedule.activities.muaythai': 'MUAY THAI',
      'schedule.activities.closed': 'CLOSED',
      'schedule.rest.text': 'REST DAY',
      'schedule.rest.subtitle': 'BE WATER, REST DEEP',
      'schedule.legend.opengym': 'Free access to the entire gym: functional training area, dojo, boxing bags, bars, dumbbells and mats. Train your way!',
      'schedule.legend.bewater': 'Complete functional training that combines strength, conditioning, calisthenics and hybrid techniques. The most challenging workout to turn you into a machine!',
      'schedule.legend.bewaterlive': 'BeWater functional training recorded and broadcast live, adapted to be performed at home with less equipment. All BeWater (Live) sessions are recorded and available on YouTube and the BeWater app.',
      'schedule.legend.jiujitsu': 'Jiu‑Jitsu with and without kimono: GI (traditional, grip and cloth control) and NO GI (dynamic, leverage and control without cloth). OPEN MAT: free training and sparring.',
      'schedule.legend.boxe': 'Boxing training focused on technique, cardiovascular conditioning and strength. Use the heavy bags and develop power and agility.',
      'schedule.legend.muaythai': 'Technical striking training focused on conditioning and pad/bag work.',
      'schedule.legend.closed': 'Gym closed for lunch break. We reopen at 4:30 PM!',
      'schedule.note.beta': 'The schedules presented are subject to change according to BE WATER community response and club dynamics optimization.',
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
      'faq.answer.1': '<strong>Be Water functional training</strong>, <strong>BeWater (Live) workouts</strong>, <strong>Jiu-Jitsu</strong>, <strong>Boxing</strong>, <strong>Muay Thai</strong> and <strong>open gym</strong> access in three zones (studio, dojo and lounge).',
      'faq.question.2': 'Is there a minimum age?',
      'faq.answer.2': 'We recommend <strong>16 years old</strong> (minors need <strong>authorization</strong>).',
      'faq.question.3': 'Where is the training center and what are the hours?',
      'faq.answer.3': '<strong>Avenida do Brasil 7, 1700-062 Lisboa.</strong><br>Open <strong>Mon-Fri 07:00-21:00</strong> and <strong>Sat 10:00-13:00</strong>; <strong>closed on Sundays</strong>.',
      'faq.question.5': 'Can I cancel or pause?',
      'faq.answer.5': 'You can leave <strong>whenever you want without penalty</strong>; upon returning, a small <strong>reactivation fee</strong> may be charged.',
      'faq.question.8': 'Do I need previous experience to start?',
      'faq.answer.8': '<strong>No!</strong> All workouts are <strong>adapted to your level</strong>. Our trainers help you <strong>progress gradually</strong>.',
      'faq.question.9': 'How do group classes work?',
      'faq.answer.9': 'Classes have <strong>fixed schedules</strong> and <strong>limited groups</strong>. You can book through the <strong>app</strong> or at the <strong>front desk</strong>.',
      'faq.question.10': 'Can I try before signing up?',
      'faq.answer.10': '<strong>Yes!</strong> We offer a <strong>free trial class</strong> so you can experience our training method.',
      'faq.question.11': 'What\'s the difference between plans?',
      'faq.answer.11': '<strong>Starter:</strong> 2× per week<br><strong>Rise:</strong> 3× per week<br><strong>Elite:</strong> Unlimited use<br><br>In all plans you can attend <strong>multiple classes on the same day</strong>.',
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
      'faq.question.17': 'What is BeWater (Live) Training?',
      'faq.answer.17': 'BeWater (Live) classes are <strong>complete functional workouts recorded live</strong>, adapted to be performed <strong>at home or anywhere with less equipment</strong> (bodyweight, dumbbells, elastic bands). All sessions are <strong>made available on YouTube and the BeWater app</strong>, allowing you to train wherever and whenever you want, always aligned with our weekly programming.',
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
      'trainers.diogo.name': 'DIOGO CALADO',
      'trainers.diogo.specialty': 'Muay Thai Coach',
      'trainers.diogo.bio': 'Professional fighter and one of the most respected names in Portuguese Muay Thai. World and European champion across multiple organizations, he brings to Be Water the experience of someone who has competed among the best in the world. In his classes, he combines technique, intensity and mental focus — teaching the principles of Muay Thai with the same passion he always brought to the ring.',
      'trainers.diogo.cert1': 'World Champion',
      'trainers.diogo.cert2': 'European Champion',
      'trainers.diogo.cert3': 'Professional Fighter',
      
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

      // Pack 10 Modal
      'modal.pack10.title': 'PACK 10',
      'modal.pack10.access': '10-class pack',
      'modal.pack10.access_all': 'Access to all modalities and open gym',
      'modal.pack10.ideal': 'No monthly fee - pay only for the pack',

      // Pack 5 Modal
      'modal.pack5.title': 'PACK 5',
      'modal.pack5.access': '5-class pack',
      'modal.pack5.access_all': 'Access to all modalities and open gym',
      'modal.pack5.ideal': 'No monthly fee - pay only for the pack',
      

      
      // Purchase Instructions
      'modal.purchase.title': 'How to purchase your pack:',
      'modal.purchase.step1': 'Choose your <strong>start date</strong> 📅',
      'modal.purchase.step2': 'Click on <strong>TOTAL AMOUNT</strong> 💰',
      'modal.purchase.step3': 'Fill in your details 📱',
      'modal.purchase.step4': 'Choose your preferred payment method to complete registration! 💳',
      
      // Membership Instructions
      'modal.membership.step1': 'Choose your start date',
      'modal.membership.step2': 'Fill in your personal details',
      'modal.membership.step3': 'Click on the "total to pay" amount',
      'modal.membership.step4': 'Choose your preferred payment method',
      
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
      'modal.privacy.contact.text': 'To exercise your rights or clarify doubts about the processing of personal data, contact us through the means available in the contact section of the website.',
      
      // Coupon System
      'coupon.modal_title': 'Sign Up with Coupon',
      'coupon.title': 'Have a Discount Coupon?',
      'coupon.subtitle': 'Use a member\'s email or promo code',
      'coupon.label': 'Coupon',
      'coupon.placeholder': 'Member email or code',
      'coupon.validate': 'VALIDATE COUPON',
      'coupon.skip': 'NO COUPON',
      'coupon.valid': '✅ Valid coupon!',
      'coupon.invalid': '❌ Invalid coupon',
      'coupon.error.empty': '⚠️ Enter a coupon',
      'coupon.continue': 'CONTINUE TO REGISTRATION',
      'coupon.discount_info': '💰 <strong>50% discount on your membership NOW</strong> + 50% discount on next membership for the member!',
      'coupon.how_it_works': 'ℹ️ How it works:',
      'coupon.step1': '1️⃣ Pay first month + registration with 50% discount on membership',
      'coupon.step2': '2️⃣ Referring member gets 50% discount on their next payment',
      'coupon.step3': '3️⃣ Staff applies discounts automatically',
      'coupon.step4': '4️⃣ Following months at regular price',
      // Special coupons (instructions come from database)
      'coupon.special.discount_info': '🎉 <strong>Special Discount Applied!</strong>',
      'coupon.special.how_it_works': 'ℹ️ How it works:',
      
      // Mobile Bottom Bar
      'mobile_bottom_bar.cta': 'TRIAL CLASS',
      'mobile_bottom_bar.menu_label': 'More',
      'mobile_bottom_bar.whatsapp': 'WhatsApp',
      'mobile_bottom_bar.instagram': 'Instagram DM',
      
      // Trial Class Booking
      'trial.button': 'TRIAL CLASS',
      'trial.modal.title': 'TRIAL CLASS',
      'trial.modal.intro': 'Fill out the form below and we will contact you to schedule your free trial class!',
      'trial.modal.flexibility': 'We really want you to train with us! Tell us your availability and talk to us during your visit so we can find the best solution for you.',
      'trial.form.name': 'Name',
      'trial.form.phone': 'Phone (optional)',
      'trial.form.email': 'Email',
      'trial.form.schedule': 'Schedule Preference (optional)',
      'trial.form.schedule_placeholder': 'Ex: Mon-Fri mornings, or Saturdays. Flexible afternoons. Looking for 3x/week.',
      'trial.form.submit': 'REQUEST CLASS',
      'trial.form.submitting': 'SENDING...',
      'trial.form.error': 'Error submitting form. Please try again.',
      'trial.form.invalid_email': 'Please enter a valid email in the format: name@domain.com',
      'trial.success.title': 'Request Sent!',
      'trial.success.message': 'Thank you! We will contact you soon to schedule your trial class.',
      
      // Modal Trial CTA (Sidebar for Memberships)
        'modal.trial_cta.title': 'NEED OPTIONS?',
        'modal.trial_cta.text': 'Don\'t let payment stop you. Come train and we\'ll find the perfect solution for you.',
        'modal.trial_cta.button': 'BOOK CLASS',
        'modal.trial_cta.mobile': 'NEED OPTIONS? BOOK CLASS',
        'modal.trial_cta.text_mobile': 'Don\'t let payment stop you. Come train and we\'ll find the perfect solution for you.',
      
      // Modal Pack Trial CTA (Banner for Packs/Drop-ins)
      'modal.pack_trial_cta.title': 'Try for free & Let\'s Talk!',
      'modal.pack_trial_cta.text': 'Don\'t pay yet. Book a trial and we\'ll find the best option.',
      'modal.pack_trial_cta.button': 'Free Trial Class',
      
      // Hidden Prices
      'pricing.price_on_request': 'REQUEST YOUR CODE',
      
      // Registration Code System
      'registration_code.modal.title': 'Registration Code',
      'registration_code.placeholder': 'Enter your code',
      'registration_code.validate': 'VALIDATE CODE',
      'registration_code.no_code_button': 'NO CODE',
      
      // Request Code Form
      'registration_code.request_form.title': 'Request Registration Code',
      'registration_code.request_form.subtitle': 'Fill in your details and you will receive the code with the current promotion in your email.',
      'registration_code.request_form.name': 'Name',
      'registration_code.request_form.phone': 'Phone (optional)',
      'registration_code.request_form.email': 'Email',
      'registration_code.request_form.submit': 'REQUEST CODE',
      'registration_code.request_form.submitting': 'SENDING...',
      'registration_code.request_form.back': 'BACK',
      'registration_code.request_form.error': 'Error submitting request. Please try again.',
      'registration_code.request_form.invalid_email': 'Please enter a valid email in the format: name@domain.com',
      'registration_code.request_form.success_title': 'Request Sent!',
      'registration_code.request_form.success_message': 'You will receive the registration code in your email soon with the current promotion.',
      
      // Discount Display
      'discount.standard_price': 'Standard Price',
      'discount.your_discount': 'Your Discount',
      'discount.final_price': 'Final Price',

      // MISSING KEYS
      'coupon.form.processing': 'Validating...',
      'coupon.success_title': 'All Set!',
      'coupon.success': 'Thank you! The 50% discount will be manually applied by the staff on your next monthly fee and that of the member who referred you.',
      
      // Pricing Request Form
      'pricing_request.title': 'Receive Complete Price List',
      'pricing_request.subtitle': 'Enter your details to receive the detailed price table and current campaigns. Our team will contact you shortly.',
      'pricing_request.name': 'Name',
      'pricing_request.email': 'Email',
      'pricing_request.phone': 'Phone (optional)',
      'pricing_request.submit': 'REQUEST INFORMATION',
      'pricing_request.submitting': 'SENDING...',
      'pricing_request.error': 'Error submitting form. Please try again.',
      'pricing_request.success_title': 'Thank you!',
      'pricing_request.success_message': 'We received your request. We will send the information to your email very soon.',
      'pricing_request.success_upsell': 'You don\'t have to wait to train. Book your free trial class now with no commitment.',
      'pricing_request.success_cta': 'BOOK TRIAL CLASS NOW',
      'pricing_request.have_coupon': 'Already have a member coupon? Click here.',
      'pricing_request.invalid_email': 'Please enter a valid email in the format: name@domain.com'
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
  
      // Adicionar estilos inline para não alterar CSS existente - SEMPRE VISÍVEL
      langToggle.style.cssText = `
        display: flex !important;
        align-items: center !important;
        margin-left: 1rem !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
      
      // Debug log
      console.log('Language toggle created successfully');
  
      const toggleBtn = langToggle.querySelector('.language-toggle__btn');
      toggleBtn.style.cssText = `
        background: none !important;
        border: 2px solid var(--color-black) !important;
        color: var(--color-black) !important;
        font-family: var(--font-heading) !important;
        font-weight: 700 !important;
        font-size: 0.9rem !important;
        padding: 0.5rem 1rem !important;
        cursor: pointer !important;
        text-transform: uppercase !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        align-items: center !important;
        gap: 0.25rem !important;
        visibility: visible !important;
        opacity: 1 !important;
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
  
      // Inserir no local correto dependendo do tamanho da tela
      const menuToggle = headerContainer.querySelector('.header__menu-toggle');
      const headerNav = headerContainer.querySelector('.header__nav');
      
      // Inserir depois da navegação (antes do menu toggle se existir)
      if (menuToggle) {
        headerContainer.insertBefore(langToggle, menuToggle);
      } else if (headerNav) {
        headerNav.insertAdjacentElement('afterend', langToggle);
      } else {
        headerContainer.appendChild(langToggle);
      }
  
      // Adicionar estilos responsivos
      const style = document.createElement('style');
      style.textContent = `
        /* GARANTIR VISIBILIDADE EM TODOS OS TAMANHOS */
        .language-toggle {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
        
        /* Desktop styles - show alongside navigation */
        @media (min-width: 1200px) {
          .language-toggle {
            display: flex !important;
            align-items: center !important;
            margin-left: 1rem !important;
            visibility: visible !important;
          }
          .language-toggle__btn {
            display: flex !important;
            align-items: center !important;
            gap: 0.25rem !important;
            visibility: visible !important;
          }
        }
        
        /* Tablet/Hamburger menu breakpoint */
        @media (min-width: 769px) and (max-width: 1199px) {
          .language-toggle {
            order: 3 !important;
            display: flex !important;
            margin-left: 0.5rem !important;
            margin-right: 0.5rem !important;
            visibility: visible !important;
          }
        }
        
        /* Mobile styles */
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
        } else if (element.tagName === 'IMG') {
          element.alt = translation;
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
      
      // Processar elementos com data-i18n-placeholder (para textareas e outros)
      const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
      placeholderElements.forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = this.getTranslation(key, lang);
        element.placeholder = translation;
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
