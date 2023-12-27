import cors, { CorsOptions } from "cors";
import { IS_TEST } from "../constants/global";

const originWhitelist = [process.env.CLIENT_BASE_URL];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (IS_TEST) {
      return callback(null, true);
    }

    if (origin && originWhitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
