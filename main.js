import './style.css';

const PASSCODE = '2914';

// Application State
const appState = {
  currentScreen: 'lock', // lock, intro, gifts, collage, blessing, cake, bmw, video, apology, ending
  giftsOpened: { 1: false, 2: false, 3: false, 4: false },
  currentInput: '',
  letterTyped: false
};

const letterText = `Hey my thangapulla ❤️
Happy 18th Birthday, Lakshana…

3 years of us…
From strangers to something so special.

From silly fights to endless laughs…
our Tom & Jerry life 😄❤️

I still remember our first hug. 🫂
That moment felt like home.

But in all that chaos… you became my peace.

I know… I made mistakes.
I made you feel down… lonely… and even broke you!!
And I’m really sorry for that 💔

You didn’t deserve that pain.
But you still stayed… and that means everything to me.

I promise… I’ll do better.
Not perfect… but better for you ❤️

Because you mean too much to lose.

But today is about you 🖤
You deserve everything beautiful in this world.

From this little girl...🤌🏻
To the most beautiful soul I know!💗

If someday life gives us another chance,
I promise I'll love you better.🛐

Until then...
No expectations... just love💗

Still choosing you... always.🖤🫂

- Yours, Tarunesh`;

// --- DOM Rendering ---

function renderApp() {
  const app = document.getElementById('app');
  let content = '';

  if (appState.currentScreen === 'lock') content = renderLockScreen();
  else if (appState.currentScreen === 'intro') content = renderIntroScreen();
  else if (appState.currentScreen === 'gifts') content = renderGiftsScreen();
  else if (appState.currentScreen === 'bmw') content = renderBMWScreen();
  else if (appState.currentScreen === 'collage') content = renderCollageScreen();
  else if (appState.currentScreen === 'blessing') content = renderBlessingScreen();
  else if (appState.currentScreen === 'cake') content = renderCakeScreen();
  else if (appState.currentScreen === 'video') content = renderVideoScreen();
  else if (appState.currentScreen === 'apology') content = renderApologyScreen();
  else if (appState.currentScreen === 'ending') content = renderEndingScreen();

  app.innerHTML = content + renderLightbox();
  
  if (appState.currentScreen === 'lock') updateDisplay();
  if (appState.currentScreen === 'ending') startConfetti();
  if (appState.currentScreen === 'blessing') startBlessingSequence();
  if (appState.currentScreen === 'collage') startCollageSequence();
  if (appState.currentScreen === 'video') startVideoSequence();
  if (appState.currentScreen === 'apology') startApologySequence();
}

function renderLightbox() {
  return `
    <div id="lightboxOverlay" class="lightbox-overlay hidden" onclick="window.closeLightbox()">
       <img id="lightboxImg" src="" />
       <div class="close-hint">Tap anywhere to close</div>
    </div>
  `;
}

// 🔐 SCREEN 1: LOCK SCREEN
function renderLockScreen() {
  return `
    <div class="screen flex-center" id="lockScreenEl">
      <div class="glass lock-card">
        <h1 class="lock-title blur-reveal">For you… ❤️</h1>
        <p class="lock-subtitle">Enter the date that means everything to us</p>
        
        <div class="keypad-display" id="keypadDisplay">○ ○ ○ ○</div>
        <div class="error-msg" id="errorMsg">Wrong code 💔</div>
        
        <div class="keypad-grid">
          ${[1,2,3,4,5,6,7,8,9].map(num => `
            <button class="key-btn" onclick="window.handleKeypress('${num}')">${num}</button>
          `).join('')}
          <button class="key-btn key-clear" onclick="window.clearInput()">C</button>
          <button class="key-btn" onclick="window.handleKeypress('0')">0</button>
          <button class="key-btn key-clear" onclick="window.deleteInput()">⌫</button>
        </div>
      </div>
      <div id="sparkles-container"></div>
    </div>
  `;
}

// 🎉 SCREEN 2: INTRO
function renderIntroScreen() {
  return `
    <div class="screen fade-in flex-center">
      <div class="intro-content glass luxury-border slide-up">
        <div class="intro-illustration float-anim">🤍</div>
        <h2 class="gold-accent">To my favorite person… ❤️</h2>
        <h1 class="elegant-title">Happy 18th Birthday Lakshana 🎂✨</h1>
        <button class="primary-btn luxury-btn pulse" onclick="window.navigate('gifts')">Open your surprise 🎁</button>
      </div>
    </div>
  `;
}

