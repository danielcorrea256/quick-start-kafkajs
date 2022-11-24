
Run the zookeeper server
``` 
<kafka-dir>/bin/zookeeper-server-start.sh <kafka-dir>/config/zookeeper.properties 
```

Run the kafka server
```
<kafka-dir>/bin/kafka-server-start.sh <kafka-dir>/config/server.properties
```

Create a topic named ```test-topic``` running on ```localhost:9092```
```
<kafka-dir>/bin/kafka-topics.sh --create --topic test-topic --bootstrap-server localhost:9092
```

Run the javascript file
```
node index.js
```

Now you should be looking this in the console
```
{ value: 'Hello KafkaJS user!' }
```

To send messages from the console(the index.js file will be listening) use the following command and start sending messages
```
bin/kafka-console-producer.sh --topic test-topic --bootstrap-server localhost:9092
```