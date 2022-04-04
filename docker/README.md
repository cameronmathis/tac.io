# Docker

## Dev

`docker build -f docker/Dockerfile.dev -t tac.io:dev .`

Creates a docker dev image and names it "tac.io:dev".

`docker run -d --rm -p 80:80 tac.io:dev`

Starts a container from the "tac.io:dev" image.
Open [http://localhost/tac.io](http://localhost/tac.io) to view it in the browser.

## Prod

`docker build -f docker/Dockerfile.prod -t tac.io:prod .`

Creates a docker prod image and names it "tac.io:prod".

`docker run -d --rm -p 80:80 tac.io:prod`

Starts a container from the "tac.io:prod" image.
Open [http://localhost/tac.io](http://localhost/tac.io) to view it in the browser.
