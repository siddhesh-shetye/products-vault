import express from "express";

// import productRoutes from "./routes/product.routes";
// import categoryRoutes from "./routes/category.routes";
// import orderRoutes from "./routes/order.routes";
import userRoutes from "./routes/user.routes";
import profileRoutes from "./routes/profile.routes";

const app = express();

app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);

export default app;