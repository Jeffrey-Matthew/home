import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error('Server error:', err.message);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
