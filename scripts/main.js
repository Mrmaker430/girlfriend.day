const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.volume = 0.4;
    bgMusic.play().catch(function(error) {
        console.log('Autoplay prevented, user must interact first');
    });
    
    document.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play().catch(function(e) {});
        }
    });
}

const lovePage = document.getElementById('loveQuestionPage');
const loveStep1 = document.getElementById('loveStep1');
const loveStep2 = document.getElementById('loveStep2');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const btnNext = document.getElementById('btnNext');
const btnGroup = document.getElementById('btnGroup');

let isRunning = false;

btnNo.addEventListener('mouseenter', function(e) {
    if (!isRunning) {
        isRunning = true;
        
        const containerRect = btnGroup.getBoundingClientRect();
        const btnRect = this.getBoundingClientRect();
        const yesBtnRect = btnYes.getBoundingClientRect();

        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;
        
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const padding = 10;
        const maxX = containerWidth - btnWidth - padding;
        const maxY = containerHeight - btnHeight - padding;

        let randomX, randomY;
        let attempts = 0;
        const maxAttempts = 50;

        do {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;
            attempts++;

            const btnLeft = containerRect.left + randomX;
            const btnRight = btnLeft + btnWidth;
            const btnTop = containerRect.top + randomY;
            const btnBottom = btnTop + btnHeight;

            const overlapX = btnLeft < yesBtnRect.right && btnRight > yesBtnRect.left;
            const overlapY = btnTop < yesBtnRect.bottom && btnBottom > yesBtnRect.top;

            if (!overlapX || !overlapY) {
                break;
            }
        } while (attempts < maxAttempts);

        this.classList.add('running');
        this.style.left = randomX + 'px';
        this.style.top = randomY + 'px';
        this.style.transform = 'none';

        setTimeout(() => {
            isRunning = false;
        }, 100);
    }
});

btnYes.addEventListener('click', function() {
    const colors = ['#FF4D8D', '#FF7EB3', '#6A1B9A', '#FFD700', '#FF6B6B', '#FF1493'];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.top = '-10px';
            piece.style.width = (Math.random() * 10 + 5) + 'px';
            piece.style.height = (Math.random() * 10 + 5) + 'px';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            piece.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 3000);
        }, i * 20);
    }

    loveStep1.classList.add('hidden');
    loveStep2.classList.remove('hidden');
    loveStep2.classList.add('fade-in');
    if (bgMusic) {
        bgMusic.volume = 0.4;
    }
});

btnNext.addEventListener('click', function() {
    lovePage.classList.add('hidden-page');
    document.getElementById('main-content').classList.remove('hidden');
    initMainWebsite();
});

btnNo.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.add('shake-animation');
    setTimeout(() => {
        this.classList.remove('shake-animation');
    }, 500);
});