// 🎁 SCREEN 3: GIFTS
function renderGiftsScreen() {
  const allOpened = Object.values(appState.giftsOpened).every(Boolean);
  
  return `
    <div class="screen fade-in flex-center">
      <div class="gifts-container">
        <h2 class="elegant-title gold-accent">Pick all your surprises… ❤️</h2>
        <p class="subtitle">I made each one just for you</p>
        
        <div class="gifts-grid">
          <div class="gift-box premium-glass ${appState.giftsOpened[1] ? 'opened' : ''}" onclick="window.openGift(1)">
            <div class="gift-icon bounce-hover">🎁</div>
            <p>1. Memories 🥺</p>
          </div>
          <div class="gift-box premium-glass ${appState.giftsOpened[2] ? 'opened' : ''}" onclick="window.openGift(2)">
            <div class="gift-icon bounce-hover">🎁</div>
            <p>2. Chaos 😄</p>
          </div>
          <div class="gift-box premium-glass ${appState.giftsOpened[3] ? 'opened' : ''}" onclick="window.openGift(3)">
            <div class="gift-icon bounce-hover">🎁</div>
            <p>3. Her 👶</p>
          </div>
          <div class="gift-box premium-glass ${appState.giftsOpened[4] ? 'opened' : ''}" onclick="window.openGift(4)">
            <div class="gift-icon bounce-hover">💌</div>
            <p>4. Letter ❤️</p>
          </div>
        </div>
        
        ${allOpened ? `
          <button class="luxury-btn fade-in reveal-final-btn pulse" onclick="window.navigate('collage')">Continue ✨</button>
        ` : `<p class="hint-text mt-4">Open all to continue</p>`}
      </div>
    </div>
    
    <div id="giftModal" class="modal-overlay hidden">
      <div class="modal-content premium-glass" id="modalContent"></div>
      <button class="close-modal-btn" onclick="window.closeModal()">✕</button>
    </div>
  `;
}

// 🏎️ NEW SCREEN 4: BMW SURPRISE
function renderBMWScreen() {
  return `
    <div class="screen bmw-theme fade-in flex-center">
      <div class="showroom-grid"></div>
      <div class="luxury-car-glow"></div>
      
      <div class="car-container slide-in-right">
        <div class="bmw-image-wrapper">
           <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="BMW" class="bmw-hero-img" crossorigin="anonymous" />
           <div class="headlight left"></div>
           <div class="headlight right"></div>
        </div>
      </div>
      
      <div class="bmw-text-block premium-glass-dark slide-up-reveal">
        <h2 class="gold-title">Your surprise is not just here… its on the way home!!❤️</h2>
        <div class="gold-divider"></div>
        <h3 class="gold-subtitle delay-1">It’s on the way to your home 🎁</h3>
        <p class="luxury-mute delay-2">Something special… just like you.</p>
      </div>
      
      <button class="gold-filled-btn fade-in delay-3" onclick="window.navigate('video')">Continue 🎂</button>
    </div>
  `;
}

// 📸 SCREEN 4.5: MEMORY COLLAGE — Our Journey
function renderCollageScreen() {
  return `
    <div class="screen collage-screen" id="collage-stage">
      
      <!-- Blurred background photo layer -->
      <div class="collage-bg-blur"></div>
      
      <!-- Paper texture overlay -->
      <div class="collage-texture"></div>
      
      <!-- Vignette edges -->
      <div class="collage-vignette"></div>
      
      <!-- Floating particles -->
      <div id="collage-particles"></div>
      
      <!-- Content -->
      <div class="collage-content">
        
        <!-- Title -->
        <h2 class="collage-title" id="collage-title">Our Journey ❤️</h2>
        
        <!-- Photo Grid -->
        <div class="collage-grid">
          
          <!-- Photo 1: Top Left -->
          <div class="polaroid-frame pf-1" id="pf-1">
            <div class="pf-tape tape-pink"></div>
            <img src="./images/pic%208.jpg" alt="Memory" style="object-position: top;" />
            <div class="pf-caption">Our moment 💫</div>
            <div class="pf-tag tag-gold">Still my favorite person ❤️</div>
          </div>
          
          <!-- Photo 2: Top Right -->
          <div class="polaroid-frame pf-2" id="pf-2">
            <div class="pf-tape tape-cream"></div>
            <img src="./images/pic%2010.jpg" alt="Memory" />
            <div class="pf-caption">Us 🥺</div>
          </div>
          
          <!-- Photo 3: Center (Hero) -->
          <div class="polaroid-frame pf-3 pf-hero" id="pf-3">
            <div class="pf-tape tape-pink"></div>
            <div class="pf-tape-right tape-cream"></div>
            <img src="./images/pic%209.jpg" alt="Our best moment" />
            <div class="pf-caption">From strangers… to something special 💫</div>
            <div class="pf-tag tag-pink">This was my favorite day 💛</div>
            <div class="pf-sparkle">✨</div>
          </div>
          
          <!-- Photo 4: Bottom Left -->
          <div class="polaroid-frame pf-4" id="pf-4">
            <div class="pf-tape tape-cream"></div>
            <img src="./images/pic%207.jpg" alt="Memory" />
            <div class="pf-caption">Our chaos 😄❤️</div>
          </div>
          
          <!-- Photo 5: Bottom Right -->
          <div class="polaroid-frame pf-5" id="pf-5">
            <div class="pf-tape tape-pink"></div>
            <img src="./images/pic%2011.jpg" alt="Memory" />
            <div class="pf-caption">Forever my love 💕</div>
            <div class="pf-tag tag-gold">My heart ❤️</div>
          </div>
          
        </div>
        
        <!-- Bottom text -->
        <div class="collage-footer" id="collage-footer">
          <p class="collage-quote">
            Every moment with you<br/>
            became a memory I never want to lose ❤️
          </p>
        </div>
        
        <!-- Continue -->
        <button class="collage-continue hidden" id="collage-continue" onclick="window.navigate('blessing')">
          Continue ✨
        </button>
        
      </div>
    </div>
  `;
}

