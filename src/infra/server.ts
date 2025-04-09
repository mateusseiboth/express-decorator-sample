import cors from "cors";
import express from "express";
import '../controllers/chamado';
import '../controllers/chat';

import { Router } from "../decorators/router";
import { log } from "../functions/logger";
import router from "../routes/main";

export class ExpressServer {
    private express: express.Application;
    private port: number;

    constructor(port: number) {
        this.port = port;
        this.express = express();
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(router);
        this.express.use((req, res, next) => {
            log("Request", `${req.method} ${req.url}`);
            next();
        })
        this.express.use((req, res, next) => {
            res.on("finish", () => {
                log("Response", `${res.statusCode}`);
            });
            next();
        });
        this.express.use(Router.build());

        this.init();
    }
    init() {
        this.express.listen(this.port, () => {
            log("Server", `Server is running on port ${this.port}`);
        })
    }
}