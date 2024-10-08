const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./news.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

// const host = "10.11.68.19";
const host = "127.0.0.1";
const port = 50052

// const client = new NewsService(
//   `${host}:${port}`,
//   grpc.credentials.createInsecure()
// );

const client = new NewsService(
  "0.0.0.0:50052",
  grpc.credentials.createInsecure()
);

module.exports = client;