// Collage animation orchestration
function startCollageSequence() {
  const stage = document.getElementById('collage-stage');
  if (!stage) return;
  
  // Spawn floating particles
  const pc = document.getElementById('collage-particles');
  if (pc) {
    function spawnCollageParticle() {
      if (!document.getElementById('collage-stage')) return;
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      p.className = 'coll-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-5px';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      const dur = Math.random() * 6 + 5;
      const sway = (Math.random() - 0.5) * 80;
      p.style.setProperty('--coll-sway', sway + 'px');
      p.style.animationDuration = dur + 's';
      pc.appendChild(p);
      setTimeout(() => p.remove(), dur * 1000);
    }
    
    const pInterval = setInterval(() => {
      if (!document.getElementById('collage-stage')) { clearInterval(pInterval); return; }
      spawnCollageParticle();
    }, 400);
    
    for (let i = 0; i < 15; i++) setTimeout(() => spawnCollageParticle(), i * 100);
  }
  
  // Staggered photo reveal
  const frames = ['pf-1', 'pf-2', 'pf-4', 'pf-5', 'pf-3']; // hero last
  frames.forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.classList.add('pf-visible');
    }, 800 + i * 600);
  });
  
  // Title fade in
  setTimeout(() => {
    const title = document.getElementById('collage-title');
    if (title) title.classList.add('coll-visible');
  }, 300);
  
  // Footer text
  setTimeout(() => {
    const footer = document.getElementById('collage-footer');
    if (footer) footer.classList.add('coll-visible');
  }, 5000);
  
  // Continue button
  setTimeout(() => {
    const btn = document.getElementById('collage-continue');
    if (btn) {
      btn.classList.remove('hidden');
      btn.classList.add('coll-visible');
    }
  }, 6500);
}

// 🙏 SCREEN 4.5b: HEAVENLY BLESSING — Full Sky Scene
function renderBlessingScreen() {
  return `
    <div class="screen blessing-screen flex-center" id="blessing-stage">
      
      <!-- Animated Sky Layers -->
      <div class="sky-layer sky-base"></div>
      <div class="sky-layer sky-glow"></div>
      
      <!-- Animated Cloud Layers -->
      <div class="cloud-layer cloud-back"></div>
      <div class="cloud-layer cloud-mid"></div>
      <div class="cloud-layer cloud-front"></div>
      
      <!-- Divine Light Rays -->
      <div class="divine-rays" id="divine-rays">
        <div class="ray ray-1"></div>
        <div class="ray ray-2"></div>
        <div class="ray ray-3"></div>
        <div class="ray ray-4"></div>
        <div class="ray ray-5"></div>
      </div>
      
      <!-- Floating Sparkle Particles -->
      <div id="blessing-particles"></div>
      
      <!-- Central Sunlight Glow -->
      <div class="blessing-sunlight-core"></div>
      
      <!-- Grandfather Rising from Clouds -->
      <div class="thatha-scene" id="thatha-scene">
        <div class="thatha-outer-glow"></div>
        <div class="thatha-inner-glow"></div>
        <img src="./images/thatha-blessing.png" alt="Thatha's Blessing" class="thatha-figure" id="thatha-figure" />
      </div>
      
      <!-- Text Container -->
      <div class="blessing-text-area" id="blessing-text-area">
        <p class="bl-line1" id="bl-line1">
          Even from above… blessings are always with you 💛
        </p>
        <div class="bl-line2 hidden" id="bl-line2">
          <h2 class="bl-title">Happy Birthday Lakshana ❤️</h2>
          <p class="bl-subtitle">Thatha is always watching over you</p>
        </div>
      </div>
      
      <!-- Continue Button -->
      <button class="bl-continue hidden" id="bl-continue" onclick="window.navigate('cake')">
        Continue 🎂
      </button>
    </div>
  `;
}

