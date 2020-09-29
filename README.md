# apollo-federation-server-example

apollo-federation-server-example
yarn install
yarn dev => "dev": "concurrently -k yarn:dev:*",

oncurrently: We can run multiple commands at the same time using this package. It also has support for shortened commands with wildcards.

"dev:gateway": "wait-on tcp:4001 tcp:4002 tcp:4003 tcp:4004 && nodemon -r dotenv/config --exec babel-node src/index.js".

wait-on: It would be a good idea to wait and make sure that the implementing services' ports are available before starting the gateway API, so we'll use this package for that.

you must have redis in your machine