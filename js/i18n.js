window.I18N = (function () {
    const STORAGE_KEY = 'lang';

    const translations = {
        pt: {
            'meta.title.home': 'Silas Gonçalves',
            'meta.title.contact': 'Silas Gonçalves — Contato',
            'nav.aria': 'Menu principal',
            'nav.menu': 'Abrir menu',
            'nav.home': 'Home',
            'nav.contacts': 'Contatos',
            'nav.theme': 'Alternar tema claro ou escuro',
            'nav.theme.light': 'Claro',
            'nav.theme.dark': 'Escuro',
            'nav.lang': 'Idioma',
            'hero.bio': 'Formado em Análise e Desenvolvimento de Sistemas, Especializado em Engenharia e Arquitetura de Software, Certificado pela Microsoft, Especialista em Redes e Firewall Mikrotik, e Desenvolvedor Full Stack.',
            'hero.cv': 'Baixar Currículo',
            'hero.linkedin': 'Ver LinkedIn',
            'skills.title': 'Habilidades',
            'skills.subtitle': 'Tecnologias e áreas em que atuo no dia a dia.',
            'skill.react': 'Interfaces interativas com componentes reutilizáveis, estado e renderização eficiente conforme os dados mudam.',
            'skill.node': 'APIs e serviços assíncronos no backend, integração com bancos de dados e automações.',
            'skill.js': 'Linguagem base do front e do back: DOM, eventos, fetch, lógica de aplicação e tooling.',
            'skill.db.title': 'Banco de Dados',
            'skill.db': 'SQL, MySQL, MongoDB, Firebase e Prisma. Backups, scripts e controle de acesso.',
            'skill.front': 'Layouts responsivos com Bootstrap, CSS (Flexbox/Grid), formulários e animações.',
            'skill.network.title': 'Redes & Firewall',
            'skill.network': 'MikroTik RouterOS: NAT, FailOver, LoadBalance, VPNs, Hotspots, QoS e controle de banda.',
            'skill.os': 'Windows Server, Azure e Power BI. Debian/Ubuntu Server e virtualização.',
            'skill.fullstack': 'Do frontend ao deploy: integração de APIs, autenticação e entrega de features ponta a ponta.',
            'skill.github.title': 'Mais no Github',
            'skill.github.html': 'Em meu <a class="text-dark github-inline-link" href="https://github.com/silasgoncalvesczs" target="_blank" rel="noopener noreferrer">Github</a> estão projetos e materiais de estudo recentes.',
            'projects.title': 'Projetos recentes',
            'projects.subtitle': 'Repositórios atualizados no Github.',
            'projects.loading': 'Carregando projetos...',
            'projects.empty': 'Nenhum repositório público encontrado.',
            'projects.error': 'Não foi possível carregar os projetos agora.',
            'projects.fallback': 'Projeto em desenvolvimento...',
            'projects.view': 'Ver Código',
            'footer.quote': 'Enquanto os normais dormem, os loucos programam o futuro!',
            'contact.title': 'Entre em contato',
            'contact.subtitle': 'Descreva seu projeto ou demanda e marcaremos uma reunião. Assim, juntos, desenvolveremos uma solução.',
            'form.name': 'Nome *',
            'form.name.ph': 'Nome completo',
            'form.email': 'Seu melhor Email *',
            'form.phone': 'Seu telefone para Contato *',
            'form.phone.ph': '(xx) 99999-9999',
            'form.state': 'Estado *',
            'form.city': 'Cidade *',
            'form.city.ph': 'Nome da cidade',
            'form.message': 'Escreva sua mensagem',
            'form.message.ph': 'Descreva...',
            'form.submit': 'Enviar'
        },
        en: {
            'meta.title.home': 'Silas Gonçalves',
            'meta.title.contact': 'Silas Gonçalves — Contact',
            'nav.aria': 'Main menu',
            'nav.menu': 'Open menu',
            'nav.home': 'Home',
            'nav.contacts': 'Contact',
            'nav.theme': 'Toggle light or dark theme',
            'nav.theme.light': 'Light',
            'nav.theme.dark': 'Dark',
            'nav.lang': 'Language',
            'hero.bio': 'Graduated in Systems Analysis and Development, specialized in Software Engineering and Architecture, Microsoft-certified, MikroTik Networks and Firewall specialist, and Full Stack Developer.',
            'hero.cv': 'Download Resume',
            'hero.linkedin': 'View LinkedIn',
            'skills.title': 'Skills',
            'skills.subtitle': 'Technologies and areas I work with every day.',
            'skill.react': 'Interactive UIs with reusable components, state management, and efficient rendering as data changes.',
            'skill.node': 'Async APIs and backend services, database integration, and automation.',
            'skill.js': 'Core language for front and back: DOM, events, fetch, application logic, and tooling.',
            'skill.db.title': 'Databases',
            'skill.db': 'SQL, MySQL, MongoDB, Firebase, and Prisma. Backups, scripts, and access control.',
            'skill.front': 'Responsive layouts with Bootstrap, CSS (Flexbox/Grid), forms, and animations.',
            'skill.network.title': 'Networks & Firewall',
            'skill.network': 'MikroTik RouterOS: NAT, FailOver, LoadBalance, VPNs, Hotspots, QoS, and bandwidth control.',
            'skill.os': 'Windows Server, Azure, and Power BI. Debian/Ubuntu Server and virtualization.',
            'skill.fullstack': 'From frontend to deploy: API integration, authentication, and end-to-end feature delivery.',
            'skill.github.title': 'More on Github',
            'skill.github.html': 'On my <a class="text-dark github-inline-link" href="https://github.com/silasgoncalvesczs" target="_blank" rel="noopener noreferrer">Github</a> you will find recent projects and study materials.',
            'projects.title': 'Recent projects',
            'projects.subtitle': 'Latest updated repositories on Github.',
            'projects.loading': 'Loading projects...',
            'projects.empty': 'No public repositories found.',
            'projects.error': 'Could not load projects right now.',
            'projects.fallback': 'Project in development...',
            'projects.view': 'View Code',
            'footer.quote': 'While ordinary people sleep, the crazy ones code the future!',
            'contact.title': 'Get in touch',
            'contact.subtitle': 'Describe your project or need and we will schedule a meeting. Together we will build a solution.',
            'form.name': 'Name *',
            'form.name.ph': 'Full name',
            'form.email': 'Best email *',
            'form.phone': 'Phone number *',
            'form.phone.ph': '(xx) 99999-9999',
            'form.state': 'State *',
            'form.city': 'City *',
            'form.city.ph': 'City name',
            'form.message': 'Write your message',
            'form.message.ph': 'Describe...',
            'form.submit': 'Send'
        }
    };

    const listeners = [];

    function detectLang() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved === 'pt' || saved === 'en') return saved;
        } catch (e) { /* ignore */ }

        const browser = (navigator.language || 'pt').toLowerCase();
        return browser.startsWith('en') ? 'en' : 'pt';
    }

    let current = detectLang();

    function t(key) {
        return (translations[current] && translations[current][key])
            || (translations.pt && translations.pt[key])
            || key;
    }

    function getLang() {
        return current;
    }

    function apply(lang) {
        if (lang !== 'pt' && lang !== 'en') return;
        current = lang;

        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* ignore */ }

        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            el.textContent = t(key);
        });

        document.querySelectorAll('[data-i18n-html]').forEach((el) => {
            const key = el.getAttribute('data-i18n-html');
            if (!key) return;
            el.innerHTML = t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            el.setAttribute('placeholder', t(key));
        });

        document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
            const key = el.getAttribute('data-i18n-aria');
            if (!key) return;
            el.setAttribute('aria-label', t(key));
        });

        document.querySelectorAll('[data-i18n-value]').forEach((el) => {
            const key = el.getAttribute('data-i18n-value');
            if (!key) return;
            el.value = t(key);
        });

        const titleKey = document.body.getAttribute('data-i18n-title');
        if (titleKey) {
            document.title = t(titleKey);
        }

        document.querySelectorAll('[data-set-lang]').forEach((btn) => {
            const isActive = btn.getAttribute('data-set-lang') === lang;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        listeners.forEach((fn) => {
            try { fn(lang); } catch (e) { /* ignore */ }
        });
    }

    function setLang(lang) {
        apply(lang);
    }

    function onChange(fn) {
        if (typeof fn === 'function') listeners.push(fn);
    }

    function init() {
        apply(current);

        document.querySelectorAll('[data-set-lang]').forEach((btn) => {
            btn.addEventListener('click', () => {
                setLang(btn.getAttribute('data-set-lang'));
            });
        });
    }

    return { t, getLang, setLang, apply, onChange, init, translations };
})();
