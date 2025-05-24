function goToForm() {
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('formPage').classList.add('active');
}

function submitMessage() {
  const to = document.getElementById('to').value.trim();
  const message = document.getElementById('message').value.trim();
  const from = document.getElementById('from').value.trim();
  const song = document.getElementById('song').value.trim();

  if (!to || !message || !from) {
    alert('Tolong isi kolom To, Message, dan From terlebih dahulu ya!');
    return;
  }

  const feedPage = document.getElementById('feed');
  const chatCard = document.createElement('div');
  chatCard.className = 'chat-card';

  const embedLink = convertYoutubeLink(song);
  const iframeHtml = embedLink
    ? `<iframe width="100%" height="200" src="${embedLink}" frameborder="0" allowfullscreen></iframe>`
    : '';

  chatCard.innerHTML = `
    <div class="small">To: ${to}</div>
    <div class="message">${message}</div>
    <div class="small">From: ${from}</div>
    <div>${iframeHtml}</div>
    <div class="interact">
      <button onclick="like(this)">❤️ Suka</button>
      <button onclick="alert('Fitur komen coming soon!')">💬 Komen</button>
      <button onclick="shareMessage('${encodeURIComponent(message)}')">🔗 Share</button>
    </div>
  `;

  feedPage.prepend(chatCard);

  // Reset form
  document.getElementById('to').value = '';
  document.getElementById('message').value = '';
  document.getElementById('from').value = '';
  document.getElementById('song').value = '';

  document.getElementById('formPage').classList.remove('active');
  document.getElementById('feedPage').classList.add('active');
}

function convertYoutubeLink(link) {
  if (!link) return '';

  let videoId = '';

  try {
    const url = new URL(link);
    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.slice(1);
    } else if (url.hostname.includes('youtube.com')) {
      videoId = url.searchParams.get('v') || '';
    }
  } catch {
    return '';
  }

  if (!videoId) return '';

  return `https://www.youtube.com/embed/${videoId}`;
}

function like(btn) {
  btn.innerText = '💖 Disukai';
  btn.disabled = true;
}

function shareMessage(text) {
  const decodedText = decodeURIComponent(text);
  if (navigator.clipboard) {
    navigator.clipboard.writeText(decodedText).then(() => {
      alert('Pesan disalin ke clipboard!');
    });
  } else {
    alert('Browser kamu tidak mendukung fitur clipboard.');
  }
}
