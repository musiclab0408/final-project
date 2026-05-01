// Hamburger menu
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav-menu').classList.toggle('open');
});

// Auth
document.getElementById('nav-ok-user').addEventListener('click', () => {
  const input    = document.getElementById('nav-user-input');
  const password = document.querySelector('.nav-password');
  const msg      = document.getElementById('nav-msg');
  if (input.value.trim().toLowerCase() === 'hello') {
    msg.textContent = 'Successful';
    msg.style.color = '#00cc66';
  } else {
    msg.textContent = 'Incorrect';
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

// Account setup form validation
const accountForm = document.getElementById('account-form');
if (accountForm) {
  accountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const usernameInput  = document.getElementById('username');
    const passwordInput  = document.getElementById('new-password');
    const usernameError  = document.getElementById('username-error');
    const passwordError  = document.getElementById('password-error');
    const successMsg     = document.getElementById('account-success');
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

    if (valid) {
      successMsg.classList.add('visible');
      accountForm.reset();
    } else {
      successMsg.classList.remove('visible');
    }
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
