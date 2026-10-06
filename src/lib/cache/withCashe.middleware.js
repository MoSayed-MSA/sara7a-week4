import {cacheProvider} from "./init.js";

export function withCache(ttl = 3600) {
    return async (req, res, next) => {
        // request
        // method + url
        // "GET:/products" : "[{},{},{},...]"
        let key = `${req.method}:${req.originalUrl}`;
        const cached = await cacheProvider.get(key);
        if (cached) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(JSON.parse(cached));
        }

        // interceptor
        // res.json(body) >> send client response
        // res.json(body) >> cache + send client response
        // get deep copy from implementation res.json before modify
        const originalJson = res.json.bind(res);
        // res.json() >> res() >> originalJson(body);

        res.json = (async (body) => {
            // 1. cache body >> "{"message":"","success":true,data:[{},{}]}"
            await cacheProvider.set(key, JSON.stringify(body), ttl);
            // 2. send response
            res.setHeader('X-Cache', 'MISS');
            return originalJson(body); // cache + re.json >> cache + res.json >> cache + res.js
        });

        next();
    };
}