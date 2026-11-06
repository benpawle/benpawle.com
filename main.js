const toggle = document.querySelector('.flag');
const flag = toggle.querySelector('img');
const heading = document.querySelector('#title');
const copy = document.querySelector('.body-copy');
const caption = document.querySelector('.hero figcaption');
const archive = document.querySelector('#main-navigation a');
const original = {
  heading: heading.textContent,
  copy: [...copy.childNodes].map(node => node.cloneNode(true)),
  caption: caption.textContent,
  archive: archive.textContent,
  flag: flag.getAttribute('src')
};
const cumbrian = document.querySelector('#cumbrian-copy');
const setFlagWave = createFlagWave(toggle);

toggle.addEventListener('click', () => {
  const enabled = toggle.getAttribute('aria-pressed') !== 'true';
  toggle.setAttribute('aria-pressed', String(enabled));
  document.body.classList.toggle('cumbrian', enabled);
  heading.textContent = enabled ? "Ben Pawle -Makker o' things. Thinker-up o' new uns. Gaffer when needs be." : original.heading;
  caption.textContent = enabled ? "Ben lives an wuks frae his studio up in Cumbria where he'll be fettlin away at this an that." : original.caption;
  archive.textContent = enabled ? 'Auld Stuff' : original.archive;
  flag.src = enabled ? 'assets/flag-cumbrian.svg' : original.flag;
  copy.replaceChildren(...(enabled ? [...cumbrian.content.childNodes] : original.copy).map(node => node.cloneNode(true)));
  setFlagWave(enabled);
});

function createFlagWave(button) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  // Keep the original 33 1/3 x 20 px flag; extra canvas height lets it ripple.
  const scale = 6;
  const width = 200;
  const height = 120;
  const padding = 18;
  canvas.width = width;
  canvas.height = height + padding * 2;
  canvas.setAttribute('aria-hidden', 'true');
  button.appendChild(canvas);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = false;
  let texture = null;
  let frame = null;
  let elapsed = 0;
  let last = null;

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const phase = (elapsed % 3) / 3 * Math.PI * 2;
    for (let x = 0; x < width; x++) {
      const u = (x + 0.5) / width;
      const wave = 2.1 * scale * Math.sin(u * Math.PI / 2) * Math.sin(u * Math.PI * 2 - phase);
      context.drawImage(texture, x, 0, 1, height, x, padding + wave, 1, height);
    }
  }

  function tick(now) {
    if (last !== null) elapsed += Math.min((now - last) / 1000, 0.05);
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }

  function update() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    last = null;
    const animate = enabled && texture !== null && !reducedMotion.matches && !document.hidden;
    if (animate) draw();
    button.classList.toggle('is-waving', animate);
    if (animate) frame = requestAnimationFrame(tick);
  }

  const image = new Image();
  image.onload = () => {
    const source = document.createElement('canvas');
    source.width = width;
    source.height = height;
    const sourceContext = source.getContext('2d');
    if (!sourceContext) return;
    sourceContext.beginPath();
    sourceContext.roundRect(0, 0, width, height, 3 * scale);
    sourceContext.clip();
    sourceContext.drawImage(image, 0, 0, width, height);
    texture = source;
    update();
  };
  // The existing image remains the fallback until the animation is ready.
  image.src = 'assets/flag-cumbrian.svg';
  reducedMotion.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);

  return active => {
    enabled = active;
    update();
  };
}
