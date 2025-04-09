import type { Request, Response } from "express";
import { Router } from "../decorators/router";

@Router.Prefix("/chat")
export class ChamadoController {

    @Router.Post("/")
    async create(req: Request, res: Response) {
        res.status(201).json({ message: "Chamado criado", data: req.body });
    }

    @Router.Post("/responder/:id")
    async responder(req: Request, res: Response) {
        res.json({ message: "Chamado respondido", data: req.body });
    }

    @Router.Get("/:id")
    async list(req: Request, res: Response) {
        res.json([{ id: req.params.id }]);
    }
    @Router.Get("/")
    async listAll(req: Request, res: Response) {
        res.json([{ id: "13" }, { id: "2" }]);
    }

    @Router.Put("/:id")
    async update(req: Request, res: Response) {
        res.json({ updated: req.params.id });
    }
}
