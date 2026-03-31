# Docker

## Dev

`docker build -f docker/Dockerfile.dev -t tac.io:dev .`

Creates a docker dev image and names it "tac.io:dev".

`docker run -d --rm -p 80:80 --env-file .env tac.io:dev`

Starts a container from the "tac.io:dev" image, loading Firebase config from a local `.env` file.
Copy `.env.example` to `.env` and fill in the values before running.
Open [http://localhost/tac.io](http://localhost/tac.io) to view it in the browser.

## Prod

`docker build --build-arg VITE_FIREBASE_API_KEY=<key> ... -f docker/Dockerfile.prod -t tac.io:prod .`

Creates a docker prod image and names it "tac.io:prod".
All `VITE_FIREBASE_*` build args (see `.env.example`) must be supplied at build time so Vite can embed them into the static bundle.

`docker run -d --rm -p 80:80 tac.io:prod`

Starts a container from the "tac.io:prod" image.
Open [http://localhost/tac.io](http://localhost/tac.io) to view it in the browser.
