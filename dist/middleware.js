import FirebaseNextJSMiddleware from "nextfirejs/middleware/nextfirejs-middleware";

const nextFireJSMiddlewareOptions = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return FirebaseNextJSMiddleware({ req, nextFireJSMiddlewareOptions });
}