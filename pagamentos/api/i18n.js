// ============================================
// BE WATER PAGAMENTOS - Sistema de Tradução
// ============================================

// Traduções da página de pagamentos
const paymentTranslations = {
  pt: {
    // Header
    'header.title': '🏋️ BE WATER',
    'header.subtitle': 'Pagamentos MBWay - Selecione o produto desejado',
    
    // Produtos
    'product.cafe': 'Café',
    'product.cafe.desc': 'Combustível para treinos épicos',
    'product.agua-pequena': 'Água Pequena',
    'product.agua-pequena.desc': 'Hidratação essencial',
    'product.agua-grande': 'Água Grande',
    'product.agua-grande.desc': 'Hidratação máxima',
    'product.batido-proteina': 'Batido Proteína',
    'product.batido-proteina.desc': 'Recuperação e força',
    'product.barra-proteina': 'Barra Proteína',
    'product.barra-proteina.desc': 'Energia para atletas determinados',
    'product.cookies-proteica': 'Cookies Proteicas',
    'product.cookies-proteica.desc': 'Doce tentação proteica',
    'product.limonada': 'Limonada',
    'product.limonada.desc': 'Refrescante e deliciosa',
    'product.aminox': 'AminoX',
    'product.aminox.desc': 'Energia e resistência',
    'product.toalha': 'Toalha Treino/Banho',
    'product.toalha.desc': 'Essencial BE WATER',
    'product.cerveja-mini': 'Cerveja Mini',
    'product.cerveja-mini.desc': 'Celebração pós-treino',
    'product.agua-gas': 'Água com Gás',
    'product.agua-gas.desc': 'Hidratação com estilo',
    'product.cadeado': 'Cadeado',
    'product.cadeado.desc': 'Segurança para teus pertences',
    'product.donativo': 'Donativo Solidário',
    'product.donativo.desc': '"A tua moedinha faz milagres no tatami."<br>Ajuda a apoiar eventos, formações e treinos para todos. Um euro pode ser o primeiro passo de alguém.',
    'product.btn': 'Pagar com MBWay',
    'product.donativo.btn': 'Salvar um Músculo',
    
    // Formulário
    'form.title': '💳 Pagamento MBWay',
    'form.phone.label': '📱 Número de Telemóvel MBWay',
    'form.phone.placeholder': '9XXXXXXXX',
    'form.pay.btn': '🚀 Enviar Pagamento MBWay',
    'form.invoice.note': '📧 Se quiseres factura preenche <strong>TODOS</strong> os campos abaixo',
    'form.invoice.warning': '⚠️ Se preencheres um campo, tens que preencher todos',
    'form.email.label': '📧 Email',
    'form.email.placeholder': 'exemplo@email.com',
    'form.name.label': '👤 Nome',
    'form.name.placeholder': 'Seu nome completo',
    'form.nif.label': '🆔 NIF',
    'form.nif.placeholder': 'XXXXXXXXX',
    'form.selected.product': '📦 Produto:',
    'form.selected.price': '💰 Preço:',
    
    // Loading e mensagens
    'loading.title': '⏳ A processar pagamento...',
    'loading.subtitle': 'Confirma o pagamento na app MBWay',
    
    // Language Toggle
    'lang.current': 'PT',
    'lang.switch': 'EN'
  },
  
  en: {
    // Header
    'header.title': '🏋️ BE WATER',
    'header.subtitle': 'MBWay Payments - Select your product',
    
    // Produtos
    'product.cafe': 'Coffee',
    'product.cafe.desc': 'Fuel for epic workouts',
    'product.agua-pequena': 'Small Water',
    'product.agua-pequena.desc': 'Essential hydration',
    'product.agua-grande': 'Large Water',
    'product.agua-grande.desc': 'Maximum hydration',
    'product.batido-proteina': 'Protein Shake',
    'product.batido-proteina.desc': 'Recovery and strength',
    'product.barra-proteina': 'Protein Bar',
    'product.barra-proteina.desc': 'Energy for determined athletes',
    'product.cookies-proteica': 'Protein Cookies',
    'product.cookies-proteica.desc': 'Sweet protein temptation',
    'product.limonada': 'Lemonade',
    'product.limonada.desc': 'Refreshing and delicious',
    'product.aminox': 'AminoX',
    'product.aminox.desc': 'Energy and endurance',
    'product.toalha': 'Training/Bath Towel',
    'product.toalha.desc': 'BE WATER essential',
    'product.cerveja-mini': 'Mini Beer',
    'product.cerveja-mini.desc': 'Post-workout celebration',
    'product.agua-gas': 'Sparkling Water',
    'product.agua-gas.desc': 'Hydration with style',
    'product.cadeado': 'Padlock',
    'product.cadeado.desc': 'Security for your belongings',
    'product.donativo': 'Solidarity Donation',
    'product.donativo.desc': '"Your coin works miracles on the tatami."<br>Help support events, training and workouts for everyone. One euro can be someone\'s first step.',
    'product.btn': 'Pay with MBWay',
    'product.donativo.btn': 'Save a Muscle',
    
    // Formulário
    'form.title': '💳 MBWay Payment',
    'form.phone.label': '📱 MBWay Phone Number',
    'form.phone.placeholder': '9XXXXXXXX',
    'form.pay.btn': '🚀 Send MBWay Payment',
    'form.invoice.note': '📧 If you want an invoice fill <strong>ALL</strong> fields below',
    'form.invoice.warning': '⚠️ If you fill one field, you must fill all',
    'form.email.label': '📧 Email',
    'form.email.placeholder': 'example@email.com',
    'form.name.label': '👤 Name',
    'form.name.placeholder': 'Your full name',
    'form.nif.label': '🆔 Tax ID',
    'form.nif.placeholder': 'XXXXXXXXX',
    'form.selected.product': '📦 Product:',
    'form.selected.price': '💰 Price:',
    
    // Loading e mensagens
    'loading.title': '⏳ Processing payment...',
    'loading.subtitle': 'Confirm payment in MBWay app',
    
    // Language Toggle
    'lang.current': 'EN',
    'lang.switch': 'PT'
  }
};

