const http = require('http');
const fs = require('fs');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
 })

const producer = kafka.producer()
 

async function sendMessage() {
    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KafkaJS user!' },
    ],
    })
    
    await producer.disconnect()
}

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(req, res) {  
        if(req.url === '/kafka'){
            res.writeHead(200);
            sendMessage()
            res.end('kafka');
            console.log("Message sended.")
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        }
    }).listen(8080, () => console.log("running producer..."));
});