// Blessing screen — full animation orchestration
function startBlessingSequence() {
  const particlesContainer = document.getElementById('blessing-particles');
  if (!particlesContainer) return;
  
  // --- Continuously spawn floating sparkles ---
  function spawnSparkle() {
    if (document.getElementById('blessing-stage') === null) return;
    const spark = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const isGold = Math.random() > 0.3;
    spark.className = 'sparkle-dot';
    spark.style.left = Math.random() * 100 + '%';
    spark.style.bottom = '-10px';
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    spark.style.background = isGold 
      ? `radial-gradient(circle, rgba(255,215,80,1), rgba(255,200,60,0.4))` 
      : `radial-gradient(circle, rgba(255,255,255,1), rgba(255,255,255,0.3))`;
    spark.style.boxShadow = isGold 
      ? `0 0 ${size*2}px rgba(255,210,80,0.6)` 
      : `0 0 ${size*2}px rgba(255,255,255,0.5)`;
    const duration = Math.random() * 5 + 6;
    const sway = (Math.random() - 0.5) * 120;
    spark.style.setProperty('--float-sway', sway + 'px');
    spark.style.animationDuration = duration + 's';
    spark.style.animationDelay = '0s';
    particlesContainer.appendChild(spark);
    setTimeout(() => spark.remove(), duration * 1000);
  }
  
  // Spawn sparkles continuously
  const sparkleInterval = setInterval(() => {
    if (!document.getElementById('blessing-stage')) {
      clearInterval(sparkleInterval);
      return;
    }
    spawnSparkle();
  }, 300);
  
  // Initial burst of sparkles
  for (let i = 0; i < 25; i++) {
    setTimeout(() => spawnSparkle(), i * 80);
  }
  
  // --- Animation Phases ---
  
  // Phase 1 (0–5s): Sky brightens, Thatha rises from clouds, first text fades in
  // (All handled by CSS animations triggered on render)
  
  // Phase 2 (5s): Fade out line 1, show line 2
  setTimeout(() => {
    const line1 = document.getElementById('bl-line1');
    const line2 = document.getElementById('bl-line2');
    if (line1) line1.classList.add('bl-fade-out');
    
    setTimeout(() => {
      if (line1) line1.classList.add('hidden');
      if (line2) {
        line2.classList.remove('hidden');
        line2.classList.add('bl-fade-in');
      }
      
      // Phase 3 (8.5s): Show continue button
      setTimeout(() => {
        const btn = document.getElementById('bl-continue');
        if (btn) {
          btn.classList.remove('hidden');
          btn.classList.add('bl-fade-in');
        }
      }, 3000);
    }, 1500);
  }, 5000);
}

// 🎂 SCREEN 5: CAKE
function renderCakeScreen() {
  // Global reference for sequence
  window.cakeState = 0; 
  return `
    <div id="cake-stage" class="screen flex-center fade-in" style="background: #000; transition: background 1.5s ease; position: relative; overflow: hidden; padding: 0;">
      
      <!-- Sequence UI Elements -->
      <div id="light-bulbs" class="hidden">
        <div class="bulb yellow"></div>
        <div class="bulb red"></div>
        <div class="bulb blue"></div>
        <div class="bulb green"></div>
        <div class="bulb pink"></div>
        <div class="bulb orange"></div>
      </div>
      
      <div id="bday-banner" class="hidden">
        <div class="premium-poster">
           <h2 class="poster-title">Happy Birthday</h2>
           <p class="poster-subtitle">My Love ❤️</p>
        </div>
      </div>

      <div id="balloons-container" class="hidden"></div>
      
      <div id="cake-reveal-container" class="hidden slide-up-reveal">
        <div class="mega-cake-art" id="mega-cake" style="margin-top: 50px;">
          <!-- Knife -->
          <div id="cake-knife" class="hidden">🔪</div>

          <!-- Candles (Start Off) -->
          <div class="candles" id="candles" style="opacity: 0; transition: opacity 1s;">
            <div class="mega-flame custom-flame"></div>
            <div class="mega-flame custom-flame"></div>
            <div class="mega-flame custom-flame"></div>
          </div>
          
          <!-- Cake Body (Split) -->
          <div class="mega-cake-body split-container">
            <div class="cake-half left-half">
               <div class="cake-tier top half"></div>
               <div class="cake-tier bottom half"></div>
            </div>
            <div class="cake-half right-half">
               <div class="cake-tier top half right-clip"></div>
               <div class="cake-tier bottom half right-clip"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Interactive Button Container -->
      <div style="position: absolute; bottom: 40px; z-index: 100;">
        <button id="cakeSeqBtn" class="primary-btn luxury-btn pulse" style="background: #114282; border-radius: 8px; font-weight: bold; border: 1px solid #1c6ad1;" onclick="window.advanceCakeSequence()">TURN ON LIGHTS</button>
      </div>

    </div>
  `;
}

// 🎬 SCREEN 6: CINEMATIC VIDEO
function renderVideoScreen() {
  return `
    <div class="screen video-screen" id="video-stage">
      
      <!-- Cinematic vignette overlay -->
      <div class="video-vignette"></div>
      
      <!-- Subtle dark gradient overlay -->
      <div class="video-gradient-overlay"></div>
      
      <!-- Minimal floating particles -->
      <div id="video-particles"></div>
      
      <!-- Full-screen Video -->
      <video
        id="cinematic-video"
        class="cinematic-video"
        src="./video/apology.mp4"
        playsinline
        preload="auto"
      ></video>
      
    </div>
  `;
}

