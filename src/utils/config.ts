export const config = () => ({
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
    apiVersion: process.env.VERSION,
    jwtSecret: process.env.JWT_SECRET,
});