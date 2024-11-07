import mongoose from "mongoose";

async function dbConnect() {
  return mongoose.connect(
    "mongodb://root:example@localhost:27017/cs-skin-store?authSource=admin"
  );
}

export default dbConnect;
