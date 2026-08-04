// ==========================================
// 0. I18N (deve rodar antes dos efeitos de texto)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (window.I18N) {
        window.I18N.init();
    }
});

// ==========================================
// 1. EFEITO MÁQUINA DE ESCREVER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const introElement = document.getElementById('hero-bio');
    if (!introElement || !window.I18N) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let typingTimer = null;
    let typingToken = 0;

    function runTypeWriter(text) {
        if (typingTimer) clearTimeout(typingTimer);
        const token = ++typingToken;

        if (prefersReducedMotion) {
            introElement.textContent = text;
            return;
        }

        introElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (token !== typingToken) return;
            if (i < text.length) {
                introElement.textContent += text.charAt(i);
                i++;
                typingTimer = setTimeout(typeWriter, 25);
            }
        }

        typeWriter();
    }

    // Texto já traduzido pelo I18N.init() neste mesmo ciclo de DOMContentLoaded
    // (handlers rodam na ordem de registro; i18n é o primeiro)
    runTypeWriter(window.I18N.t('hero.bio'));

    window.I18N.onChange(() => {
        runTypeWriter(window.I18N.t('hero.bio'));
    });
});

// ==========================================
// 2. MÁSCARA DE TELEFONE (CONTATO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById('mce-PHONE');

    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
        const x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
});

// ==========================================
// 3. API DO GITHUB - PROJETOS RECENTES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const repoContainer = document.getElementById('meus-repos-dinamicos');
    if (!repoContainer) return;

    const loadingEl = document.getElementById('repos-loading');
    let repoCards = [];

    function translateRepoCards() {
        if (!window.I18N) return;
        repoCards.forEach(({ desc, link, repo }) => {
            desc.textContent = repo.description || window.I18N.t('projects.fallback');
            link.textContent = window.I18N.t('projects.view');
        });
    }

    if (window.I18N) {
        window.I18N.onChange(translateRepoCards);
    }

    fetch('https://api.github.com/users/silasgoncalvesczs/repos?sort=updated&per_page=6')
        .then((response) => {
            if (!response.ok) throw new Error('GitHub API ' + response.status);
            return response.json();
        })
        .then((data) => {
            if (!Array.isArray(data) || data.length === 0) {
                if (loadingEl) {
                    loadingEl.removeAttribute('data-i18n');
                    loadingEl.textContent = window.I18N
                        ? window.I18N.t('projects.empty')
                        : 'Nenhum repositório público encontrado.';
                }
                return;
            }

            if (loadingEl) loadingEl.remove();

            data
                .filter((repo) => !repo.fork)
                .slice(0, 6)
                .forEach((repo) => {
                    const card = document.createElement('div');
                    card.className = 'card text-bg-dark border-primary col-md-3 m-2 hidden-scroll';

                    const body = document.createElement('div');
                    body.className = 'card-body d-flex flex-column';

                    const title = document.createElement('h6');
                    title.className = 'card-title fonte01 TextCorLaran';
                    title.style.fontSize = '12px';
                    title.textContent = repo.name;

                    const desc = document.createElement('p');
                    desc.className = 'card-text fonte03 text-muted flex-grow-1';
                    desc.textContent = repo.description
                        || (window.I18N ? window.I18N.t('projects.fallback') : 'Projeto em desenvolvimento...');

                    const link = document.createElement('a');
                    link.href = repo.html_url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'btn btn-outline-primary btn-sm mt-auto';
                    link.textContent = window.I18N ? window.I18N.t('projects.view') : 'Ver Código';

                    body.append(title, desc, link);
                    card.appendChild(body);
                    repoContainer.appendChild(card);
                    repoCards.push({ desc, link, repo });

                    if (window.__portfolioObserve) {
                        window.__portfolioObserve(card);
                    }
                });
        })
        .catch(() => {
            if (loadingEl) {
                loadingEl.removeAttribute('data-i18n');
                loadingEl.textContent = window.I18N
                    ? window.I18N.t('projects.error')
                    : 'Não foi possível carregar os projetos agora.';
            }
        });
});

// ==========================================
// 4. ANIMAÇÃO DE ROLAGEM (SCROLL REVEAL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        document.querySelectorAll('.hidden-scroll').forEach((el) => {
            el.classList.add('show-scroll');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    });

    window.__portfolioObserve = (el) => observer.observe(el);

    document.querySelectorAll('.hidden-scroll').forEach((el) => observer.observe(el));
});

// ==========================================
// 5. MODO CLARO / ESCURO (TOGGLE DINÂMICO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const body = document.body;
    const root = document.documentElement;

    function updateButtonUI() {
        if (!themeIcon || !themeText) return;

        const isLight = body.classList.contains('light-theme');
        themeIcon.textContent = isLight ? '🌙' : '☀️';

        if (window.I18N) {
            themeText.textContent = window.I18N.t(isLight ? 'nav.theme.dark' : 'nav.theme.light');
        } else {
            themeText.textContent = isLight ? 'Escuro' : 'Claro';
        }
    }

    if (root.classList.contains('theme-pending-light') || localStorage.getItem('theme') === 'light') {
        body.classList.add('light-theme');
        root.classList.remove('theme-pending-light');
    }

    updateButtonUI();

    if (window.I18N) {
        window.I18N.onChange(updateButtonUI);
    }

    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');

        if (body.classList.contains('light-theme')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }

        updateButtonUI();
    });
});
