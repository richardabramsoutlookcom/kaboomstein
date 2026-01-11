// Kaboomstein! - A Jewish twist on the classic Kaboom game

class AudioManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.musicOscillators = [];
        this.musicGain = null;
        this.isPlayingMusic = false;
    }

    init() {
        if (this.audioContext) return;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.musicGain = this.audioContext.createGain();
        this.musicGain.gain.value = 0.15;
        this.musicGain.connect(this.audioContext.destination);
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            this.stopMusic();
        } else if (game.isRunning) {
            this.startMusic();
        }
        return this.enabled;
    }

    // Play a catch sound - cheerful ascending tone
    playCatch() {
        if (!this.enabled || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, this.audioContext.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.15);
    }

    // Play bonus catch sound - triumphant!
    playBonus() {
        if (!this.enabled || !this.audioContext) return;
        const notes = [523, 659, 784, 1047]; // C, E, G, C (major chord arpeggio)
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.08 + 0.2);
            osc.start(this.audioContext.currentTime + i * 0.08);
            osc.stop(this.audioContext.currentTime + i * 0.08 + 0.25);
        });
    }

    // Play miss sound - sad descending tone
    playMiss() {
        if (!this.enabled || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        osc.connect(gain);
        gain.connect(this.audioContext.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.4);
        gain.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
        osc.start();
        osc.stop(this.audioContext.currentTime + 0.4);
    }

    // Play game over sound - dramatic!
    playGameOver() {
        if (!this.enabled || !this.audioContext) return;
        const notes = [392, 370, 349, 330, 294, 262]; // Descending scale
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.type = 'sawtooth';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.15);
            gain.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + i * 0.15 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.15 + 0.3);
            osc.start(this.audioContext.currentTime + i * 0.15);
            osc.stop(this.audioContext.currentTime + i * 0.15 + 0.35);
        });
    }

    // Play level up sound
    playLevelUp() {
        if (!this.enabled || !this.audioContext) return;
        const notes = [262, 330, 392, 523, 659, 784]; // Ascending C major scale
        notes.forEach((freq, i) => {
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0, this.audioContext.currentTime + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.25, this.audioContext.currentTime + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + i * 0.08 + 0.15);
            osc.start(this.audioContext.currentTime + i * 0.08);
            osc.stop(this.audioContext.currentTime + i * 0.08 + 0.2);
        });
    }

    // Klezmer-inspired background music using Web Audio API
    startMusic() {
        if (!this.enabled || !this.audioContext || this.isPlayingMusic) return;
        this.isPlayingMusic = true;
        this.playKlezmerLoop();
    }

    playKlezmerLoop() {
        if (!this.enabled || !this.isPlayingMusic) return;

        // Freygish/Ahava Raba mode - characteristic klezmer scale
        // D, Eb, F#, G, A, Bb, C, D
        const klezmerNotes = [
            { freq: 293.66, dur: 0.25 }, // D
            { freq: 311.13, dur: 0.15 }, // Eb
            { freq: 369.99, dur: 0.25 }, // F#
            { freq: 392.00, dur: 0.35 }, // G
            { freq: 369.99, dur: 0.15 }, // F#
            { freq: 311.13, dur: 0.15 }, // Eb
            { freq: 293.66, dur: 0.30 }, // D
            { freq: 349.23, dur: 0.20 }, // F
            { freq: 392.00, dur: 0.25 }, // G
            { freq: 440.00, dur: 0.35 }, // A
            { freq: 466.16, dur: 0.15 }, // Bb
            { freq: 440.00, dur: 0.20 }, // A
            { freq: 392.00, dur: 0.25 }, // G
            { freq: 369.99, dur: 0.30 }, // F#
            { freq: 293.66, dur: 0.40 }, // D
            { freq: 0, dur: 0.20 },      // Rest
        ];

        let time = this.audioContext.currentTime;
        klezmerNotes.forEach(note => {
            if (note.freq > 0) {
                // Main melody
                const osc = this.audioContext.createOscillator();
                const gain = this.audioContext.createGain();
                osc.connect(gain);
                gain.connect(this.musicGain);
                osc.type = 'triangle';
                osc.frequency.value = note.freq;

                // Add slight vibrato for klezmer feel
                const vibrato = this.audioContext.createOscillator();
                const vibratoGain = this.audioContext.createGain();
                vibrato.connect(vibratoGain);
                vibratoGain.connect(osc.frequency);
                vibrato.frequency.value = 5;
                vibratoGain.gain.value = 3;

                gain.gain.setValueAtTime(0.01, time);
                gain.gain.linearRampToValueAtTime(0.5, time + 0.02);
                gain.gain.setValueAtTime(0.4, time + note.dur - 0.05);
                gain.gain.linearRampToValueAtTime(0.01, time + note.dur);

                osc.start(time);
                osc.stop(time + note.dur);
                vibrato.start(time);
                vibrato.stop(time + note.dur);

                // Bass note (root or fifth)
                const bass = this.audioContext.createOscillator();
                const bassGain = this.audioContext.createGain();
                bass.connect(bassGain);
                bassGain.connect(this.musicGain);
                bass.type = 'sine';
                bass.frequency.value = note.freq / 2;
                bassGain.gain.setValueAtTime(0.2, time);
                bassGain.gain.setValueAtTime(0.15, time + note.dur - 0.02);
                bassGain.gain.linearRampToValueAtTime(0.01, time + note.dur);
                bass.start(time);
                bass.stop(time + note.dur);
            }
            time += note.dur;
        });

        // Loop the music
        const totalDuration = klezmerNotes.reduce((sum, n) => sum + n.dur, 0) * 1000;
        this.musicTimeout = setTimeout(() => {
            if (this.isPlayingMusic) {
                this.playKlezmerLoop();
            }
        }, totalDuration - 50);
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
        }
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.audio = new AudioManager();

        // Base game dimensions
        this.baseWidth = 800;
        this.baseHeight = 600;
        this.scale = 1;

        this.isRunning = false;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.yamulkaCaught = 0;
        this.highScore = Number(localStorage.getItem('kaboomsteinHighScore')) || 0;

        // Initialize canvas size
        this.resizeCanvas();

        // Rabbi properties
        this.rabbi = {
            x: this.canvas.width / 2,
            y: 60,
            width: 80,
            height: 100,
            speed: 2,
            direction: 1
        };

        // Unicycle man properties
        this.player = {
            x: this.canvas.width / 2,
            y: this.canvas.height - 100,
            width: 100,
            height: 120,
            speed: 8,
            yamulkaStack: 0
        };

        // Falling items
        this.fallingItems = [];
        this.dropTimer = 0;
        this.dropInterval = 60; // frames between drops

        // Input
        this.keys = {};

        // Bonus popup animations
        this.popups = [];

        // Mobile controls
        this.isMobile = this.detectMobile();
        this.mobileControlType = null;
        this.accelerometerData = { x: 0, y: 0, z: 0 };
        this.calibrationOffset = 0;
        this.touchControls = { left: false, right: false };

        this.setupEventListeners();
        this.initMobileControls();
    }

    resizeCanvas() {
        const container = document.getElementById('gameContainer');
        const maxWidth = Math.min(this.baseWidth, window.innerWidth - 20);
        const maxHeight = window.innerHeight * (this.isMobile ? 0.6 : 0.8);

        // Calculate scale to maintain aspect ratio
        const scaleX = maxWidth / this.baseWidth;
        const scaleY = maxHeight / this.baseHeight;
        this.scale = Math.min(scaleX, scaleY, 1);

        // Set canvas internal resolution
        this.canvas.width = this.baseWidth;
        this.canvas.height = this.baseHeight;

        // Set display size via CSS
        const displayWidth = Math.floor(this.baseWidth * this.scale);
        const displayHeight = Math.floor(this.baseHeight * this.scale);
        container.style.width = displayWidth + 'px';
        container.style.height = displayHeight + 'px';
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               (window.innerWidth <= 800 && 'ontouchstart' in window);
    }

    initMobileControls() {
        if (this.isMobile) {
            // Show mobile control selection on startup
            document.getElementById('mobileControlSelect').style.display = 'flex';
            document.getElementById('startScreen').style.display = 'none';
        }
    }

    selectMobileControl(type) {
        this.mobileControlType = type;
        document.getElementById('mobileControlSelect').style.display = 'none';
        document.getElementById('startScreen').style.display = 'flex';

        // Update control text
        const controlsText = document.getElementById('controlsText');
        if (type === 'accelerometer') {
            controlsText.textContent = '📱 Tilt your phone left/right to move • Tap to start';
            this.setupAccelerometer();
        } else if (type === 'buttons') {
            controlsText.textContent = '⬅️ ➡️ Tap buttons to move • Tap Play to start';
            document.getElementById('mobileControls').style.display = 'flex';
            this.setupTouchButtons();
        } else {
            controlsText.textContent = '← → Arrow Keys or A/D to move • Space/Enter to start';
        }
    }

    setupAccelerometer() {
        if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
            // iOS 13+ requires permission
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', (e) => this.handleOrientation(e), true);
                    } else {
                        alert('Accelerometer permission denied. Using button controls instead.');
                        this.selectMobileControl('buttons');
                    }
                })
                .catch(() => {
                    alert('Accelerometer not available. Using button controls instead.');
                    this.selectMobileControl('buttons');
                });
        } else {
            // Android and older iOS versions
            window.addEventListener('deviceorientation', (e) => this.handleOrientation(e), true);
        }

        // Calibrate on first tap
        let calibrated = false;
        const calibrate = () => {
            if (!calibrated) {
                this.calibrationOffset = this.accelerometerData.x;
                calibrated = true;
                document.removeEventListener('touchstart', calibrate);
            }
        };
        document.addEventListener('touchstart', calibrate);
    }

    handleOrientation(event) {
        // Beta is front-to-back tilt (-180 to 180)
        // Gamma is left-to-right tilt (-90 to 90)
        this.accelerometerData = {
            x: event.gamma || 0,  // left-to-right tilt
            y: event.beta || 0,   // front-to-back tilt
            z: event.alpha || 0   // compass direction
        };
    }

    setupTouchButtons() {
        const leftBtn = document.getElementById('leftBtn');
        const rightBtn = document.getElementById('rightBtn');

        // Prevent default touch behavior
        const preventDefaults = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        // Left button
        leftBtn.addEventListener('touchstart', (e) => {
            preventDefaults(e);
            this.touchControls.left = true;
        }, { passive: false });

        leftBtn.addEventListener('touchend', (e) => {
            preventDefaults(e);
            this.touchControls.left = false;
        }, { passive: false });

        leftBtn.addEventListener('touchcancel', (e) => {
            preventDefaults(e);
            this.touchControls.left = false;
        }, { passive: false });

        // Right button
        rightBtn.addEventListener('touchstart', (e) => {
            preventDefaults(e);
            this.touchControls.right = true;
        }, { passive: false });

        rightBtn.addEventListener('touchend', (e) => {
            preventDefaults(e);
            this.touchControls.right = false;
        }, { passive: false });

        rightBtn.addEventListener('touchcancel', (e) => {
            preventDefaults(e);
            this.touchControls.right = false;
        }, { passive: false });

        // Also support mouse for testing
        leftBtn.addEventListener('mousedown', () => this.touchControls.left = true);
        leftBtn.addEventListener('mouseup', () => this.touchControls.left = false);
        leftBtn.addEventListener('mouseleave', () => this.touchControls.left = false);

        rightBtn.addEventListener('mousedown', () => this.touchControls.right = true);
        rightBtn.addEventListener('mouseup', () => this.touchControls.right = false);
        rightBtn.addEventListener('mouseleave', () => this.touchControls.right = false);
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (['ArrowLeft', 'ArrowRight', 'a', 'd', 'A', 'D'].includes(e.key)) {
                e.preventDefault();
            }
            if (!this.isRunning && (e.key === ' ' || e.key === 'Enter')) {
                e.preventDefault();
                this.start();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Touch to start for mobile
        if (this.isMobile) {
            document.getElementById('startScreen').addEventListener('touchstart', (e) => {
                if (e.target.classList.contains('start-btn') || !this.isRunning) {
                    // Allow normal button behavior
                }
            });
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.resizeCanvas();
            }, 100);
        });

        document.getElementById('soundToggle').addEventListener('click', () => {
            const enabled = this.audio.toggle();
            document.getElementById('soundToggle').textContent = enabled ? '🔊 Sound ON' : '🔇 Sound OFF';
        });
    }

    start() {
        this.audio.init();

        this.isRunning = true;
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.yamulkaCaught = 0;
        this.player.yamulkaStack = 0;
        this.fallingItems = [];
        this.popups = [];
        this.dropTimer = 0;
        this.dropInterval = 60;
        this.rabbi.speed = 2;
        this.rabbi.x = this.canvas.width / 2;
        this.player.x = this.canvas.width / 2;

        this.updateUI();
        this.updateLives();

        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'none';

        this.audio.startMusic();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isRunning) return;

        this.update();
        this.draw();

        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Move player based on control type
        let movement = 0;

        // Keyboard controls
        if (this.keys['ArrowLeft'] || this.keys['a'] || this.keys['A']) {
            movement -= this.player.speed;
        }
        if (this.keys['ArrowRight'] || this.keys['d'] || this.keys['D']) {
            movement += this.player.speed;
        }

        // Touch button controls
        if (this.mobileControlType === 'buttons') {
            if (this.touchControls.left) {
                movement -= this.player.speed;
            }
            if (this.touchControls.right) {
                movement += this.player.speed;
            }
        }

        // Accelerometer controls
        if (this.mobileControlType === 'accelerometer') {
            const tilt = this.accelerometerData.x - this.calibrationOffset;
            // Map tilt angle to movement speed
            // Typical tilt range is -30 to 30 degrees for comfortable play
            const sensitivity = 0.4;
            movement = tilt * sensitivity;
            // Clamp movement to reasonable speed
            movement = Math.max(-this.player.speed, Math.min(this.player.speed, movement));
        }

        this.player.x += movement;

        // Keep player in bounds
        this.player.x = Math.max(this.player.width / 2, Math.min(this.canvas.width - this.player.width / 2, this.player.x));

        // Move rabbi
        this.rabbi.x += this.rabbi.speed * this.rabbi.direction;
        if (this.rabbi.x > this.canvas.width - 60) {
            this.rabbi.direction = -1;
        } else if (this.rabbi.x < 60) {
            this.rabbi.direction = 1;
        }

        // Drop items
        this.dropTimer++;
        if (this.dropTimer >= this.dropInterval) {
            this.dropTimer = 0;
            this.dropItem();
        }

        // Update falling items
        for (let i = this.fallingItems.length - 1; i >= 0; i--) {
            const item = this.fallingItems[i];
            item.y += item.speed;
            item.rotation += item.rotationSpeed;

            // Check for catch
            const catchY = this.player.y - 40 - (this.player.yamulkaStack * 8);
            const catchWidth = 60 + (this.player.yamulkaStack * 2);

            if (item.y >= catchY - 10 && item.y <= catchY + 20) {
                if (Math.abs(item.x - this.player.x) < catchWidth / 2 + item.width / 2) {
                    // Caught!
                    this.catchItem(item);
                    this.fallingItems.splice(i, 1);
                    continue;
                }
            }

            // Check for miss
            if (item.y > this.canvas.height) {
                if (item.type === 'yamulka') {
                    this.missYamulka();
                }
                this.fallingItems.splice(i, 1);
            }
        }

        // Update popups
        for (let i = this.popups.length - 1; i >= 0; i--) {
            this.popups[i].life--;
            this.popups[i].y -= 1;
            if (this.popups[i].life <= 0) {
                this.popups.splice(i, 1);
            }
        }

        // Level up check
        if (this.yamulkaCaught > 0 && this.yamulkaCaught % 15 === 0 && this.dropInterval > 20) {
            this.levelUp();
        }
    }

    dropItem() {
        // 80% yamulka, 10% bagel, 10% mezuzah
        const rand = Math.random();
        let type, width, height, points, color;

        if (rand < 0.80) {
            type = 'yamulka';
            width = 35;
            height = 15;
            points = 10;
            color = '#1a1a1a';
        } else if (rand < 0.90) {
            type = 'bagel';
            width = 30;
            height = 30;
            points = 50;
            color = '#d4a574';
        } else {
            type = 'mezuzah';
            width = 15;
            height = 40;
            points = 100;
            color = '#ffd700';
        }

        this.fallingItems.push({
            type,
            x: this.rabbi.x,
            y: this.rabbi.y + 40,
            width,
            height,
            speed: 3 + (this.level * 0.5),
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.1,
            points,
            color
        });
    }

    catchItem(item) {
        this.score += item.points;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('kaboomsteinHighScore', String(this.highScore));
        }

        if (item.type === 'yamulka') {
            this.yamulkaCaught++;
            this.player.yamulkaStack++;
            this.audio.playCatch();
        } else {
            this.audio.playBonus();
            this.popups.push({
                x: item.x,
                y: item.y,
                text: `+${item.points}!`,
                life: 60
            });
        }

        this.updateUI();
    }

    missYamulka() {
        this.lives--;
        this.player.yamulkaStack = Math.max(0, this.player.yamulkaStack - 5);
        this.audio.playMiss();
        this.updateLives();

        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    levelUp() {
        this.level++;
        this.dropInterval = Math.max(20, this.dropInterval - 5);
        this.rabbi.speed += 0.5;
        this.yamulkaCaught = 1; // Reset counter to avoid multiple level ups
        this.audio.playLevelUp();

        this.popups.push({
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            text: `Level ${this.level}!`,
            life: 90
        });

        this.updateUI();
    }

    gameOver() {
        this.isRunning = false;
        this.audio.stopMusic();
        this.audio.playGameOver();
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('gameOverScreen').style.display = 'flex';
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('highScore').textContent = this.highScore;
        document.getElementById('level').textContent = this.level;
        document.getElementById('yamulkaCount').textContent = this.player.yamulkaStack;
    }

    updateLives() {
        const livesDiv = document.getElementById('lives');
        livesDiv.innerHTML = '';
        for (let i = 0; i < this.lives; i++) {
            const life = document.createElement('span');
            life.className = 'life';
            life.textContent = '🕎';
            livesDiv.appendChild(life);
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F0FF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw ground
        this.ctx.fillStyle = '#8B7355';
        this.ctx.fillRect(0, this.canvas.height - 30, this.canvas.width, 30);

        // Draw cobblestone pattern
        this.ctx.fillStyle = '#6B5344';
        for (let x = 0; x < this.canvas.width; x += 40) {
            for (let row = 0; row < 2; row++) {
                const offset = row % 2 === 0 ? 0 : 20;
                this.ctx.beginPath();
                this.ctx.roundRect(x + offset, this.canvas.height - 28 + row * 14, 38, 12, 3);
                this.ctx.stroke();
            }
        }

        // Draw rabbi
        this.drawRabbi();

        // Draw falling items
        this.fallingItems.forEach(item => this.drawItem(item));

        // Draw player (unicycle man)
        this.drawPlayer();

        // Draw popups
        this.ctx.font = 'bold 24px Georgia';
        this.ctx.textAlign = 'center';
        this.popups.forEach(popup => {
            this.ctx.fillStyle = `rgba(255, 215, 0, ${popup.life / 60})`;
            this.ctx.fillText(popup.text, popup.x, popup.y);
        });
    }

    drawRabbi() {
        const x = this.rabbi.x;
        const y = this.rabbi.y;

        this.ctx.save();

        // Body (black coat)
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 30, 25, 35, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // White shirt visible
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 10, 10, 15, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Head
        this.ctx.fillStyle = '#E8C39E';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 15, 18, 20, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Beard
        this.ctx.fillStyle = '#4a4a4a';
        this.ctx.beginPath();
        this.ctx.moveTo(x - 12, y - 5);
        this.ctx.quadraticCurveTo(x - 15, y + 25, x, y + 30);
        this.ctx.quadraticCurveTo(x + 15, y + 25, x + 12, y - 5);
        this.ctx.fill();

        // Hat (black fedora with wide brim)
        this.ctx.fillStyle = '#1a1a1a';
        // Hat brim
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 30, 28, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        // Hat crown
        this.ctx.fillRect(x - 15, y - 55, 30, 25);
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 55, 15, 5, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(x - 6, y - 18, 3, 0, Math.PI * 2);
        this.ctx.arc(x + 6, y - 18, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Payos (sidelocks)
        this.ctx.strokeStyle = '#4a4a4a';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(x - 16, y - 25);
        this.ctx.bezierCurveTo(x - 22, y - 10, x - 18, y + 5, x - 20, y + 15);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x + 16, y - 25);
        this.ctx.bezierCurveTo(x + 22, y - 10, x + 18, y + 5, x + 20, y + 15);
        this.ctx.stroke();

        // Arms dropping yamulkas
        this.ctx.fillStyle = '#1a1a1a';
        const armWave = Math.sin(Date.now() / 200) * 5;
        // Left arm
        this.ctx.beginPath();
        this.ctx.moveTo(x - 25, y + 10);
        this.ctx.quadraticCurveTo(x - 35, y + 30 + armWave, x - 30, y + 45);
        this.ctx.lineWidth = 8;
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.stroke();
        // Right arm
        this.ctx.beginPath();
        this.ctx.moveTo(x + 25, y + 10);
        this.ctx.quadraticCurveTo(x + 35, y + 30 - armWave, x + 30, y + 45);
        this.ctx.stroke();

        // Hands
        this.ctx.fillStyle = '#E8C39E';
        this.ctx.beginPath();
        this.ctx.arc(x - 30, y + 45, 6, 0, Math.PI * 2);
        this.ctx.arc(x + 30, y + 45, 6, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.restore();
    }

    drawPlayer() {
        const x = this.player.x;
        const y = this.player.y;

        this.ctx.save();

        // Unicycle wheel
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.arc(x, y + 35, 25, 0, Math.PI * 2);
        this.ctx.stroke();

        // Wheel spokes
        const spokeAngle = (Date.now() / 100) % (Math.PI * 2);
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = spokeAngle + (i * Math.PI / 4);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + 35);
            this.ctx.lineTo(x + Math.cos(angle) * 23, y + 35 + Math.sin(angle) * 23);
            this.ctx.stroke();
        }

        // Wheel center
        this.ctx.fillStyle = '#666';
        this.ctx.beginPath();
        this.ctx.arc(x, y + 35, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // Seat post
        this.ctx.strokeStyle = '#555';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + 35);
        this.ctx.lineTo(x, y + 5);
        this.ctx.stroke();

        // Seat
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + 5, 15, 6, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Body
        this.ctx.fillStyle = '#2E5090';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y - 20, 20, 25, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Head
        this.ctx.fillStyle = '#E8C39E';
        this.ctx.beginPath();
        this.ctx.arc(x, y - 55, 18, 0, Math.PI * 2);
        this.ctx.fill();

        // Curly hair
        this.ctx.fillStyle = '#3a2a1a';
        for (let i = 0; i < 8; i++) {
            const angle = -Math.PI + (i * Math.PI / 7);
            this.ctx.beginPath();
            this.ctx.arc(x + Math.cos(angle) * 16, y - 55 + Math.sin(angle) * 16 - 5, 6, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Eyes
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(x - 6, y - 58, 3, 0, Math.PI * 2);
        this.ctx.arc(x + 6, y - 58, 3, 0, Math.PI * 2);
        this.ctx.fill();

        // Smile
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(x, y - 50, 8, 0.2, Math.PI - 0.2);
        this.ctx.stroke();

        // Arms balancing
        const balance = Math.sin(Date.now() / 150) * 10;
        this.ctx.strokeStyle = '#2E5090';
        this.ctx.lineWidth = 8;
        // Left arm
        this.ctx.beginPath();
        this.ctx.moveTo(x - 20, y - 25);
        this.ctx.lineTo(x - 45, y - 15 + balance);
        this.ctx.stroke();
        // Right arm
        this.ctx.beginPath();
        this.ctx.moveTo(x + 20, y - 25);
        this.ctx.lineTo(x + 45, y - 15 - balance);
        this.ctx.stroke();

        // Hands
        this.ctx.fillStyle = '#E8C39E';
        this.ctx.beginPath();
        this.ctx.arc(x - 45, y - 15 + balance, 6, 0, Math.PI * 2);
        this.ctx.arc(x + 45, y - 15 - balance, 6, 0, Math.PI * 2);
        this.ctx.fill();

        // Legs on pedals
        this.ctx.strokeStyle = '#1a1a1a';
        this.ctx.lineWidth = 6;
        const pedalAngle = (Date.now() / 100) % (Math.PI * 2);
        // Left leg
        this.ctx.beginPath();
        this.ctx.moveTo(x - 10, y);
        this.ctx.lineTo(x + Math.cos(pedalAngle) * 15, y + 35 + Math.sin(pedalAngle) * 10);
        this.ctx.stroke();
        // Right leg
        this.ctx.beginPath();
        this.ctx.moveTo(x + 10, y);
        this.ctx.lineTo(x + Math.cos(pedalAngle + Math.PI) * 15, y + 35 + Math.sin(pedalAngle + Math.PI) * 10);
        this.ctx.stroke();

        // Draw yamulka stack on head
        for (let i = 0; i < Math.min(this.player.yamulkaStack, 20); i++) {
            this.ctx.fillStyle = i % 2 === 0 ? '#1a1a1a' : '#2a2a4a';
            this.ctx.beginPath();
            this.ctx.ellipse(x, y - 72 - (i * 6), 16 - (i * 0.3), 5, 0, 0, Math.PI * 2);
            this.ctx.fill();
            // Add decorative pattern
            if (i % 3 === 0) {
                this.ctx.strokeStyle = '#ffd700';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.ellipse(x, y - 72 - (i * 6), 12 - (i * 0.3), 3, 0, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        }

        // Show stack count if many yamulkas
        if (this.player.yamulkaStack > 5) {
            this.ctx.fillStyle = '#ffd700';
            this.ctx.font = 'bold 14px Georgia';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(`×${this.player.yamulkaStack}`, x + 30, y - 80);
        }

        this.ctx.restore();
    }

    drawItem(item) {
        this.ctx.save();
        this.ctx.translate(item.x, item.y);
        this.ctx.rotate(item.rotation);

        if (item.type === 'yamulka') {
            // Draw yamulka (kippah)
            this.ctx.fillStyle = '#1a1a1a';
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, item.width / 2, item.height / 2, 0, 0, Math.PI * 2);
            this.ctx.fill();

            // Decorative pattern
            this.ctx.strokeStyle = '#3a3a5a';
            this.ctx.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(Math.cos(angle) * 12, Math.sin(angle) * 5);
                this.ctx.stroke();
            }
        } else if (item.type === 'bagel') {
            // Draw bagel
            this.ctx.fillStyle = '#d4a574';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, item.width / 2, 0, Math.PI * 2);
            this.ctx.fill();

            // Bagel hole
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, item.width / 5, 0, Math.PI * 2);
            this.ctx.fill();

            // Sesame seeds
            this.ctx.fillStyle = '#f5deb3';
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const r = item.width / 3;
                this.ctx.beginPath();
                this.ctx.ellipse(Math.cos(angle) * r, Math.sin(angle) * r, 2, 1, angle, 0, Math.PI * 2);
                this.ctx.fill();
            }

            // Shine
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.beginPath();
            this.ctx.ellipse(-3, -3, 4, 2, -0.5, 0, Math.PI * 2);
            this.ctx.fill();
        } else if (item.type === 'mezuzah') {
            // Draw mezuzah
            this.ctx.fillStyle = '#ffd700';
            this.ctx.beginPath();
            this.ctx.roundRect(-item.width / 2, -item.height / 2, item.width, item.height, 3);
            this.ctx.fill();

            // Decorative pattern
            this.ctx.strokeStyle = '#b8860b';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.roundRect(-item.width / 2 + 2, -item.height / 2 + 2, item.width - 4, item.height - 4, 2);
            this.ctx.stroke();

            // Hebrew letter Shin
            this.ctx.fillStyle = '#8b4513';
            this.ctx.font = 'bold 16px serif';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('ש', 0, 0);
        }

        // Sparkle effect for bonus items
        if (item.type !== 'yamulka') {
            const sparkle = (Date.now() / 100) % (Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.sin(sparkle) * 0.5})`;
            this.ctx.beginPath();
            this.ctx.arc(item.width / 3, -item.height / 3, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }
}

// Initialize game
const game = new Game();
game.updateUI();
