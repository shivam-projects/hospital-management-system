import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db";
const app = express();
const PORT = Number(process.env.PORT) || 5001;
import runMigrations from "./database/runMigrations";
import userRoutes from './routes/users';
import roleRoutes from './routes/roles'
import departmentRoutes from "./routes/departments";
import doctorRoutes from "./routes/doctors";


// Middlewares
app.use(cors());
app.use(express.json());

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await runMigrations();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();


app.use('/users', userRoutes)

app.use("/roles", roleRoutes);

app.use("/departments", departmentRoutes);

app.use("/doctors", doctorRoutes);