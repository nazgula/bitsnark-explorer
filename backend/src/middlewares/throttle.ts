import { Request, Response, NextFunction } from 'express';

let lastRequestTime = 0;

export function throttle(req: Request, res: Response, next: NextFunction) {
    const currentTime = Date.now();
    if (currentTime - lastRequestTime < 30000) {
        return res.status(429).json({ error: 'Too many requests' });
    }
    lastRequestTime = currentTime;
    console.log(lastRequestTime, `req: ${req.url}`);
    next();
}