// ==========================================
// 1. EFEITO MÁQUINA DE ESCREVER
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const introElement = document.querySelector('.h1Titulo + p');

    if (introElement) {
        const text = introElement.innerHTML.trim();
        introElement.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                introElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 25);
            }
        }

        typeWriter();
    }
});

// ==========================================
// 2. MÁSCARA DE TELEFONE (CONTATO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById('mce-PHONE');

    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }
});

// ==========================================
// 3. BOTÃO FLUTUANTE DO LINKEDIN
// ==========================================
window.addEventListener('scroll', () => {
    let btn = document.getElementById('linkedin-float');

    if (window.scrollY > 300) {
        if (!btn) {
            btn = document.createElement('a');
            btn.id = 'linkedin-float';
            btn.href = 'https://www.linkedin.com/in/silasgoncal';
            btn.target = '_blank';
            btn.innerHTML = '🔶 Conectar no LinkedIn';

            btn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #0e76a8;
                color: white;
                padding: 12px 20px;
                border-radius: 8px;
                text-decoration: none;
                font-family: 'Poiret One', cursive;
                font-weight: bold;
                font-size: 16px;
                z-index: 1000;
                box-shadow: 0px 4px 6px rgba(0,0,0,0.5);
                transition: transform 0.2s;
            `;

            btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
            btn.onmouseout = () => btn.style.transform = 'scale(1)';

            document.body.appendChild(btn);
        }
        btn.style.display = 'block';
    } else if (btn) {
        btn.style.display = 'none';
    }
});

// ==========================================
// 4. API DO GITHUB - PROJETOS RECENTES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const githubStatsImg = document.querySelector('.cardsGithub');

    if (githubStatsImg) {
        const repoContainer = document.createElement('div');
        repoContainer.className = 'row justify-content-center mt-4 mx-1';
        repoContainer.id = 'meus-repos-dinamicos';
        githubStatsImg.parentElement.parentElement.appendChild(repoContainer);

        fetch('https://api.github.com/users/silasgoncalvesczs/repos?sort=updated&per_page=3')
            .then(response => response.json())
            .then(data => {
                data.forEach(repo => {
                    const card = document.createElement('div');
                    card.className = 'card text-bg-dark border-primary col-md-3 m-2';

                    card.innerHTML = `
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title fonte01 TextCorLaran" style="font-size: 12px;">${repo.name}</h6>
                            <p class="card-text fonte03 text-muted flex-grow-1">${repo.description || 'Projeto em desenvolvimento...'}</p>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-sm mt-auto">Ver Código</a>
                        </div>
                    `;
                    repoContainer.appendChild(card);
                });
            })
            .catch(error => console.log('Erro ao buscar repositórios:', error));
    }
});

// ==========================================
// 5. ANIMAÇÃO DE ROLAGEM (SCROLL REVEAL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach((el) => observer.observe(el));
});

// ==========================================
// 6. MODO CLARO / ESCURO (TOGGLE DINÂMICO)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    const body = document.body;

    // Função para atualizar o visual (texto e ícone) do botão
    function updateButtonUI() {
        if (!themeIcon || !themeText) return;

        if (body.classList.contains('light-theme')) {
            themeIcon.innerHTML = '🌙';
            themeText.innerHTML = 'Escuro';
        } else {
            themeIcon.innerHTML = '☀️';
            themeText.innerHTML = 'Claro';
        }
    }

    // Verifica preferência salva
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        // Atualiza a interface do botão logo ao carregar
        updateButtonUI();

        themeToggleBtn.addEventListener('click', () => {
            // Alterna a classe no body
            body.classList.toggle('light-theme');

            // Salva a preferência
            if (body.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }

            // Atualiza o texto e ícone do botão
            updateButtonUI();
        });
    }
});