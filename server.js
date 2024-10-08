const grpc = require("@grpc/grpc-js");
const PROTO_PATH = "./news.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
    keepCase: true, // when set to true, it preserves the original casing of field names and enum values.

    longs: String, // Specifies how "long" numeric types are represented. 

    enums: String, // Speficies how enums are represent. When set to String, enums are represented as strings instead of their numeric values

    defaults: true,

    oneofs: true 
    // Indicates whether or not to include oneof groups in the generated outputs. 
    // A one of group is a set of fields in protobuf message where only one of the fields can be set at a time
}

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

let news = [
  { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" },
  { id: "3", title: "Note 3", body: "Content 3", postImage: "Post image 3" },
  { id: "4", title: "Note 4", body: "Content 4", postImage: "Post image 4" },
];

server.addService(newsProto.NewsService.service, {
  getAllNews: (call, callback) => {
    const newsList = { news: news }
    callback(null, newsList);
  },
  getNews: (call, callback) => {
    const newsId = call.request.id;
    const newsItem = news.find( item => Number(item.id) === Number(newsId));
    callback(null, newsItem)
  },
  addNews: (call, callback) => {
    const newNewsId = (Number(news[news.length - 1].id) + 1).toString()
    let newNews = { ...call.request };
    newNews.id = newNewsId
    news.push(newNews);
    callback(null, newNews);
  },
  editNews: ( call, callback) => {
    const { id, title, body, postImage } = call.request;
    const newsId = id;
  
    console.log("newsId", newsId, typeof newsId)
    const newsItem = news.find( item => Number(item.id) === Number(newsId) );
    newsItem.title = title;
    newsItem.body = body;
    newsItem.postImage = postImage;
    callback(null, newsItem);
  },
  deleteNews: (call, callback) => {
    const newsId = call.request.id;
    news = news.filter( ( { id } ) => Number(id) !== Number(newsId) );
    callback(null, {})
  }
});

const host = "10.11.68.19";
// const host = "127.0.0.1" 
const port =  50052;


server.bindAsync(
  `${host}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if(error) {
        console.log(error)
    }
    console.log(`gRPC server is running at ${host}:${port}`);
    // Calling server.start() is no longer necessary. It can be safely omitted.
  }
);

module.exports = server