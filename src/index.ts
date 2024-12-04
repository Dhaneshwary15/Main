import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, error: "Route not found" });
  });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  