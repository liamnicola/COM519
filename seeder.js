const { MONGODB_URI} = process.env;
const client = new MongoClient(
    process.env.NODE_ENV === "production" ? MONGODB_PRODUCTION_URI : MONGODB_PRODUCTION_URI);