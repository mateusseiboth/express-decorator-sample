import { App } from "./src";
import { delay } from "./src/functions/delay";
import { log } from "./src/functions/logger";

async function run() {
    log("EntryPoint.ts", "Allocation started");
    try {
        const app = new App();
        app.init();
        log("EntryPoint.ts", "Allocation finished");
        log("EntryPoint.ts", "Application started successfully");
    } catch (error) {
        log("EntryPoint.ts", "Error starting application");
        log("EntryPoint.ts", `Error: ${error}`);
        await delay(6000);
        log("EntryPoint.ts", "Retrying to start application");
        run();
    }
}
run();