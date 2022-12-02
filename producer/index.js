const http = require('http');
const fs = require('fs');
const { Kafka } = require('kafkajs')

const broker = process.env.BROKER || 'localhost:9092'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [broker],
 })

const producer = kafka.producer()
 

async function sendMessage(message) {
    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: message },
    ],
    })
    
    await producer.disconnect()
}

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(req, res) {  
        let reqUrl = new URL("http://whatever.com" + req.url)
        console.log(req.url)
        if(req.url.substring(0, 6) === '/kafka'){
            res.writeHead(200);
            sendMessage(reqUrl.searchParams.get('message'))
            res.end('kafka');
            console.log("Message sended.")
        } else {
            res.writeHeader(200, {"Content-Type": "text/html"});  
            res.write(html);  
            res.end();  
        }
    }).listen(8080, () => console.log("running producer..."));
});
