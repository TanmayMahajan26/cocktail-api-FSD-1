document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // PARTICLE SYSTEM
    // ===========================
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrameId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedY = -(Math.random() * 0.3 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.15;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeSpeed = Math.random() * 0.003 + 0.001;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0 || this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(60, Math.floor(window.innerWidth / 20));
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animFrameId = requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // ===========================
    // AURORA MOUNT
    // ===========================
    requestAnimationFrame(() => {
        document.querySelector('.aurora-engine').classList.add('active');
    });

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    });

    // ===========================
    // MOBILE MENU
    // ===========================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===========================
    // 3D TILT ON HERO VISUAL
    // ===========================
    const heroVisual = document.getElementById('hero-visual');
    const glass3d = document.getElementById('glass-3d');

    if (heroVisual && glass3d) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);

            glass3d.style.transform = `rotateY(${dx * 15}deg) rotateX(${-dy * 10}deg) translateY(-8px)`;
        });

        heroVisual.addEventListener('mouseleave', () => {
            glass3d.style.transition = 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
            glass3d.style.transform = '';
            setTimeout(() => glass3d.style.transition = '', 800);
        });

        heroVisual.addEventListener('mouseenter', () => {
            glass3d.style.transition = 'none';
        });
    }

    // ===========================
    // SMOOTH SCROLL BUTTONS
    // ===========================
    document.getElementById('start-btn')?.addEventListener('click', () => {
        document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('learn-btn')?.addEventListener('click', () => {
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // ===========================
    // INPUT BRACKET ANIMATION
    // ===========================
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.toggle('has-value', input.value.length > 0);
        });
        input.addEventListener('focus', () => input.parentElement.classList.add('has-value'));
        input.addEventListener('blur', () => {
            if (!input.value.length) input.parentElement.classList.remove('has-value');
        });
    });

    // ===========================
    // PASSWORD LIVE DECRYPTION
    // ===========================
    const passwordInput = document.getElementById('password');
    const statusLine = document.getElementById('status-line');
    const symbols = '!@#$%^&*<>?/{}[]|~';
    let realPassword = '';
    let decryptTimer = null;

    passwordInput.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            realPassword = realPassword.slice(0, -1);
            passwordInput.value = '∗'.repeat(realPassword.length);
            updateStatus();
            return;
        }
        if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.altKey) return;
        e.preventDefault();
        realPassword += e.key;
        decryptAnimate();
    });

    function decryptAnimate() {
        const len = realPassword.length;
        let frame = 0;
        if (decryptTimer) clearInterval(decryptTimer);
        decryptTimer = setInterval(() => {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += (i === len - 1 && frame < 5)
                    ? symbols[Math.floor(Math.random() * symbols.length)]
                    : '∗';
            }
            passwordInput.value = str;
            frame++;
            if (frame >= 6) { clearInterval(decryptTimer); decryptTimer = null; }
        }, 18);
        updateStatus();
    }

    function updateStatus() {
        if (!statusLine) return;
        statusLine.textContent = realPassword.length > 0
            ? `DECRYPTING... [${realPassword.length} CHARS]`
            : 'AWAITING CREDENTIALS';
    }

    // ===========================
    // MAGNETIC BUTTONS
    // ===========================
    function initMagnetic() {
        document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
            let hovering = false;
            btn.addEventListener('mouseenter', () => { hovering = true; btn.style.transition = 'box-shadow 0.3s ease, background 0.3s ease'; });
            btn.addEventListener('mousemove', (e) => {
                if (!hovering) return;
                const rect = btn.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                btn.style.transform = `translate(${dx * 0.2}px, ${dy * 0.2}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                hovering = false;
                btn.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                btn.style.transform = '';
            });
        });
    }
    initMagnetic();

    // ===========================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===========================
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card').forEach(card => observer.observe(card));

    // ===========================
    // ACTIVE NAV LINK ON SCROLL
    // ===========================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) current = section.id;
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    });

    // ===========================
    // API — COCKTAIL FETCH
    // ===========================
    const authForm = document.getElementById('auth-form');
    const authCard = document.getElementById('auth-card');
    const cocktailCard = document.getElementById('cocktail-card');

    const imgEl = document.getElementById('cocktail-img');
    const nameEl = document.getElementById('cocktail-name');
    const categoryEl = document.getElementById('cocktail-category');
    const categoryBadge = document.getElementById('cocktail-category-badge');
    const glassEl = document.getElementById('cocktail-glass');
    const ingredientsEl = document.getElementById('cocktail-ingredients');
    const instructionsEl = document.getElementById('cocktail-instructions');

    const triggerBtn = document.getElementById('trigger-btn');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        if (!user || realPassword.length === 0) {
            if (statusLine) statusLine.textContent = 'ERROR: FIELDS REQUIRED';
            return;
        }

        triggerBtn.querySelector('span').textContent = '[ AUTHENTICATING... ]';
        if (statusLine) statusLine.textContent = 'ESTABLISHING TUNNEL...';

        try {
            const res = await fetch('/api/cocktail');
            const result = await res.json();

            if (result.success) {
                populateData(result.data);
                authCard.classList.add('hidden');
                cocktailCard.classList.remove('hidden');
                initMagnetic();
            } else {
                showError();
            }
        } catch {
            showError();
        }
    });

    nextBtn.addEventListener('click', async () => {
        const text = nextBtn.querySelector('span');
        text.textContent = '[ QUERYING... ]';
        cocktailCard.style.opacity = '0.6';

        try {
            const res = await fetch('/api/cocktail');
            const result = await res.json();
            if (result.success) populateData(result.data);
        } catch {}

        cocktailCard.style.opacity = '1';
        text.textContent = '[ NEXT_QUERY ]';
    });

    backBtn.addEventListener('click', () => {
        cocktailCard.classList.add('hidden');
        authCard.classList.remove('hidden');
        triggerBtn.querySelector('span').textContent = '[ INITIATE_HANDSHAKE ]';
        if (statusLine) statusLine.textContent = 'AWAITING CREDENTIALS';
    });

    function showError() {
        triggerBtn.querySelector('span').textContent = '[ FAILED ]';
        if (statusLine) statusLine.textContent = 'CONNECTION REJECTED';
        setTimeout(() => {
            triggerBtn.querySelector('span').textContent = '[ INITIATE_HANDSHAKE ]';
            if (statusLine) statusLine.textContent = 'AWAITING CREDENTIALS';
        }, 2500);
    }

    function populateData(data) {
        imgEl.src = data.image;
        imgEl.alt = data.name;
        nameEl.textContent = data.name;
        categoryEl.textContent = data.category;
        categoryBadge.textContent = data.category;
        glassEl.textContent = data.glass;

        ingredientsEl.innerHTML = '';
        data.ingredients.forEach((ing, i) => {
            const li = document.createElement('li');
            li.textContent = ing;
            li.style.animationDelay = `${i * 0.06}s`;
            ingredientsEl.appendChild(li);
        });

        instructionsEl.textContent = data.instructions;
    }
});
