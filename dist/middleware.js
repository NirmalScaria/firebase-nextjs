import FirebaseNextJSMiddleware from "firebase-nextjs/middleware/firebase-nextjs-middleware";

const options = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return FirebaseNextJSMiddleware({ req, options });
}