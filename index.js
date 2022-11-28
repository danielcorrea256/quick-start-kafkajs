const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

async function run() {
    await producer.connect()
    await producer.send({
    topic: 'test-topic',
    messages: [
        { value: 'Hello KafkaJS user!' },
    ],
    })
    
    await producer.disconnect()
    
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: false })
    
    await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
        value: message.value.toString(),
        })
    },
    })
}

run().catch(console.error)
console.log("ok")

async function xd() {
    for (let i = 0; i < 10; i++) {
        await producer.connect()
        await producer.send({
            topic: 'test-topic',
            key: "partido argentina",
            messages: [
                { value: `Argentina: ${i} Mexico: 0`}
            ]
        })
        await producer.disconnect()
        await producer.connect()
        
        await producer.send({
            topic: 'test-topic',
            key: "partido spain",
            messages: [
                { value: `spain: ${i} germany: 0`}
            ]
        })

        await producer.disconnect()
    }

} 

xd()