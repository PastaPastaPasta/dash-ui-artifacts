# dash-sites PR 16: editor prototypes

Throwaway prototypes behind `docs/VISUAL-BUILDER.md` (PastaPastaPasta/dash-sites#16, spec commit `10f02bf`). They are not part of the PR.

Each page builds the same reference page (picture, heading, tagline, paragraph, four links, three columns, a poll tag, a comments tag, a footer) and was captured in headless Chromium (Playwright), served with the Content-Security-Policy of `dash.site/new`. The picture is a path with no file behind it, so it shows as a broken image.

| File | Engine | Viewport |
| --- | --- | --- |
| `prototype/grapesjs-desktop.png` | GrapesJS 0.23.9, stock interface with grapesjs-blocks-basic 1.0.2 | 1280x800 |
| `prototype/grapesjs-phone.png` | same | 390x844, touch |
| `prototype/puck-desktop.png` | Puck 0.24.2 (`@puckeditor/core`) with React 19 | 1280x800 |
| `prototype/puck-phone-fields.png` | same, after tapping the header block and the Fields tab | 390x844, touch |

The GrapesJS toolbar icons are blank because its icon font is fetched from cdnjs, which the policy blocks.
