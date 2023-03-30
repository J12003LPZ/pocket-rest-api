import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DB_DATABASE = "pocket-ecommerce";
export const DB_USER = "bv3eoxya7mixmbfn90s8";
export const DB_PASSWORD =
  "pscale_pw_ojPr0c7xO2p2rXc6ist97jsUAmJIbax8gg38eBV1G9i";
export const DB_HOST = "us-east.connect.psdb.cloud";
export const DB_PORT = 3306;
