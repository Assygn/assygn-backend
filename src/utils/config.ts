export const config = () => ({
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
});