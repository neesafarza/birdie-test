import app from "./application";
import { DatabaseConnectionManager } from "./db/databaseConnectionManager";

const port = process.env.PORT || 8000;
DatabaseConnectionManager.init();

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server started at http://localhost:${port}`);
});
