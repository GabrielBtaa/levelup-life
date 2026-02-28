# ⚡ LevelUp Life — RPG de Hábitos

> Transforme seus hábitos diários em uma aventura RPG épica. Ganhe XP, suba de nível até o 100, construa streaks e vença seus amigos em duelos!

[![Deploy to GitHub Pages](https://github.com/SEU_USUARIO/levelup-life/actions/workflows/deploy.yml/badge.svg)](https://github.com/SEU_USUARIO/levelup-life/actions)

---

## 🚀 Deploy no GitHub Pages (Passo a Passo)

### 1. Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `levelup-life`
3. Marque como **Public** (necessário para GitHub Pages grátis)
4. **NÃO** inicialize com README (vamos fazer isso via terminal)
5. Clique em **Create repository**

### 2. Subir os arquivos

Abra o terminal no seu computador e execute:

```bash
# Entre na pasta do projeto
cd caminho/para/levelup-pwa

# Inicialize o git
git init
git add .
git commit -m "🚀 LevelUp Life v6 — PWA completo"

# Conecte ao GitHub (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/levelup-life.git
git branch -M main
git push -u origin main
```

### 3. Ativar GitHub Pages

1. No repositório, vá em **Settings** → **Pages**
2. Em **Source**, selecione **GitHub Actions**
3. Aguarde 1-2 minutos
4. Seu app estará em: `https://SEU_USUARIO.github.io/levelup-life`

---

## 📱 Instalar no iPhone

### Requisito: use o **Safari** (não Chrome/Firefox no iOS)

1. Acesse `https://SEU_USUARIO.github.io/levelup-life` no **Safari**
2. Toque no ícone **Compartilhar** `□↑` na barra inferior
3. Role a lista e toque em **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"** no canto superior direito
5. O ícone ⚡ aparece na sua tela inicial!

> **Dica:** Na primeira visita, o app vai sugerir automaticamente a instalação com um banner na tela.

---

## ✨ Funcionalidades PWA

| Feature | Status |
|---------|--------|
| 📱 Instalável (iOS & Android) | ✅ |
| 🌐 Funciona offline | ✅ |
| 💾 Cache inteligente | ✅ |
| 🔔 Notificações push | ✅ |
| ⚡ Carregamento instantâneo | ✅ |
| 🎨 Tela cheia (sem barra do browser) | ✅ |
| 🔄 Atualizações automáticas | ✅ |

---

## 🎮 Features do Jogo

- **100 Níveis** com títulos épicos (de "Aprendiz das Sombras" até "MONÓLITO")
- **Sistema de XP** com multiplicadores de streak e habilidades
- **Árvore de Skills** com 90 nós em 5 categorias
- **Missões Secretas** — aparecem 1x/semana, expiram em 24h
- **Boss Raid** — eventos semanais com recompensas épicas
- **Sistema de Temporadas** com tiers Bronze → Diamante
- **Loja de Cosméticos** com frames, temas e efeitos
- **Árvore de Títulos** com 12 títulos desbloqueáveis
- **Duelos 1v1** contra amigos
- **Chat** integrado com amigos
- **Analytics de IA** — insights personalizados de hábitos
- **Ranking Global, Semanal e de Amigos**
- **Calendário + Heatmap** de 6 meses

---

## 📁 Estrutura do Projeto

```
levelup-life/
├── index.html          # App completo (single-file)
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker (cache + offline)
├── favicon.ico         # Favicon 32x32
├── icons/
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-180.png
│   ├── icon-192.png    # Principal
│   ├── icon-384.png
│   ├── icon-512.png    # Splash screen
│   └── apple-touch-icon.png
├── .github/
│   └── workflows/
│       └── deploy.yml  # Auto-deploy
└── README.md
```

---

## 🔧 Desenvolvimento Local

```bash
# Opção 1: Python (sem instalação)
python3 -m http.server 8080
# Acesse: http://localhost:8080

# Opção 2: Node.js
npx serve .
# Acesse: http://localhost:3000

# Opção 3: VS Code
# Instale a extensão "Live Server" e clique em "Go Live"
```

> ⚠️ O Service Worker só funciona em `localhost` ou via HTTPS. Use um dos servidores acima para testar localmente.

---

## 📊 Lighthouse Score

Após o deploy, teste em [PageSpeed Insights](https://pagespeed.web.dev/):

- ⚡ Performance: **95+**
- ♿ Accessibility: **90+**
- 💡 Best Practices: **95+**
- 🔍 SEO: **90+**
- 📱 PWA: **100** ✓

---

Feito com ❤️ por LevelUp Life