// Video screen animation + audio orchestration
function startVideoSequence() {
  const video = document.getElementById('cinematic-video');
  const bgMusic = document.getElementById('bgMusic');
  if (!video) return;
  
  // Pause background music entirely during video
  if (bgMusic) {
    bgMusic.pause();
  }
  
  // Spawn minimal particles
  const pc = document.getElementById('video-particles');
  if (pc) {
    const pInterval = setInterval(() => {
      if (!document.getElementById('video-stage')) { clearInterval(pInterval); return; }
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      p.className = 'vid-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-5px';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      const dur = Math.random() * 8 + 6;
      p.style.animationDuration = dur + 's';
      p.style.setProperty('--vid-sway', ((Math.random() - 0.5) * 60) + 'px');
      pc.appendChild(p);
      setTimeout(() => p.remove(), dur * 1000);
    }, 800);
  }
  
  // Play video with audio (user has already interacted with the page)
  video.muted = false;
  video.volume = 1;
  video.play().catch(() => {
    // Fallback: if browser blocks unmuted autoplay, try muted
    video.muted = true;
    video.play().catch(() => {});
  });
  
  // When video ends, fade out and go to apology
  video.addEventListener('ended', () => {
    const stage = document.getElementById('video-stage');
    if (stage) stage.classList.add('video-fade-out');
    
    // Resume bg music
    if (bgMusic) {
      bgMusic.volume = 0.05;
      bgMusic.play().catch(() => {});
    }
    
    setTimeout(() => {
      window.navigate('apology');
    }, 1500);
  });
}

// 💔 SCREEN 7: APOLOGY — Cinematic Emotional Scene
function renderApologyScreen() {
  return `
    <div class="screen apology-screen" id="apology-stage">
      
      <!-- Night sky that transitions to golden -->
      <div class="apo-sky-night" id="apo-sky-night"></div>
      <div class="apo-sky-golden" id="apo-sky-golden"></div>
      
      <!-- Slow-moving clouds -->
      <div class="apo-clouds apo-clouds-1"></div>
      <div class="apo-clouds apo-clouds-2"></div>
      
      <!-- Golden light rays -->
      <div class="apo-rays" id="apo-rays">
        <div class="apo-ray apo-r1"></div>
        <div class="apo-ray apo-r2"></div>
        <div class="apo-ray apo-r3"></div>
        <div class="apo-ray apo-r4"></div>
        <div class="apo-ray apo-r5"></div>
      </div>
      
      <!-- Floating particles -->
      <div id="apo-particles"></div>
      
      <!-- Vignette -->
      <div class="apo-vignette"></div>
      
      <!-- Text layers -->
      <div class="apo-text-wrapper">
        <h1 class="apo-t1" id="apo-t1">I'm Sorry ❤️</h1>
        <div class="apo-t2" id="apo-t2">
          <p>I may not have always been perfect…</p>
          <p>but every moment with you meant everything to me.</p>
        </div>
        <div class="apo-t2" id="apo-t4">
          <p>When you think or feel there is nobody for you…</p>
          <p>I promise I'll be there for you ❤️</p>
        </div>
        <div class="apo-t2" id="apo-t5">
          <p>Please understand me… I am changed thangoo 🥺</p>
          <p>This time, Tarunesh wants to give you</p>
          <p>the love & affection you lost from your childhood 💛</p>
        </div>
        <div class="apo-t2" id="apo-t6">
          <p>I promise I will not break you hereafter…</p>
          <p>Love you di, en thangameyy 🖤🫂</p>
        </div>
        <h2 class="apo-t3" id="apo-t3">Please forgive me 💔</h2>
      </div>
      
    </div>
  `;
}

