import error from "../config/error";
import userRoutes from "../controller/user/router";
import transactionRoutes from "../controller/transaction/router";

export default (app) => {
  app.use("/users", userRoutes);
  app.use("/transactions", transactionRoutes);
  app.use(error);
}