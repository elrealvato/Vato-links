const cards = document.querySelectorAll('.link-card');
const shareModal = document.getElementById('share-modal');
const sharePlatform = document.getElementById('share-platform');
const shareUrl = document.getElementById('share-url');
const sharePreviewIcon = document.getElementById('share-preview-icon');
const copyLinkBtn = document.getElementById('copy-link-btn');

const shareX = document.getElementById('share-x');
const shareFacebook = document.getElementById('share-facebook');
const shareWhatsapp = document.getElementById('share-whatsapp');
const shareLinkedin = document.getElementById('share-linkedin');
const shareMessenger = document.getElementById('share-messenger');
const shareSnapchat = document.getElementById('share-snapchat');
const shareEmail = document.getElementById('share-email');

let activeLink = '';

function openShareModal(platform, url, iconName) {
  activeLink = url;

  sharePlatform.textContent = platform;
  shareUrl.textContent = url;
  sharePreviewIcon.className = `fa-brands ${iconName}`;

  const encodedUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(`Check out El Vato!`);
  const emailSubject = encodeURIComponent(`${platform} | El Vato`);
  const emailBody = encodeURIComponent(`Tap in here: ${url}`);

  shareX.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`;
  shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  shareWhatsapp.href = `https://wa.me/?text=${shareText}%20${encodedUrl}`;
  shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  shareMessenger.href = `fb-messenger://share/?link=${encodedUrl}`;
  shareSnapchat.href = `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`;
  shareEmail.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  shareModal.hidden = false;
  document.body.classList.add('no-scroll');
}

function closeShareModal() {
  shareModal.hidden = true;
  document.body.classList.remove('no-scroll');
}

async function copyLink() {
  if (!activeLink) {
    return;
  }

  try {
    await navigator.clipboard.writeText(activeLink);
    copyLinkBtn.querySelector('span').textContent = 'Copied';
    window.setTimeout(() => {
      copyLinkBtn.querySelector('span').textContent = 'Copy link';
    }, 1200);
  } catch {
    copyLinkBtn.querySelector('span').textContent = 'Copy failed';
  }
}

cards.forEach((card) => {
  const menuButton = card.querySelector('.link-menu');

  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -3.2;
    const rotateY = ((x / rect.width) - 0.5) * 5;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const platform = card.dataset.platform || 'Link';
    const url = card.dataset.url || '';
    const iconName = card.dataset.icon || 'fa-link';

    openShareModal(platform, url, iconName);
  });
});

copyLinkBtn.addEventListener('click', copyLink);

shareModal.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const closeTarget = target.closest('[data-close-modal="true"]');
  if (closeTarget) {
    closeShareModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !shareModal.hidden) {
    closeShareModal();
  }
});