// Sistema de gestão de idiomas para pagamentos
class PaymentLanguageManager {
  constructor() {
    this.currentLang = this.getStoredLanguage() || 'pt';
    this.defaultLang = 'pt';
    this.init();
  }

  init() {
    this.createLanguageToggle();
    this.applyLanguage(this.currentLang);
    this.setupEventListeners();
  }

  getStoredLanguage() {
    return localStorage.getItem('bewater-payment-lang');
  }

  setStoredLanguage(lang) {
    localStorage.setItem('bewater-payment-lang', lang);
  }

  createLanguageToggle() {
    // Criar toggle no header
    const header = document.querySelector('.header');
    if (!header) return;

    const langToggle = document.createElement('div');
    langToggle.className = 'payment-language-toggle';
    langToggle.innerHTML = `
      <button class="payment-language-toggle__btn" id="paymentLanguageToggle" aria-label="Change language">
        <span class="lang-current" data-payment-i18n="lang.current">PT</span>
        <span class="lang-separator">/</span>
        <span class="lang-switch" data-payment-i18n="lang.switch">EN</span>
      </button>
    `;

    // Estilos inline para manter consistência
    const styles = `
      <style>
      .payment-language-toggle {
        position: absolute;
        top: 20px;
        right: 20px;
        z-index: 100;
      }
      
      .payment-language-toggle__btn {
        background: var(--color-background);
        border: var(--border-thick);
        color: var(--color-primary);
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        box-shadow: 4px 4px 0 var(--color-primary);
      }
      
      .payment-language-toggle__btn:hover {
        background: var(--color-primary);
        color: var(--color-background);
        transform: translate(-2px, -2px);
        box-shadow: 6px 6px 0 var(--color-primary);
      }
      
      .lang-separator {
        opacity: 0.5;
      }
      
      @media (max-width: 768px) {
        .payment-language-toggle {
          top: 10px;
          right: 10px;
        }
        
        .payment-language-toggle__btn {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
          box-shadow: 3px 3px 0 var(--color-primary);
        }
        
        .payment-language-toggle__btn:hover {
          box-shadow: 4px 4px 0 var(--color-primary);
        }
      }
      
      @media (max-width: 480px) {
        .payment-language-toggle {
          top: 5px;
          right: 5px;
        }
      }
      </style>
    `;

    // Inserir estilos
    document.head.insertAdjacentHTML('beforeend', styles);
    
    // Inserir toggle
    header.style.position = 'relative';
    header.appendChild(langToggle);
  }

  setupEventListeners() {
    const toggleBtn = document.getElementById('paymentLanguageToggle');
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
    if (!paymentTranslations[lang]) {
      console.warn(`Language ${lang} not supported`);
      return;
    }

    this.currentLang = lang;
    this.setStoredLanguage(lang);
    this.applyLanguage(lang);
    this.updateURL(lang);
  }

  applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-payment-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-payment-i18n');
      const translation = this.getTranslation(key, lang);
      
      // Verificar se é um input placeholder
      if (element.tagName === 'INPUT' && element.type !== 'submit') {
        element.placeholder = translation;
      } else {
        element.innerHTML = translation;
      }
    });

    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;
    
    // Atualizar título da página
    document.title = lang === 'en' ? 'MBWay Payments - BE WATER' : 'Pagamentos MBWay - BE WATER';
    
    // Disparar evento para atualizações personalizadas
    window.dispatchEvent(new CustomEvent('paymentLanguageChanged', { detail: { language: lang } }));
  }

  getTranslation(key, lang = null) {
    lang = lang || this.currentLang;
    
    if (paymentTranslations[lang] && paymentTranslations[lang].hasOwnProperty(key)) {
      return paymentTranslations[lang][key];
    }
    
    // Fallback para português se não encontrar
    if (paymentTranslations[this.defaultLang] && paymentTranslations[this.defaultLang].hasOwnProperty(key)) {
      return paymentTranslations[this.defaultLang][key];
    }
    
    return key; // Retorna a chave se não encontrar tradução
  }

  updateURL(lang) {
    const url = new URL(window.location);
    if (lang === 'pt') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url);
  }

  initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && paymentTranslations[langParam]) {
      this.setLanguage(langParam);
    }
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.paymentLanguageManager = new PaymentLanguageManager();
  window.paymentLanguageManager.initializeFromURL();
});

// Exportar para uso global
window.PaymentLanguageManager = PaymentLanguageManager;
window.paymentTranslations = paymentTranslations; 