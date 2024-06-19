# NextFire

# Setup Instructions

1. Install the packat
```bash
npm install nextfire
```

2. Generate a firebase service account key and download it as a json file.
Store it in the root of your project as "firebase-service-account.json"

3. Generate a firebase web app config file and download it as a json file.
Store it in the root of your project as "firebase-app-config.json"

4. Create a file called "middleware.js" in the root of your project and add the following code:

```javascript
import NextFireMiddleware from "@/nextfire/middleware/nextfire-middleware";

const nextFireMiddlewareOptions = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return NextFireMiddleware({ req, nextFireMiddlewareOptions });
}
```

5. Thats it! Try opening the home page of your app and it should ask for authentication.