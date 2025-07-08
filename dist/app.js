"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import productRoutes from "./routes/product.routes";
// import categoryRoutes from "./routes/category.routes";
// import orderRoutes from "./routes/order.routes";
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use("/api/products", productRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/users", user_routes_1.default);
app.use("/api/profiles", profile_routes_1.default);
exports.default = app;
