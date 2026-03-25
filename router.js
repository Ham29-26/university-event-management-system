export default class EventsRouter {
    constructor() {
        this.routes = [];
        this.middleware = [];
    }

    register(method, pattern, handler, ...middleware) {
        if(typeof pattern == "string") {
            pattern = new URLPattern({ pathname: pattern });
        }
        this.routes.push({ method, pattern, handler, middleware });
    }

    get(...args) {
        this.register("GET", ...args);
    }

    post(...args) {
        this.register("POST", ...args);
    }

    use(middlewareFunction) {
        this.middleware.push(middlewareFunction);
    }

    chain(ctx, middleware, handler) {
        if(middleware.length == 0) return handler(ctx);
        const [nextMwFunction, ...remainingMwFunctions] = middleware;
        const next = (ctx) => { return this.chain(ctx, remainingMwFunctions, handler) };
        return nextMwFunction({...ctx}, next);
    }

    handle(ctx) {
        const { request } = ctx;
        const route = this.routes.find(({ method, pattern }) => {
            return request.method == method && pattern.test(request.url);
        });
        const middleware = [...this.middleware, ...route.middleware];
        return this.chain(ctx, middleware, route.handler);
    }
}