# Librarian: Tidy Up the Arcane Library

A cozy browser game inspired by the Steam game by ArtRising. A mischievous fairy has scattered ~3000 magical books across the library floor. Sort them back onto the correct shelves before you can leave!

## How to Play

- **Click** a book on the floor to pick it up (hold up to 3 books)
- **Click** the correct shelf slot to place it — must match the right section, series, and volume
- **Complete series** (all volumes placed) to earn skill points
- **Complete sections** for sparkle celebrations
- **Upgrade abilities** with skill points to sort faster

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1`–`5` | Select held book |
| `Esc` | Deselect book |
| `E` | Insight ability |
| `F` | Switch floor |
| `U` | Ability screen |
| `M` | Map screen |

## Abilities

- **Sort** — arranges held books in order
- **Insight** — highlights floor books matching your active series
- **Shelf Guide** — scrolls to and highlights the correct shelf slot
- **Assemble** — pulls matching books from the floor into your hand
- **Auto-Shelving** — instantly places all held books on correct shelves

## Run Locally

```bash
# Option 1: just open the file
open index.html

# Option 2: serve with npm
npm install
npm run dev
# then visit http://localhost:3000
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

The `vercel.json` is already configured for static deployment.

## Push to GitHub

```bash
git add .
git commit -m "Initial game build"
git push -u origin main
```
