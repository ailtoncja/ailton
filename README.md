# Ailton Clone - Next.js

Site pessoal em Next.js (App Router), pronto para GitHub e deploy na Vercel.

## Requisitos

- Node.js `>= 18.18.0`
- npm `>= 9`

## Executar localmente

1. `npm install`
2. `npm run dev`
3. Abra `http://localhost:3000`

## Build de producao

1. `npm run build`
2. `npm run start`

## Estrutura principal

- `app/page.jsx`: pagina principal
- `app/globals.css`: estilos globais e responsividade
- `public/`: imagens e audios estaticos

## Publicar no GitHub

1. Crie um repositorio no GitHub.
2. No projeto local:
   - `git init` (se ainda nao tiver)
   - `git add .`
   - `git commit -m "feat: responsive improvements and deploy setup"`
   - `git branch -M main`
   - `git remote add origin <URL_DO_REPOSITORIO>`
   - `git push -u origin main`

## Deploy na Vercel

1. Importe o repositorio na Vercel.
2. Framework: `Next.js` (detectado automaticamente).
3. Comando de build: `npm run build`.
4. Deploy.
