import express, { Router as ExpressRouter } from "express";

type HttpMethod = "get" | "post" | "put" | "delete";

interface RouteDefinition {
    method: HttpMethod;
    path: string;
    handlerName: string;
}

const controllerRegistry: any[] = [];

export namespace Router {
    export function Prefix(path: string) {
        return function (target: any) {
            target.prototype.__prefix = path;
            controllerRegistry.push(target);
        };
    }

    export function Use(...middlewares: any[]) {
        return function (target: any) {
            target.prototype.__classMiddlewares = middlewares;
        };
    }

    export function Middleware(...middlewares: any[]) {
        return function (target: any, propertyKey: string) {
            if (!target.__middlewares) target.__middlewares = {};
            if (!target.__middlewares[propertyKey]) {
                target.__middlewares[propertyKey] = [];
            }
            target.__middlewares[propertyKey].push(...middlewares);
        };
    }

    function methodDecorator(method: HttpMethod) {
        return function (path: string) {
            return function (target: any, propertyKey: string) {
                if (!target.__routes) target.__routes = [];
                target.__routes.push({ method, path, handlerName: propertyKey });
            };
        };
    }

    export const Get = methodDecorator("get");
    export const Post = methodDecorator("post");
    export const Put = methodDecorator("put");
    export const Delete = methodDecorator("delete");

    export function build(): ExpressRouter {
        const router = express.Router();

        for (const Controller of controllerRegistry) {
            const instance = new Controller();
            const prefix = instance.__prefix || "";
            const routes: RouteDefinition[] = instance.__routes || [];
            const classMiddlewares = instance.__classMiddlewares || [];
            const methodMiddlewares: Record<string, any[]> = instance.__middlewares || {};

            for (const { method, path, handlerName } of routes) {
                const routeHandler = instance[handlerName].bind(instance);
                const middlewares = [
                    ...classMiddlewares,
                    ...(methodMiddlewares[handlerName] || []),
                ];
                (router as any)[method](prefix + path, ...middlewares, routeHandler);
            }
        }

        return router;
    }
}
