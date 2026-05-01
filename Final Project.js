// Seed default admin account
(function () {
  const users = JSON.parse(localStorage.getItem('mls_users') || '[]');
  const exists = users.find(u => u.username === 'musiclab0408');
  if (!exists) {
    users.push({ username: 'musiclab0408', password: 'aldy2004', firstName: 'Aldemar', lastName: 'Vargas' });
    localStorage.setItem('mls_users', JSON.stringify(users));
  }
})();

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('open');
});

// Auth — checks credentials saved in localStorage from account-setup
document.getElementById('nav-ok-user').addEventListener('click', () => {
  const input    = document.getElementById('nav-user-input');
  const password = document.querySelector('.nav-password');
  const msg      = document.getElementById('nav-msg');

  const users = JSON.parse(localStorage.getItem('mls_users') || '[]');
  const match = users.find(u =>
    u.username === input.value.trim() && u.password === password.value
  );

  if (match) {
    msg.textContent = `Welcome, ${match.firstName}!`;
    msg.style.color = '#00cc66';
  } else {
    msg.textContent = 'Incorrect username or password';
    msg.style.color = '#d0021b';
  }
  input.value    = '';
  password.value = '';
});

// Logo spin
document.querySelector('.logo-img').addEventListener('click', function () {
  if (this.classList.contains('spinning')) return;
  this.classList.add('spinning');
  this.addEventListener('animationend', function handler() {
    this.classList.remove('spinning');
    this.removeEventListener('animationend', handler);
  });
});

// Music toggle
const audio      = document.getElementById('bg-music');
const musicIcon  = document.getElementById('music-icon');
const musicLabel = document.getElementById('music-label');

document.getElementById('music-btn').addEventListener('click', () => {
  if (audio.paused) {
    audio.muted = false;
    audio.play();
    musicIcon.textContent  = '🔊';
    musicLabel.textContent = 'Music On';
  } else if (!audio.muted) {
    audio.muted = true;
    musicIcon.textContent  = '🔇';
    musicLabel.textContent = 'Music Off';
  } else {
    audio.muted = false;
    musicIcon.textContent  = '🔊';
    musicLabel.textContent = 'Music On';
  }
});

