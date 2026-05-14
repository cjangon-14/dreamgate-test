# Dream Gate - React Router Application

A modern, full-stack React application built with React Router 7, featuring a theme park booking system with attractions, bookings, and interactive UI components.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering with React Router 7
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization with Vite
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎨 TailwindCSS for styling
- 🎭 Interactive animations with Framer Motion & GSAP
- 📅 Date picker components with HeroUI
- 🎯 Accessible UI components with Radix UI
- 📊 Mock API with json-server
- 🐳 Docker containerization
- ☁️ Deployed on Render
- 📖 [React Router docs](https://reactrouter.com/)

## Tech Stack

- **Frontend:** React 19, React Router 7, TypeScript
- **Styling:** Tailwind CSS, Tailwind Animate
- **UI Components:** Radix UI, HeroUI, Lucide React
- **Animations:** Framer Motion, GSAP, Motion
- **Backend:** json-server (mock API)
- **Build Tool:** Vite
- **Deployment:** Docker + Render

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR (runs both React app and json-server):

```bash
npm run dev
```

Your application will be available at `http://localhost:5173` and the API at `http://localhost:3005`.

### API Server Only

To run just the json-server API:

```bash
npm run server
```

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t dream-gate .
docker run -p 3000:3000 -p 3005:3005 dream-gate
```

The containerized application can be deployed to any platform that supports Docker, including:

- Render (recommended)
- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### Render Deployment

This project is optimized for deployment on Render:

1. Connect your GitHub repository
2. Create a new Web Service
3. Select Docker as the runtime
4. Deploy!

The service will automatically run both the React Router server and json-server concurrently.

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`:

```
├── package.json
├── package-lock.json
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
├── db.json        # Mock API data
└── Dockerfile     # Docker configuration
```

## Project Structure

```
├── app/                    # React Router app directory
│   ├── components/         # Reusable UI components
│   ├── routes/            # Route components
│   ├── data/              # Static data files
│   └── styles/            # CSS stylesheets
├── public/                # Static assets
├── db.json               # Mock API database
├── Dockerfile           # Docker configuration
└── package.json         # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run server` - Start json-server only
- `npm run typecheck` - Run TypeScript type checking

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling with custom animations and a modern design system. UI components are built with Radix UI for accessibility and HeroUI for enhanced functionality.

---

Built with ❤️ using React Router.
