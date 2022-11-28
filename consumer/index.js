const http = require('http');
const { Kafka } = require('kafkajs')
const broker = process.env.BROKER || 'localhost:9092'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [broker],
 })

const consumer = kafka.consumer({ groupId: 'test-group' }) 
const messages = []

async function connectConsumer() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            let object = {partition, message}
            messages.push(object)
            console.log(object.message.value.toString())
        },
    })
}

connectConsumer()

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end(messages.reduce((acumulator, current) => acumulator + `${current.partition}:${current.message.value.toString()}\n`, ""))
}

const server = http.createServer(requestListener);
server.listen(8081, () => console.log("consumer running..."));
