# Deeplook Dashboard

This is the **frontend** for the Deeplook — a real-time interface for visualizing markets, trades, and analytics powered by the DeepBook protocol on Sui.

## 🧩 Tech Stack

- React + TypeScript
- Tailwind CSS v4
- Vite
- React Router
- Lightweight Charts
- Recharts

## 🚀 Getting Started

### 1. Run API

Run your own Deeplook backend, which exposes endpoints used by the dashboard. Add the API URL into `.env` file:

```bash
VITE_API_URL=https://your.deeplook.api.url
```

### 2. Install dependencies

We are using `pnpm` as a dependency manager, but feel free to use `npm`, `yarn` or any other.

```bash
pnpm install
```

### 3. Run in development mode

```bash
pnpm run dev
```

### 4. Build for production

API URL is hardcoded into the production build at build time, make sure you use correct URL when building!

```bash
pnpm run build
```

## 📊 Features

- Live orderbook
- Live latest trades
- Candle charts
- Pool list with 24h stats
