const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = '../hello.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

const client = new helloProto.Hello(
    'localhost:50051',
    grpc.credentials.createInsecure()
);

function getUrl(message) {
    const request = { message: message };
    
    client.GetServerResponse(request, (error, response) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Server Response:', response);
        }
    });
}

getUrl('Hello Server, you there?');