// Apology screen — full orchestration
function startApologySequence() {
  const stage = document.getElementById('apology-stage');
  const bgMusic = document.getElementById('bgMusic');
  if (!stage) return;
  
  // Keep bg music very low
  if (bgMusic) bgMusic.volume = 0.05;
  
  // Spawn subtle particles
  const pc = document.getElementById('apo-particles');
  if (pc) {
    const pInterval = setInterval(() => {
      if (!document.getElementById('apology-stage')) { clearInterval(pInterval); return; }
      const p = document.createElement('div');
      const size = Math.random() * 4 + 1.5;
      p.className = 'apo-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.bottom = '-5px';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      const dur = Math.random() * 7 + 5;
      p.style.animationDuration = dur + 's';
      p.style.setProperty('--apo-sway', ((Math.random() - 0.5) * 80) + 'px');
      pc.appendChild(p);
      setTimeout(() => p.remove(), dur * 1000);
    }, 500);
  }
  
  // Phase 1 (0s): Night sky visible, fade in
  
  // Phase 2 (1.5s): "I'm Sorry" fades in
  setTimeout(() => {
    const t1 = document.getElementById('apo-t1');
    if (t1) t1.classList.add('apo-show');
  }, 1500);
  
  // Phase 3 (3.5s): Sky transitions to golden, rays appear
  setTimeout(() => {
    const golden = document.getElementById('apo-sky-golden');
    const rays = document.getElementById('apo-rays');
    if (golden) golden.classList.add('apo-golden-show');
    if (rays) rays.classList.add('apo-rays-show');
  }, 3500);
  
  // Phase 4 (4s): "I'm Sorry" fades out
  setTimeout(() => {
    const t1 = document.getElementById('apo-t1');
    if (t1) t1.classList.add('apo-hide');
  }, 4000);
  
  // Phase 5 (5s): "I may not have always been perfect..."
  setTimeout(() => {
    const t2 = document.getElementById('apo-t2');
    if (t2) t2.classList.add('apo-show');
  }, 5000);
  
  // Phase 6 (9s): Fade out t2, show t4 — "When you think nobody..."
  setTimeout(() => {
    const t2 = document.getElementById('apo-t2');
    if (t2) t2.classList.add('apo-hide');
  }, 9000);
  
  setTimeout(() => {
    const t4 = document.getElementById('apo-t4');
    if (t4) t4.classList.add('apo-show');
  }, 10500);
  
  // Phase 7 (14.5s): Fade out t4, show t5 — "I am changed thangoo..."
  setTimeout(() => {
    const t4 = document.getElementById('apo-t4');
    if (t4) t4.classList.add('apo-hide');
  }, 14500);
  
  setTimeout(() => {
    const t5 = document.getElementById('apo-t5');
    if (t5) t5.classList.add('apo-show');
  }, 16000);
  
  // Phase 8 (20s): Fade out t5, show t6 — "I promise I will not break you..."
  setTimeout(() => {
    const t5 = document.getElementById('apo-t5');
    if (t5) t5.classList.add('apo-hide');
  }, 20000);
  
  setTimeout(() => {
    const t6 = document.getElementById('apo-t6');
    if (t6) t6.classList.add('apo-show');
  }, 21500);
  
  // Phase 9 (25.5s): Fade out t6, show "Please forgive me"
  setTimeout(() => {
    const t6 = document.getElementById('apo-t6');
    if (t6) t6.classList.add('apo-hide');
  }, 25500);
  
  setTimeout(() => {
    const t3 = document.getElementById('apo-t3');
    if (t3) t3.classList.add('apo-show');
    // Gradually increase bg music warmth
    if (bgMusic) {
      let vol = 0.05;
      const volUp = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.2) { vol = 0.2; clearInterval(volUp); }
        bgMusic.volume = vol;
      }, 200);
    }
  }, 27000);
  
  // Phase 10 (31s): Auto-advance to ending
  setTimeout(() => {
    const s = document.getElementById('apology-stage');
    if (s) s.classList.add('apo-fade-out');
    
    setTimeout(() => {
      window.navigate('ending');
    }, 2000);
  }, 31000);
}

// 🎉 SCREEN 8: ENDING
function renderEndingScreen() {
  return `
    <div class="screen black-fade flex-center">
      <div id="confetti-canvas"></div>
      <div class="ending-text-container">
        <h1 class="glow-text-white slide-up-reveal">Once again… Happy Birthday My Love ❤️</h1>
        <h2 class="glow-text-pink slide-up-reveal delay-1">Forever yours.</h2>
      </div>
    </div>
  `;
}
// Audio handled securely in index.html now

// --- Logic Helpers ---

window.navigate = (screenName) => {
  appState.currentScreen = screenName;
  
  if(screenName === 'intro') {
     const audio = document.getElementById('bgMusic');
     if(audio) {
       audio.volume = 0.2;
       audio.play().catch(e => console.log("Audio play prevented"));
     }
  }
  
  if (screenName === 'bmw' || screenName === 'collage' || screenName === 'blessing' || screenName === 'video' || screenName === 'apology' || screenName === 'ending') {
    // hide hearts for the cinematic dark themes
    const heartsContainer = document.getElementById('hearts-container');
    if (heartsContainer) heartsContainer.style.display = 'none';
  } else {
    const heartsContainer = document.getElementById('hearts-container');
    if (heartsContainer) heartsContainer.style.display = 'block';
  }
  
  renderApp();
};

window.handleKeypress = (num) => {
  if (appState.currentInput.length < 4) {
    appState.currentInput += num;
    updateDisplay();
    if (appState.currentInput.length === 4) setTimeout(checkCode, 200);
  }
};

window.clearInput = () => {
  appState.currentInput = '';
  updateDisplay();
};

window.deleteInput = () => {
  appState.currentInput = appState.currentInput.slice(0, -1);
  updateDisplay();
};

function updateDisplay() {
  const display = document.getElementById('keypadDisplay');
  if(!display) return;
  display.innerText = appState.currentInput.padEnd(4, '○').replace(/[0-9]/g, '●');
  document.getElementById('errorMsg').classList.remove('visible');
}

function checkCode() {
  if (appState.currentInput === PASSCODE) {
    playSparkles();
    setTimeout(() => window.navigate('intro'), 1200);
  } else {
    const card = document.querySelector('.lock-card');
    card.classList.add('shake');
    document.getElementById('errorMsg').classList.add('visible');
    setTimeout(() => {
      card.classList.remove('shake');
      appState.currentInput = '';
      updateDisplay();
    }, 500);
  }
}

function playSparkles() {
  const container = document.getElementById('sparkles-container');
  if(!container) return;
  document.querySelector('.lock-card').style.opacity = '0.3';
  for(let i=0; i<30; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle-star';
    s.innerHTML = '✨';
    s.style.left = 50 + Math.random()*20 - 10 + '%';
    s.style.top = 50 + Math.random()*20 - 10 + '%';
    const tx = (Math.random()-0.5)*300;
    const ty = (Math.random()-0.5)*300;
    s.style.setProperty('--tx', tx+'px');
    s.style.setProperty('--ty', ty+'px');
    container.appendChild(s);
  }
}

