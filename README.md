# Ben Pawle website

Static website for benpawle.com, served from the root of the master branch.

- `/` — new homepage.
- `/archive/` — previous Work page, with its original design and project content.
- `/archive/stuff.html` and `/archive/about.html` — previous supporting pages.
- `/stuff.html` and `/about.html` redirect to their archived counterparts.

Archive navigation includes Home to return to the new homepage. Legacy external embeds are preserved and depend on their original providers.

Preview with `python3 -m http.server 4174 --bind 127.0.0.1`, then open http://127.0.0.1:4174/.
No build step is required. CNAME retains benpawle.com. Experiments are not included.

The Cumberland flag toggles Cumbrian wording and locally hosted PT Serif / Mansalva fonts. Default is the original English version; toggle state resets on reload. The flag supports keyboard activation and exposes its pressed state. Navigation stays visible on mobile.
