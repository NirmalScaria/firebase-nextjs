import NextFireJSMiddleware from "nextfirejs/middleware/nextfirejs-middleware";

const nextFireJSMiddlewareOptions = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return NextFireJSMiddleware({ req, nextFireJSMiddlewareOptions });
}