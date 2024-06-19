# NextFireJS

# Setup Instructions

1. Install the packat
```bash
npm install nextfirejs
```

2. Generate a firebase service account key and download it as a json file.
Store it in the root of your project as "firebase-service-account.json"

3. Generate a firebase web app config file and download it as a json file.
Store it in the root of your project as "firebase-app-config.json"

4. Create a file called "middleware.js" in the root of your project and add the following code:

```javascript
import NextFireJSMiddleware from "@/nextfirejs/middleware/nextfirejs-middleware";

const nextFireJSMiddlewareOptions = {
    allowRule: "^\/_next\/.*"
}

export default function middleware(req) {
    return NextFireJSMiddleware({ req, nextFireJSMiddlewareOptions });
}
```

5. Thats it! Try opening the home page of your app and it should ask for authentication.