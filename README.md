# NID Mock Server

A TypeScript Express backend server with Morgan logging, CORS support, and security middleware.

## Features

- 🚀 **Express.js** - Fast, unopinionated web framework
- 📝 **Morgan** - HTTP request logger middleware
- 🌐 **CORS** - Cross-Origin Resource Sharing support
- 🛡️ **Helmet** - Security headers middleware
- 🔧 **TypeScript** - Type-safe JavaScript
- ⚡ **Hot Reload** - Development with ts-node-dev
- 📦 **Environment Variables** - Configuration management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SagarKarmoker/nid-mock-server
cd nid-mock-server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm start` - Start production server
- `npm run clean` - Clean build directory

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check endpoint
- `GET /api/status` - API status information

## Project Structure

```
nid-mock-server/
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
└── README.md            # Project documentation
```

## Development

The server runs on `http://localhost:3000` by default. You can change the port by setting the `PORT` environment variable.

### Adding New Routes

Create new route files in the `src/routes/` directory and import them in `src/index.ts`.

### Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)

## Production

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## License

MIT 