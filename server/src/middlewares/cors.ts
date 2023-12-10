import cors, { CorsOptions } from "cors";

const originWhitelist = [process.env.CLIENT_BASE_URL];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && originWhitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
