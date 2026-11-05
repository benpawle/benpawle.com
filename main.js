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

toggle.addEventListener('click', () => {
  const enabled = toggle.getAttribute('aria-pressed') !== 'true';
  toggle.setAttribute('aria-pressed', String(enabled));
  document.body.classList.toggle('cumbrian', enabled);
  heading.textContent = enabled ? "Ah’s Ben Pawle  -Makker o' things. Thinker-up o' new uns. Gaffer when needs be." : original.heading;
  caption.textContent = enabled ? "Ben lives an wuks frae his studio up in Cumbria where he'll be fettlin away at this an that." : original.caption;
  archive.textContent = enabled ? 'Auld Stuff' : original.archive;
  flag.src = enabled ? 'assets/flag-cumbrian.svg' : original.flag;
  copy.replaceChildren(...(enabled ? [...cumbrian.content.childNodes] : original.copy).map(node => node.cloneNode(true)));
});