// Account setup form — validation + generate member HTML file
const accountForm = document.getElementById('account-form');
if (accountForm) {
  accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName    = document.getElementById('first-name').value.trim();
    const lastName     = document.getElementById('last-name').value.trim();
    const address      = document.getElementById('address').value.trim();
    const city         = document.getElementById('city').value.trim();
    const state        = document.getElementById('state').value.trim();
    const zip          = document.getElementById('zip').value.trim();
    const phone        = document.getElementById('phone').value.trim();
    const email        = document.getElementById('email').value.trim();
    const artistName   = document.getElementById('artist-name').value.trim();
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('new-password');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');
    const successMsg    = document.getElementById('account-success');
    let valid = true;

    // Validate username
    if (usernameInput.value.trim().length < 6) {
      usernameError.classList.add('visible');
      usernameInput.style.borderColor = '#d0021b';
      valid = false;
    } else {
      usernameError.classList.remove('visible');
      usernameInput.style.borderColor = '';
    }

    // Validate password
    if (passwordInput.value.length < 8) {
      passwordError.classList.add('visible');
      passwordInput.style.borderColor = '#d0021b';
      valid = false;
    } else {
      passwordError.classList.remove('visible');
      passwordInput.style.borderColor = '';
    }

    if (!valid) {
      successMsg.classList.remove('visible');
      return;
    }

    // Build member HTML file
    const username = usernameInput.value.trim();
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${firstName} ${lastName} — Music Lab Studio</title>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="Final Project.css" />
  <style>
    .member-main { padding: 213px 2rem 4rem; max-width: 700px; margin: 0 auto; }
    .member-welcome { font-family: 'Dancing Script', cursive; font-size: 3rem; font-weight: 700; color: #ffffff; text-align: center; margin-bottom: 2rem; letter-spacing: 0.04em; }
    .member-card { background: #0d0d0d; border: 1px solid #1f1f1f; border-radius: 12px; padding: 2rem; display: flex; flex-direction: column; gap: 0.8rem; }
    .member-row { display: flex; gap: 0.5rem; font-size: 0.85rem; }
    .member-key { color: #555555; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; min-width: 170px; }
    .member-val { color: #e0e0e0; }
  </style>
</head>
<body>
  <audio id="bg-music" loop>
    <source src="Pictures and videos/background.mp3" type="audio/mpeg" />
  </audio>
  <nav>
    <input class="nav-user" id="nav-user-input" type="text" placeholder="User Name" />
    <input class="nav-password" type="password" placeholder="Password" />
    <button class="nav-ok nav-ok-user" id="nav-ok-user">OK</button>
    <a class="nav-create-account" href="account-setup.html">Create an account</a>
    <span class="nav-msg" id="nav-msg"></span>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-menu" id="nav-menu">
      <a href="index.html">Homepage</a>
      <a href="index.html">Rehearsal</a>
      <a href="recording.html">Recording</a>
      <a href="index.html">Mix &amp; Master</a>
      <a href="live-sessions.html">Live Sessions</a>
      <a href="index.html">Prices</a>
      <a href="index.html">Gallery</a>
      <a href="social-media.html">Social Media</a>
      <a href="index.html">Contact Us</a>
      <a href="index.html">Merchandise</a>
    </div>
    <div class="logo">
      <img src="Pictures and videos/ACC35597-5B7A-422F-8545-17F801523668_1_105_c.jpeg" alt="Music Lab Studio Logo" class="logo-img" />
      <div class="logo-sub">Professional Rehearsal &amp; Recording Studio</div>
      <div class="logo-contact">Address: 2530 Grand Concourse Bronx, NY 10458 &nbsp;|&nbsp; Tel: 929-530-9242 &nbsp;|&nbsp; email: musiclabstudio1@gmail.com</div>
    </div>
  </nav>
  <main class="member-main">
    <h1 class="member-welcome">Welcome, ${firstName}!</h1>
    <div class="member-card">
      <div class="member-row"><span class="member-key">First Name</span><span class="member-val">${firstName}</span></div>
      <div class="member-row"><span class="member-key">Last Name</span><span class="member-val">${lastName}</span></div>
      <div class="member-row"><span class="member-key">Address</span><span class="member-val">${address}</span></div>
      <div class="member-row"><span class="member-key">City</span><span class="member-val">${city}</span></div>
      <div class="member-row"><span class="member-key">State</span><span class="member-val">${state}</span></div>
      <div class="member-row"><span class="member-key">Zip Code</span><span class="member-val">${zip}</span></div>
      <div class="member-row"><span class="member-key">Phone Number</span><span class="member-val">${phone}</span></div>
      <div class="member-row"><span class="member-key">Email Address</span><span class="member-val">${email}</span></div>
      <div class="member-row"><span class="member-key">Band / Artist Name</span><span class="member-val">${artistName}</span></div>
      <div class="member-row"><span class="member-key">Username</span><span class="member-val">${username}</span></div>
    </div>
  </main>
  <footer>
    <div class="footer-links">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Status</a>
      <a href="#">Contact</a>
    </div>
    <button class="music-btn" id="music-btn">
      <span class="music-icon" id="music-icon">♪</span>
      <span id="music-label">Play Music</span>
    </button>
    <span>&copy; 2026 Music Lab Studio. All rights reserved.</span>
  </footer>
  <script src="Final Project.js"></script>
</body>
</html>`;

    // Save credentials to localStorage so login works on all pages
    const users = JSON.parse(localStorage.getItem('mls_users') || '[]');
    users.push({ username, password: passwordInput.value, firstName, lastName });
    localStorage.setItem('mls_users', JSON.stringify(users));

    // Download the file named FirstName LastName.html
    const blob = new Blob([html], { type: 'text/html' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${firstName} ${lastName}.html`;
    a.click();
    URL.revokeObjectURL(url);

    successMsg.classList.add('visible');
    accountForm.reset();
  });
}

// Lightbox
const lightbox      = document.getElementById('lightbox');
const lightboxLabel = document.getElementById('lightbox-label');

document.querySelectorAll('.gallery-box').forEach((box, index) => {
  box.addEventListener('click', () => {
    if (box.dataset.href) {
      window.location.href = box.dataset.href;
      return;
    }
    if (lightbox && lightboxLabel) {
      lightboxLabel.textContent = `Photo ${index + 1}`;
      lightbox.classList.add('open');
    }
  });
});

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });
}

const lightboxClose = document.querySelector('.lightbox-close');
if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });
}