// Gift Logic
window.openGift = (id) => {
  appState.giftsOpened[id] = true;
  const modalContent = document.getElementById('modalContent');
  const modal = document.getElementById('giftModal');
  
  modalContent.innerHTML = getGiftHTML(id);
  modal.classList.remove('hidden');
  modal.classList.add('fade-in');
};

window.closeModal = () => {
  const modal = document.getElementById('giftModal');
  modal.classList.add('hidden');
  modal.classList.remove('fade-in');
  renderApp(); 
};

window.openLightbox = (src) => {
  const overlay = document.getElementById('lightboxOverlay');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  overlay.classList.remove('hidden');
  overlay.classList.add('fade-in');
};

window.closeLightbox = () => {
  const overlay = document.getElementById('lightboxOverlay');
  overlay.classList.add('hidden');
  overlay.classList.remove('fade-in');
};

window.triggerTyping = () => {
  document.getElementById('envelope').classList.add('opened');
  if (!appState.letterTyped) {
    appState.letterTyped = true;
    const dest = document.getElementById('typed-text');
    let i = 0;
    const speed = 40; 
    
    // Convert newlines to breaks
    const htmlText = letterText.replace(/\ng/g, '<br>'); // oops, wait, need a proper replacer in loop
    
    function typeWriter() {
      if (i < letterText.length) {
        if (letterText.charAt(i) === '\\n') {
          dest.innerHTML += '<br>';
        } else {
          dest.innerHTML += letterText.charAt(i) === '\\n' ? '<br>' : letterText.charAt(i); // better safe logic below 
        }
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    setTimeout(() => {
      // proper recursive typer
      dest.innerHTML = '';
      let index = 0;
      function nextChar() {
        if(index < letterText.length) {
          let char = letterText[index];
          if(char === '\\n') dest.innerHTML += '<br>';
          else dest.innerHTML += char;
          index++;
          // auto scroll down
          const paper = document.querySelector('.letter-paper');
          if(paper) paper.scrollTop = paper.scrollHeight;
          setTimeout(nextChar, speed);
        }
      }
      nextChar();
    }, 800);
  }
}


function getGiftHTML(id) {
  switch(id) {
    case 1:
      return `
        <div class="gift-details scrapbook-theme">
          <h2>Our Memories… 🥺❤️</h2>
          <p class="subtitle gold-accent text-glow">Every moment with you is my favorite story</p>
          
          <div class="scrapbook-gallery">
            <div class="polaroid-item tilt-left delay-0" onclick="window.openLightbox('./images/pic%201.jpg')">
              <div class="tape"></div>
              <img src="./images/pic%201.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">💕</p>
              <div class="sparkle-little">✨</div>
            </div>
            
            <div class="polaroid-item tilt-right delay-1" onclick="window.openLightbox('./images/pic%202.jpg')">
              <div class="tape tape-alt"></div>
              <img src="./images/pic%202.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">🫶</p>
            </div>
            
            <div class="polaroid-item tilt-left delay-2" onclick="window.openLightbox('./images/pic%203.jpg')">
              <div class="tape"></div>
              <img src="./images/pic%203.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">You & me ❤️</p>
            </div>
            
            <div class="polaroid-item tilt-straight delay-3" onclick="window.openLightbox('./images/pic%204.jpg')">
              <div class="tape tape-alt"></div>
              <img src="./images/pic%204.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">Smiles ✨</p>
              <div class="sparkle-little">✨</div>
            </div>
            
            <div class="polaroid-item tilt-right delay-4" onclick="window.openLightbox('./images/pic%205.jpg')">
              <div class="tape"></div>
              <img src="./images/pic%205.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">Forever 🥺</p>
            </div>
            
            <div class="polaroid-item tilt-left delay-5" onclick="window.openLightbox('./images/pic%206.jpg')">
              <div class="tape tape-alt"></div>
              <img src="./images/pic%206.jpg" alt="Memory" loading="lazy"/>
              <p class="polaroid-caption">My love ❤️</p>
            </div>
          </div>
          
          <div class="scrapbook-footer">
            <p>From random moments…<br>to memories I never want to lose ❤️</p>
          </div>
        </div>
      `;
    case 2:
      return `
        <div class="gift-details">
          <h2>Our daily routine ❤️</h2>
          <p class="subtitle gold-accent">Fight… laughs... together... repeat</p>
          <div class="chaos-container">
            <div class="bouncing-emoji e1">🤬</div>
            <div class="bouncing-emoji e2">🥰</div>
            <div class="bouncing-emoji e3">🤡</div>
            <img src="./images/pic%207.jpg" alt="Chaos" class="shake-hover" />
          </div>
        </div>
      `;
    case 3:
      return `
        <div class="gift-details">
          <div class="soft-emotional-container">
            <img src="./images/pic%201.jpg" alt="Childhood" class="her-glow-img" />
            <h2 class="emotional-serif">"From this little girl… 🥺"</h2>
            <div class="spacer-line"></div>
            <img src="./images/pic%203.jpg" alt="Her" class="her-glow-img portrait-styled" />
            <h2 class="emotional-serif gold-accent">"To the most beautiful soul I know ❤️"</h2>
          </div>
        </div>
      `;
    case 4:
      return `
        <div class="gift-details letter-view">
          <div class="envelope" id="envelope" onclick="window.triggerTyping()">
            <div class="envelope-flap"></div>
            <div class="envelope-body">Tap to open 💌</div>
            <div class="letter-paper">
              <div id="typed-text"></div>
            </div>
          </div>
        </div>
      `;
  }
}

// Cake Sequence Logic
window.advanceCakeSequence = () => {
  const btn = document.getElementById('cakeSeqBtn');
  const stage = document.getElementById('cake-stage');
  window.cakeState++;

  if (window.cakeState === 1) { // Lights On
    stage.style.background = '#2c1e16'; // dark brown warm background
    document.getElementById('light-bulbs').classList.remove('hidden');
    document.getElementById('light-bulbs').classList.add('drop-down');
    btn.innerText = "DECORATE CAKE";

  } else if (window.cakeState === 2) { // Banner Drop
    document.getElementById('bday-banner').classList.remove('hidden');
    document.getElementById('bday-banner').classList.add('swing-in');
    btn.innerText = "FLY WITH BALLOONS";

  } else if (window.cakeState === 3) { // Balloons & Cake Reveal
    const bc = document.getElementById('balloons-container');
    bc.innerHTML = '';
    const colors = ['#ff4d6d', '#d4af37', '#74b9ff', '#55efc4', '#a29bfe'];
    for(let i=0; i<15; i++) {
       let b = document.createElement('div');
       b.className = 'balloon';
       b.style.background = colors[Math.floor(Math.random()*colors.length)];
       b.style.left = Math.random() * 90 + '%';
       b.style.animationDelay = (Math.random() * 2) + 's';
       bc.appendChild(b);
    }
    bc.classList.remove('hidden');
    
    document.getElementById('cake-reveal-container').classList.remove('hidden');
    btn.innerText = "LIGHT CANDLE";

  } else if (window.cakeState === 4) { // Light Candle
    document.getElementById('candles').style.opacity = '1';
    btn.innerText = "BLOW CANDLES 💨";

  } else if (window.cakeState === 5) { // Blow Candle
    document.getElementById('candles').style.opacity = '0';
    btn.innerText = "CUT CAKE";

  } else if (window.cakeState === 6) { // Cut Cake
    const knife = document.getElementById('cake-knife');
    knife.classList.remove('hidden');
    knife.classList.add('cut-down');

    // Make Cake Halves Separate after 0.5s stroke
    setTimeout(() => {
      document.querySelector('.left-half').classList.add('split-left-anim');
      document.querySelector('.right-half').classList.add('split-right-anim');
      
      // Play Audio
      let sliceAudio = new Audio('https://www.soundjay.com/misc/sounds/slicing-1.mp3');
      sliceAudio.play().catch(()=>{});
      let cheerAudio = new Audio('https://www.soundjay.com/human/sounds/applause-01.mp3');
      setTimeout(()=> { cheerAudio.volume = 0.5; cheerAudio.play().catch(()=>{}); }, 300);

    }, 500);

    btn.innerText = "Finish ❤️";
    btn.style.background = "var(--primary-color)";
    btn.style.border = "none";
  } else if (window.cakeState > 6) {
     window.navigate('bmw');
  }
};

// Audio Logic //
let isPlaying = false;
window.toggleMusic = () => {
  const bgMusic = document.getElementById('bgMusic');
  if(!bgMusic) return;
  if (isPlaying) {
    bgMusic.pause();
    document.getElementById('musicBtn').innerText = '🔇';
  } else {
    bgMusic.play().catch(()=>{});
    document.getElementById('musicBtn').innerText = '🎵';
  }
  isPlaying = !isPlaying;
};

// Background Effects
function startFloatingHearts() {
  const container = document.getElementById('hearts-container');
  if(!container) return;
  const symbols = ['❤️', '✨', '💖', '💫'];
  setInterval(() => {
    if(appState.currentScreen === 'bmw' || appState.currentScreen === 'ending') return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }, 800);
}

function startConfetti() {
  const container = document.getElementById('confetti-canvas');
  if(!container) return;
  const colors = ['#fbd1d9', '#ff4d6d', '#ffd700', '#ffffff'];
  setInterval(() => {
    const paper = document.createElement('div');
    paper.className = 'confetti-piece';
    paper.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    paper.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 3 + 2;
    paper.style.animation = `confettiFall ${duration}s linear forwards`;
    container.appendChild(paper);
    setTimeout(()=> paper.remove(), duration * 1000);
  }, 50);
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  startFloatingHearts();
});

// Start music automatically on first user click anywhere
document.addEventListener('click', function initAudio() {
  const bgMusic = document.getElementById('bgMusic');
  if(bgMusic && bgMusic.paused) {
    bgMusic.volume = 0.2;
    bgMusic.play().catch(()=>{});
    isPlaying = true;
  }
  document.removeEventListener('click', initAudio);
}, { once: true });

