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
    'nav.gym': 'GYM',
    'nav.pricing': 'PREÇOS',
    'nav.schedule': 'HORÁRIOS',
    'nav.salgueiro': 'SALGUEIRO',
    'nav.trainers': 'TREINADORES',
    'nav.contact': 'CONTACTO',
    
    // Hero Section
    'hero.title': 'BE WATER,<br>MY FRIEND',
    'hero.subtitle': 'Desenvolve a tua força, agilidade e flexibilidade num espaço que reflecte a filosofia "be water" popularizada por Bruce Lee. Vem fazer parte desta corrente.',
    'hero.cta': 'INSCREVE-TE JÁ',
    'hero.countdown.title': 'ABERTURA EM:',
    'hero.countdown.days': 'DIAS',
    'hero.countdown.hours': 'HRS',
    'hero.countdown.minutes': 'MIN',
    'hero.countdown.seconds': 'SEC',
    'hero.countdown.date': '14 JULHO 2025',
    
    // About Section
    'gym.hero.title': 'O CENTRO<br>DE TREINO',
    'about.title': 'CONHECE O ESPAÇO',
    'about.lead': 'Vem treinar com o Bruno Salgueiro, das <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a> e com a sua equipa de instrutores escolhidos a dedo.',
    'about.secondary': '<span class="brand-highlight">BE WATER</span> - O teu clube no centro de Lisboa com 3 zonas distintas: Um lounge de convívio e co-working, um ginásio de treino físico com regime de aulas de grupo e open gym e ainda um dojo dedicado à prática de artes marciais e meditação. Junta-te a esta comunidade!',
    
    // Gym Section
    'gym.collage.mobile.instruction': '👈 Arrasta para o lado para ver mais fotos 👉',
    
    // Pricing Section
    'pricing.title': 'PREÇOS<br><span class="early-bird-text">EARLY BIRD</span>',
    'pricing.promo': 'Oferta de lançamento por tempo limitado!',
    'pricing.preregistration.title': 'PRÉ-INSCRIÇÃO<br><span class="early-bird-text">GARANTIA EARLY BIRD</span>',
    'pricing.preregistration.promo': 'Garante já o teu preço especial de lançamento!',
    'pricing.preregistration.button': 'FAZ A TUA PRÉ-INSCRIÇÃO!',
    'pricing.period': '/mês',
    'pricing.test.note': '<strong>TESTA PRIMEIRO, DECIDE DEPOIS!</strong><br><a href="#contact" class="test-note__link">Clicka aqui</a> para usar o formulário de contacto e agendar a tua visita.',
    'pricing.elite.title': 'ELITE',
    'pricing.elite.price': '€84.90',
    'pricing.elite.original': '€94.90',
    'pricing.elite.cta': 'INSCREVE-TE JÁ',
    'pricing.elite.feature1': 'Acesso <strong>livre trânsito (ilimitado)</strong> a todas as modalidades e open gym',
    'pricing.elite.feature2': '<strong>Sem fidelização</strong>',
    'pricing.elite.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    'pricing.rise.title': 'RISE',
    'pricing.rise.price': '€69.90',
    'pricing.rise.original': '€79.90',
    'pricing.rise.cta': 'INSCREVE-TE JÁ',
    'pricing.rise.feature1': 'Acesso <strong>3x por semana</strong> a todas as modalidades e open gym',
    'pricing.rise.feature2': '<strong>Sem fidelização</strong>',
    'pricing.rise.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    'pricing.starter.title': 'STARTER',
    'pricing.starter.price': '€54.90',
    'pricing.starter.original': '€64.90',
    'pricing.starter.cta': 'INSCREVE-TE JÁ',
    'pricing.starter.feature1': 'Acesso <strong>2x por semana</strong> a todas as modalidades e open gym',
    'pricing.starter.feature2': '<strong>Sem fidelização</strong>',
    'pricing.starter.feature3': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    'pricing.badge': 'EARLY BIRD',
    
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
    'schedule.rest.text': 'DIA DE DESCANSO',
    'schedule.rest.subtitle': 'BE WATER, REST DEEP',
    'schedule.legend.opengym': 'Acesso livre a todo o ginásio: área de treino funcional, dojo, sacos de boxe, barras, halteres e tatamis. Treina à tua maneira!',
    'schedule.legend.bewater': 'Treino funcional completo que junta força, condicionamento, calistenia e técnicas híbridas. O treino mais desafiante para te tornar numa máquina!',
    'schedule.legend.lonewarrior': 'Treino express minimalista com peso corporal, halteres e bandas. Intenso, rápido e sem desculpas - ideal para repetir em qualquer lugar.',
    'schedule.legend.jiujitsu': 'Arte marcial tradicional focada em técnicas de solo, defesa pessoal e condicionamento físico e mental no nosso dojo especializado.',
    'schedule.legend.boxe': 'Treino de boxe com foco em técnica, condicionamento cardiovascular e força. Usa os sacos pesados e desenvolve potência e agilidade.',
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
    'salgueiro.subtitle': 'DUPLO PROFISSIONAL DE TELEVISÃO E CINEMA | PERSONAL TRAINER CERTIFICADO',
    'salgueiro.career.title': 'CARREIRA',
    'salgueiro.career.p1': 'Bruno Salgueiro é um Duplo Profissional de Televisão e Cinema, com diversos trabalhos não só em Portugal mas a nível internacional nos últimos 16 anos.',
    'salgueiro.career.p2': 'Com um background de artes marciais (Kung-Fu e Kickboxing), Ginástica e Treino de Força, é a conjugação estas áreas por onde passou que lhe deu a preparação física necessária para estar \'pronto para tudo\', no seio da sua profissão.',
    'salgueiro.career.p3': 'Personal Trainer certificado desde 2012.',
    'salgueiro.career.imdb': 'VER FILMOGRAFIA IMDB',
    'salgueiro.dicas.title': 'DICAS DO SALGUEIRO',
    'salgueiro.dicas.p1': 'Co-criou há 11 anos (2013) a Plataforma Dicas do Salgueiro, um canal de YouTube (mais tarde presente em todas as redes sociais mais relevantes) com o seu sócio Luís Piçarra (Produção) onde partilha dicas de treino e motivação, que conta já com cerca de 400 mil seguidores só no YouTube e mais de 49 milhões de visualizações.',
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
    'modal.elite.billing': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    'modal.rise.title': 'PLANO RISE',
    'modal.rise.access': 'Acesso 3x por semana a todas as modalidades e open gym',
    'modal.rise.commitment': 'Sem fidelização',
    'modal.rise.billing': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    'modal.starter.title': 'PLANO STARTER',
    'modal.starter.access': 'Acesso 2x por semana a todas as modalidades e open gym',
    'modal.starter.commitment': 'Sem fidelização',
    'modal.starter.billing': 'A mensalidade do primeiro mês é cobrada apenas a partir da data em que começas a treinar',
    
    // Pre-registration Modal
    'modal.prereg.title': 'PRÉ-INSCRIÇÃO',
    'modal.prereg.subtitle': 'GARANTIA EARLY BIRD',
    'modal.prereg.opening': 'Abertura:<br>14 de Julho 2025',
    'modal.prereg.what.title': '🎯 O QUE É A PRÉ-INSCRIÇÃO?',
    'modal.prereg.what.text': 'Garante-te acesso privilegiado aos preços promocionais Early Bird.',
    'modal.prereg.how.title': '📞 COMO FUNCIONA?',
    'modal.prereg.how.step1': '<strong>1.</strong> Faz a tua pré-inscrição agora por <strong>25€</strong>',
    'modal.prereg.how.step2': '<strong>2.</strong> Serás <strong>contactado diretamente</strong> quando estivermos prestes a abrir',
    'modal.prereg.how.step3': '<strong>3.</strong> Escolhe e paga a tua mensalidade preferida com <strong>desconto garantido</strong>',
    'modal.prereg.how.step4': '<strong>4.</strong> A tua primeira mensalidade será calculada proporcionalmente aos dias restantes do mês em que começares a treinar - <strong>pagas apenas pelos dias que usas o ginásio!</strong>',
    'modal.prereg.insurance.note': '💡 O seguro e custos de inscrição já estão incluídos - <strong>não pagas outra vez!</strong>',
    'modal.prereg.plans.title': '💰 MENSALIDADES DISPONÍVEIS COM EARLY BIRD:',
    'modal.prereg.plans.starter.title': 'PLANO STARTER',
    'modal.prereg.plans.starter.access': 'Acesso <strong>2x por semana</strong>',
    'modal.prereg.plans.rise.title': 'PLANO RISE',
    'modal.prereg.plans.rise.access': 'Acesso <strong>3x por semana</strong>',
    'modal.prereg.plans.elite.title': 'PLANO ELITE',
    'modal.prereg.plans.elite.access': 'Acesso <strong>ilimitado</strong>',
    'modal.prereg.guarantee.title': '⏰ GARANTIA DE PREÇO:',
    'modal.prereg.guarantee.text': 'Os preços Early Bird ficam garantidos durante <strong>1 ANO COMPLETO</strong> na mensalidade que escolheres!',
    'modal.prereg.loading': 'A carregar formulário...',
    
    // Payment Info
    'modal.payment.warning': '⚠️ INFORMAÇÃO IMPORTANTE SOBRE O PAGAMENTO',
    'modal.payment.today': 'O que estás a pagar hoje:',
    'modal.payment.first': '1ª Mensalidade (€84.90)',
    'modal.payment.paid': 'Já está paga!',
    'modal.payment.insurance': 'Seguro Anual (€10)',
    'modal.payment.required': 'Obrigatório',
    'modal.payment.when': '🗓️ Quando começa a contar a próxima mensalidade:',
    'modal.payment.next': 'A tua próxima mensalidade só começará a ser cobrada quando o ginásio abrir oficialmente e começares a treinar. Não pagas nada extra até lá!',
    'modal.payment.proportional': '💡 COBRANÇA PROPORCIONAL:',
    'modal.payment.proportional.text': 'Se começares a treinar a meio do mês, pagas apenas a parte proporcional da mensalidade! Exemplo: se iniciares dia 15, pagas apenas metade da mensalidade desse mês. Justo e transparente - pagas apenas pelos dias que treinas.',
    
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
    'nav.gym': 'GYM',
    'nav.pricing': 'PRICING',
    'nav.schedule': 'SCHEDULE',
    'nav.salgueiro': 'SALGUEIRO',
    'nav.trainers': 'TRAINERS',
    'nav.contact': 'CONTACT',
    
    // Hero Section
    'hero.title': 'BE WATER,<br>MY FRIEND',
    'hero.subtitle': 'Develop your strength, agility and flexibility in a space that reflects the "be water" philosophy popularized by Bruce Lee. Come be part of this flow.',
    'hero.cta': 'JOIN NOW',
    'hero.countdown.title': 'OPENING IN:',
    'hero.countdown.days': 'DAYS',
    'hero.countdown.hours': 'HRS',
    'hero.countdown.minutes': 'MIN',
    'hero.countdown.seconds': 'SEC',
    'hero.countdown.date': 'JULY 14, 2025',
    
    // About Section
    'gym.hero.title': 'THE TRAINING<br>CENTER',
    'about.title': 'MEET THE SPACE',
    'about.lead': 'Come train with Bruno Salgueiro, from <a href="#salgueiro" class="dicas-link">"Dicas do Salgueiro"</a> and his hand-picked team of instructors.',
    'about.secondary': '<span class="brand-highlight">BE WATER</span> - Your club in the center of Lisbon with 3 distinct zones: A social lounge and co-working space, a physical training gym with group classes and open gym, and a dojo dedicated to martial arts and meditation practice. Join this community!',
    
    // Gym Section
    'gym.collage.mobile.instruction': '👈 Swipe to see more photos 👉',
    
    // Pricing Section
    'pricing.title': 'PRICING<br><span class="early-bird-text">EARLY BIRD</span>',
    'pricing.promo': 'Limited time launch offer!',
    'pricing.preregistration.title': 'PRE-REGISTRATION<br><span class="early-bird-text">EARLY BIRD GUARANTEE</span>',
    'pricing.preregistration.promo': 'Secure your special launch price now!',
    'pricing.preregistration.button': 'GET YOUR PRE-REGISTRATION!',
    'pricing.period': '/month',
    'pricing.test.note': '<strong>TEST FIRST, DECIDE LATER!</strong><br><a href="#contact" class="test-note__link">Click here</a> to use the contact form and schedule your visit.',
    'pricing.elite.title': 'ELITE',
    'pricing.elite.price': '€84.90',
    'pricing.elite.original': '€94.90',
    'pricing.elite.cta': 'JOIN NOW',
    'pricing.elite.feature1': '<strong>Unlimited access</strong> to all activities and open gym',
    'pricing.elite.feature2': '<strong>No commitment</strong>',
    'pricing.elite.feature3': 'First month\'s fee is charged only from the date you start training',
    'pricing.rise.title': 'RISE',
    'pricing.rise.price': '€69.90',
    'pricing.rise.original': '€79.90',
    'pricing.rise.cta': 'JOIN NOW',
    'pricing.rise.feature1': '<strong>3x per week</strong> access to all activities and open gym',
    'pricing.rise.feature2': '<strong>No commitment</strong>',
    'pricing.rise.feature3': 'First month\'s fee is charged only from the date you start training',
    'pricing.starter.title': 'STARTER',
    'pricing.starter.price': '€54.90',
    'pricing.starter.original': '€64.90',
    'pricing.starter.cta': 'JOIN NOW',
    'pricing.starter.feature1': '<strong>2x per week</strong> access to all activities and open gym',
    'pricing.starter.feature2': '<strong>No commitment</strong>',
    'pricing.starter.feature3': 'First month\'s fee is charged only from the date you start training',
    'pricing.badge': 'EARLY BIRD',
    
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
    'schedule.rest.text': 'REST DAY',
    'schedule.rest.subtitle': 'BE WATER, REST DEEP',
    'schedule.legend.opengym': 'Free access to the entire gym: functional training area, dojo, boxing bags, bars, dumbbells and mats. Train your way!',
    'schedule.legend.bewater': 'Complete functional training that combines strength, conditioning, calisthenics and hybrid techniques. The most challenging workout to turn you into a machine!',
    'schedule.legend.lonewarrior': 'Minimalist express training with bodyweight, dumbbells and bands. Intense, fast and no excuses - ideal to repeat anywhere.',
    'schedule.legend.jiujitsu': 'Traditional martial art focused on ground techniques, self-defense and physical and mental conditioning in our specialized dojo.',
    'schedule.legend.boxe': 'Boxing training focused on technique, cardiovascular conditioning and strength. Use the heavy bags and develop power and agility.',
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
    'salgueiro.subtitle': 'TELEVISION AND CINEMA PROFESSIONAL STUNT DOUBLE | CERTIFIED PERSONAL TRAINER',
    'salgueiro.career.title': 'CAREER',
    'salgueiro.career.p1': 'Bruno Salgueiro is a Professional Stunt Double for Television and Cinema, with diverse work not only in Portugal but internationally over the past 16 years.',
    'salgueiro.career.p2': 'With a background in martial arts (Kung-Fu and Kickboxing), Gymnastics and Strength Training, it is the combination of these areas that gave him the physical preparation necessary to be \'ready for everything\' in his profession.',
    'salgueiro.career.p3': 'Certified Personal Trainer since 2012.',
    'salgueiro.career.imdb': 'VIEW IMDB FILMOGRAPHY',
    'salgueiro.dicas.title': 'DICAS DO SALGUEIRO',
    'salgueiro.dicas.p1': 'Co-created 11 years ago (2013) the Dicas do Salgueiro Platform, a YouTube channel (later present on all relevant social networks) with his partner Luís Piçarra (Production) where he shares training tips and motivation, which already has about 400 thousand followers on YouTube alone and over 49 million views.',
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
    'modal.elite.billing': 'The first month\'s fee is charged only from the date you start training',
    'modal.rise.title': 'RISE PLAN',
    'modal.rise.access': '3x per week access to all modalities and open gym',
    'modal.rise.commitment': 'No commitment',
    'modal.rise.billing': 'The first month\'s fee is charged only from the date you start training',
    'modal.starter.title': 'STARTER PLAN',
    'modal.starter.access': '2x per week access to all modalities and open gym',
    'modal.starter.commitment': 'No commitment',
    'modal.starter.billing': 'The first month\'s fee is charged only from the date you start training',
    
    // Pre-registration Modal
    'modal.prereg.title': 'PRE-REGISTRATION',
    'modal.prereg.subtitle': 'EARLY BIRD GUARANTEE',
    'modal.prereg.opening': 'Opening:<br>July 14, 2025',
    'modal.prereg.what.title': '🎯 WHAT IS PRE-REGISTRATION?',
    'modal.prereg.what.text': 'Guarantees you privileged access to Early Bird promotional prices.',
    'modal.prereg.how.title': '📞 HOW DOES IT WORK?',
    'modal.prereg.how.step1': '<strong>1.</strong> Do your pre-registration now for <strong>€25</strong>',
    'modal.prereg.how.step2': '<strong>2.</strong> You will be <strong>contacted directly</strong> when we are about to open',
    'modal.prereg.how.step3': '<strong>3.</strong> Choose and pay your preferred monthly fee with <strong>guaranteed discount</strong>',
    'modal.prereg.how.step4': '<strong>4.</strong> Your first monthly fee will be calculated proportionally to the remaining days of the month when you start training - <strong>you only pay for the days you use the gym!</strong>',
    'modal.prereg.insurance.note': '💡 Insurance and registration costs are already included - <strong>you don\'t pay again!</strong>',
    'modal.prereg.plans.title': '💰 MONTHLY FEES AVAILABLE WITH EARLY BIRD:',
    'modal.prereg.plans.starter.title': 'STARTER PLAN',
    'modal.prereg.plans.starter.access': 'Access <strong>2x per week</strong>',
    'modal.prereg.plans.rise.title': 'RISE PLAN',
    'modal.prereg.plans.rise.access': 'Access <strong>3x per week</strong>',
    'modal.prereg.plans.elite.title': 'ELITE PLAN',
    'modal.prereg.plans.elite.access': '<strong>Unlimited</strong> access',
    'modal.prereg.guarantee.title': '⏰ PRICE GUARANTEE:',
    'modal.prereg.guarantee.text': 'Early Bird prices are guaranteed for <strong>1 COMPLETE YEAR</strong> on the monthly fee you choose!',
    'modal.prereg.loading': 'Loading form...',
    
    // Payment Info
    'modal.payment.warning': '⚠️ IMPORTANT PAYMENT INFORMATION',
    'modal.payment.today': 'What you\'re paying today:',
    'modal.payment.first': '1st Monthly Fee (€84.90)',
    'modal.payment.paid': 'Already paid!',
    'modal.payment.insurance': 'Annual Insurance (€10)',
    'modal.payment.required': 'Required',
    'modal.payment.when': '🗓️ When the next monthly fee starts:',
    'modal.payment.next': 'Your next monthly fee will only start being charged when the gym officially opens and you start training. You don\'t pay anything extra until then!',
    'modal.payment.proportional': '💡 PROPORTIONAL BILLING:',
    'modal.payment.proportional.text': 'If you start training in the middle of the month, you only pay the proportional part of the monthly fee! Example: if you start on the 15th, you only pay half of that month\'s fee. Fair and transparent - you only pay for the days you train.',
    
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
    'modal.privacy.purposes.registration': 'Management of pre-registrations and gym registrations',
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
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
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
      
      if (translation) {
        // Verificar se é um input placeholder
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
          element.placeholder = translation;
        } else {
          element.innerHTML = translation;
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
    return langTranslations[key] || translations[this.defaultLang][key] || key;
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
      return window.translations[currentLang]?.[key] || window.translations.pt?.[key] || key;
    }
    return key;
  },
  currentLang: () => window.languageManager?.currentLang || 'pt'
}; 