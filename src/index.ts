import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../swagger-output.json';
import nidRoutes from './routes/nid';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS for all routes
app.use(morgan("combined")); // HTTP request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'NID Mock Server API Documentation'
}));

// Basic route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to NID Mock Server",
    timestamp: new Date().toISOString(),
    status: "running",
  });
});

// NID routes - mount at both /api/nid and root level for compatibility
app.use('/api/nid', nidRoutes);
app.use('/', nidRoutes);  // This allows accessing routes directly like /id/1

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api/status", (req, res) => {
  res.json({
    message: "API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something went wrong!",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API status: http://localhost:${PORT}/api/status`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
});

export default app;
