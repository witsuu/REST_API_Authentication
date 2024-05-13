import { db } from "./config/db";
import { app } from "./config/app";

const PORT = process.env.PORT || 3500;

db.connect().then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))