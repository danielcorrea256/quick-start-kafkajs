const http = require('http');
const fs = require('fs');
const url = require('url');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
 })

const consumer = kafka.consumer({ groupId: 'test-group' }) 

async function connectConsumer() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(message)
        },
    })
}

fs.readFile('./index.html', async function (err, html) {

    await connectConsumer()

    if (err) {
        throw err; 
    }       
    http.createServer(async function(req, res) {  
        const urlRequest = new URL(req.url, `http://${req.headers.host}`)
        res.write("he")
        console.log("xd")
        res.write("llo")
        res.end();  
    
    }).listen(8081, () => console.log("running consumer..."));
});