function initMainWebsite() {
    const Lenis = window.Lenis || window.lenis;
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const confetti = window.confetti;

    let lenis;
    try {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    } catch (e) {
        console.log('Lenis not available, using default scroll');
    }

    const loadingScreen = document.getElementById('loading-screen');
    const progressFill = document.getElementById('progressFill');

    const reasons = [
        'Your smile', 'Your eyes', 'Your laugh', 'Your kindness',
        'Your patience', 'Your strength', 'Your passion', 'Your loyalty',
        'Your intelligence', 'Your beauty', 'Your warmth', 'Your grace',
        'Your charm', 'Your wit', 'Your heart', 'Your spirit',
        'Your courage', 'Your faith', 'Your hope', 'Your love',
        'Your kisses', 'Your hugs', 'Your voice', 'Your touch',
        'Your presence', 'Your understanding', 'Your forgiveness', 'Your trust',
        'Your joy', 'Your peace', 'Your gentleness', 'Your honesty',
        'Your creativity', 'Your dreams', 'Your encouragement', 'Your support',
        'Your laughter', 'Your smiles', 'Your affection', 'Your devotion',
        'Your gratitude', 'Your wisdom', 'Your compassion', 'Your empathy',
        'Your humor', 'Your friendship', 'Your companionship', 'Your partnership',
        'Your comfort', 'Your safety', 'Your passion', 'Your motivation',
        'Your inspiration', 'Your guidance', 'Your protection', 'Your care',
        'Your attention', 'Your focus', 'Your determination', 'Your resilience',
        'Your optimism', 'Your enthusiasm', 'Your energy', 'Your vibrancy',
        'Your sweetness', 'Your tenderness', 'Your gentleness', 'Your softness',
        'Your fierceness', 'Your fire', 'Your spark', 'Your glow',
        'Your radiance', 'Your shine', 'Your light', 'Your warmth',
        'Your soul', 'Your mind', 'Your heart', 'Your everything',
        'The way you smile', 'The way you laugh', 'The way you love',
        'The way you care', 'The way you are', 'Your uniqueness',
        'Your flaws', 'Your perfections', 'Your presence', 'Your absence',
        'Your words', 'Your silence', 'Your truth', 'Your authenticity',
        'Your vulnerability', 'Your strength', 'Your beauty inside', 'Your beauty outside',
        'Just you', 'Forever you', 'Always you'
    ];

    const memories = [
        { emoji: '🌅', title: 'First Sunset' },
        { emoji: '🌊', title: 'Beach Day' },
        { emoji: '🌺', title: 'Flower Garden' },
        { emoji: '🎵', title: 'Our Song' },
        { emoji: '🌙', title: 'Starry Night' },
        { emoji: '☕', title: 'Coffee Dates' },
        { emoji: '📚', title: 'Bookstore Love' },
        { emoji: '🎨', title: 'Creative Days' },
        { emoji: '🍕', title: 'Pizza Nights' },
        { emoji: '✈️', title: 'Adventure Time' },
        { emoji: '🎭', title: 'Theater Nights' },
        { emoji: '🌿', title: 'Nature Walks' }
    ];

    const messages = [
        'You are my sunshine on a cloudy day.',
        'Every day with you is a beautiful adventure.',
        'Your love is the most precious gift I\'ve ever received.',
        'I fall in love with you a little more every day.',
        'You make my world brighter just by being in it.',
        'Your smile is my favorite thing to see.',
        'I\'m so grateful to have you in my life.',
        'You are truly one of a kind.',
        'My heart belongs to you, forever.',
        'Thank you for being you.'
    ];

    const promises = [
        'I promise to always be by your side.',
        'I promise to listen to you with my whole heart.',
        'I promise to make you laugh every single day.',
        'I promise to support your dreams.',
        'I promise to be your biggest fan.',
        'I promise to hold your hand through everything.',
        'I promise to never give up on us.',
        'I promise to love you more each day.',
        'I promise to be your peace.',
        'I promise to choose you, always.'
    ];

    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                initAnimations();
                initCounter();
                initReasons();
                initTimeline();
                initGallery();
                initGarden();
                initLetters();
                initPromises();
                initFinalLetter();
                initSurprise();
                initNightSky();
                initMouseFollower();
                initFloatingHearts();
            }, 500);
        }
        progressFill.style.width = progress + '%';
    }, 200);

    function initAnimations() {
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5,
        });

        gsap.from('.hero-subtitle', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.8,
        });

        gsap.from('.scroll-indicator', {
            duration: 1.5,
            y: 30,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.2,
        });

        const sections = document.querySelectorAll('.section');
        sections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });
        });
    }

    function initTypingText() {
        const text = "Happy Girlfriend Day ❤️";
        const typingElement = document.getElementById('typingText');
        let index = 0;

        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        setTimeout(type, 1000);
    }

    function initFloatingHearts() {
        const container = document.getElementById('floatingHearts');
        const heartSymbols = ['❤️', '💕', '💗', '💖', '💝'];

        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 2 + 0.5) + 'rem';
            heart.style.setProperty('--duration', (Math.random() * 6 + 4) + 's');
            heart.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(heart);
        }
    }

    function initTimeline() {
        const timelineData = [
            { title: 'We Met', description: 'The day our eyes first met, and I knew something special was about to begin.' },
            { title: 'We Talked', description: 'Late night conversations that felt like hours, but we never wanted to end.' },
            { title: 'We Laughed', description: 'Your laughter became my favorite sound in the world.' },
            { title: 'We Became Best Friends', description: 'We shared our dreams, fears, and everything in between.' },
            { title: 'We Fell in Love', description: 'And just like that, we found our forever in each other.' },
        ];

        const timeline = document.getElementById('timeline');

        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
            timeline.appendChild(timelineItem);

            setTimeout(() => {
                timelineItem.classList.add('visible');
            }, 300 * (index + 1));
        });
    }

    function initGallery() {
        const grid = document.getElementById('photoGrid');

        memories.forEach((memory) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.style.setProperty('--rotation', (Math.random() * 6 - 3) + 'deg');
            card.innerHTML = `
                <div class="photo-placeholder">${memory.emoji}</div>
                <p>${memory.title}</p>
            `;
            grid.appendChild(card);
        });
    }

    function initCounter() {
        const startDate = new Date('2024-01-15T00:00:00');

        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCounter();
        setInterval(updateCounter, 1000);
    }

    function initReasons() {
        const grid = document.getElementById('reasonsGrid');

        reasons.forEach((reason, index) => {
            const card = document.createElement('div');
            card.className = 'reason-card';
            card.innerHTML = `
                <span class="reason-number">#${index + 1}</span>
                <span class="reason-text">${reason}</span>
            `;
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                confetti({
                    particleCount: 20,
                    spread: 60,
                    origin: { y: 0.6 },
                    colors: ['#FF4D8D', '#FF7EB3', '#6A1B9A'],
                });
            });
            grid.appendChild(card);
        });
    }

    function initGarden() {
        const container = document.getElementById('gardenContainer');
        const flowers = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼', '💐', '🌸', '🌺', '🌷'];

        container.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const flower = document.createElement('div');
            flower.className = 'flower';
            flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            flower.style.left = (x - 20) + 'px';
            flower.style.top = (y - 20) + 'px';
            flower.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';

            const heart = document.createElement('div');
            heart.className = 'flower';
            heart.textContent = '❤️';
            heart.style.left = (x + Math.random() * 60 - 30) + 'px';
            heart.style.top = (y + Math.random() * 60 - 30) + 'px';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            heart.style.animationDelay = '0.2s';

            container.appendChild(flower);
            container.appendChild(heart);

            confetti({
                particleCount: 15,
                spread: 45,
                origin: { x: (x / rect.width), y: (y / rect.height) },
                colors: ['#FF4D8D', '#FF7EB3', '#6A1B9A'],
            });

            setTimeout(() => {
                flower.remove();
                heart.remove();
            }, 3000);
        });
    }

    function initLetters() {
        const container = document.getElementById('lettersContainer');

        messages.slice(0, 6).forEach((message, index) => {
            const envelope = document.createElement('div');
            envelope.className = 'letter-envelope';
            envelope.innerHTML = `
                <i class="fas fa-envelope"></i>
                <p class="letter-preview">Secret Letter #${index + 1}</p>
            `;
            envelope.addEventListener('click', function() {
                const msg = messages[Math.floor(Math.random() * messages.length)];
                alert(`💌 ${msg}`);
                confetti({
                    particleCount: 30,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FF4D8D', '#FF7EB3', '#6A1B9A'],
                });
            });
            container.appendChild(envelope);
        });
    }

    function initPromises() {
        const notebook = document.getElementById('notebook');

        promises.forEach((promise, index) => {
            const item = document.createElement('div');
            item.className = 'promise-item';
            item.textContent = promise;
            notebook.appendChild(item);

            setTimeout(() => {
                item.classList.add('visible');
            }, 300 * (index + 1));
        });
    }

    function initFinalLetter() {
        const letter = document.getElementById('letterContent');
        const text = `My Dearest Love,

Every word in this website was written with you in mind. Every heart, every flower, every promise is a reflection of what you mean to me.

You are the most beautiful soul I have ever known. Your kindness, your strength, your laughter - they fill my world with light.

I never knew what love was until I met you. And now I can't imagine my life without you in it.

Thank you for being you. Thank you for choosing me. Thank you for every moment we've shared.

Forever yours,
❤️`;

        let isVisible = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !isVisible) {
                    isVisible = true;
                    letter.classList.add('visible');

                    const chars = text.split('');
                    let charIndex = 0;

                    function typeLetter() {
                        if (charIndex < chars.length) {
                            letter.textContent += chars[charIndex];
                            charIndex++;
                            setTimeout(typeLetter, 30);
                        }
                    }

                    setTimeout(typeLetter, 500);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(letter);
    }

    function initSurprise() {
        const button = document.getElementById('surpriseButton');

        button.addEventListener('click', function() {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FF4D8D', '#FF7EB3', '#6A1B9A', '#FFD700', '#FF6B6B'],
            });

            setTimeout(() => {
                confetti({
         
