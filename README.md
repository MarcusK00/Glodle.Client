# Glodle

A playful Expo + React Native client for the **Glodle** game. The app delivers swipe-based country comparison rounds powered by a GraphQL API, with animated UI, custom fonts, and a retro arcade-inspired look.

## ✨ Features
- **Swipe-to-answer gameplay** with animated cards
- **Expo Router** navigation
- **Tailwind / Uniwind** styling
- **GraphQL** round fetching
- Custom typography and animated background effects

## 🧱 Tech Stack
- **Expo** + **React Native**
- **Expo Router**
- **TypeScript**
- **Tailwind CSS / Uniwind**
- **GraphQL API**

## 🧭 App Flow
- **Home**: title screen with “New Game” and “Leaderboard”
- **New Game**: fetches a round and lets players swipe or tap to answer
- **Leaderboard**: placeholder screen with back navigation

## 🚀 Getting Started

### 1) Install dependencies
```sh
npm install
```

### 2) Configure API endpoint
The GraphQL endpoint is currently hardcoded in:
```
src/api/client.ts
```

Update:
```
const API_URL = "http://192.168.0.20:3000/graphql";
```

to your local or deployed API address.

### 3) Run the app
```sh
npm run start
```

Then choose a platform:
```sh
npm run ios
npm run android
npm run web
```

## 📁 Project Structure
```
src/
  app/           # Expo Router screens
  api/           # GraphQL client, queries, hooks, types
  components/    # Reusable UI components
  services/      # Game service helpers
  utils/         # Utility functions
  assets/        # Fonts and images
```

## 🧪 Notes
- The leaderboard screen is currently a placeholder.
- The game relies on a GraphQL backend that serves a random round with country metrics.

## 📄 License
TBD
