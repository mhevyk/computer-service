import cors, { CorsOptions } from "cors";

const ALLOWED_ORIGIN = process.env.CLIENT_BASE_URL;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const isAllowed = origin?.startsWith(ALLOWED_ORIGIN);

    if (isAllowed) {
      return callback(null, origin);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

export default cors(corsOptions);
