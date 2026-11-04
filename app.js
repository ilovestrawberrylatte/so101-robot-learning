const pairs = [...document.querySelectorAll('[data-pair]')];
function startPair(pair) {
  document.querySelectorAll('[data-pair]').forEach(other => {
    if (other !== pair) other.querySelectorAll('video').forEach(v => v.pause());
  });
  const videos = [...pair.querySelectorAll('video')];
  const message = pair.querySelector('.playback-error');
  message.hidden = true;
  return Promise.all(videos.map(v => v.play())).catch(() => {
    videos.forEach(v => v.pause());
    message.textContent = 'Playback was interrupted. Press Play both to try again.';
    message.hidden = false;
  });
}
pairs.forEach(pair => {
  const videos = [...pair.querySelectorAll('video')];
  const front = videos[0];
  const playButton = pair.querySelector('[data-action="play"]');
  function seek(time) {
    videos.forEach(v => {
      const apply = () => { v.currentTime = Math.min(time, v.duration || time); };
      if (v.readyState >= 1) apply();
      else { v.addEventListener('loadedmetadata', apply, { once: true }); v.load(); }
    });
  }
  pair.seek = seek;
  playButton.addEventListener('click', () => {
    if (videos.some(v => !v.paused)) videos.forEach(v => v.pause());
    else startPair(pair);
  });
  pair.querySelector('[data-action="restart"]').addEventListener('click', () => {
    seek(0); startPair(pair);
  });
  videos.forEach((video, index) => {
    const other = videos[1 - index];
    video.addEventListener('play', () => {
      playButton.textContent = 'Pause both';
      if (other.paused && !other.ended) startPair(pair);
    });
    video.addEventListener('pause', () => {
      if (!other.paused) other.pause();
      playButton.textContent = 'Play both';
    });
    video.addEventListener('seeked', () => {
      if (other.readyState >= 1 && Math.abs(other.currentTime - video.currentTime) > .2) other.currentTime = video.currentTime;
    });
    video.addEventListener('ended', () => {
      other.pause(); playButton.textContent = 'Play both';
    });
  });
  front.addEventListener('timeupdate', () => {
    const wrist = videos[1];
    if (!front.paused && !wrist.paused && wrist.readyState >= 2 && Math.abs(front.currentTime - wrist.currentTime) > .35) wrist.currentTime = front.currentTime;
  });
});
document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => {
  const pair = document.querySelector('[data-pair="featured"]');
  pair.seek(Number(button.dataset.time));
  startPair(pair);
  pair.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));
