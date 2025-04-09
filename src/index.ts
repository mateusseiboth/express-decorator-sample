import { log } from "./functions/logger";
import { ExpressServer } from "./infra/server";

export class App {
    constructor() {
        this.init();
    }

    init() {
        log("App", "Starting application...");
        const port = process.env.PORT as unknown as number || 3000;
        const server = new ExpressServer(port);
        server.init();
        log("App", "Application started successfully.");
    }
}