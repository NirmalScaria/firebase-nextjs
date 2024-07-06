import FirebaseNextJSMiddleware from "firebase-nextjs/middleware/firebase-nextjs-middleware";

const nextFireJSMiddlewareOptions = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return FirebaseNextJSMiddleware({ req, nextFireJSMiddlewareOptions });
}