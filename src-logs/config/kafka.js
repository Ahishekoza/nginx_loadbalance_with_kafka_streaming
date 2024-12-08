import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'logs-reading-app',
  brokers: ['kafka1:9092', 'kafka2:9092'],
});

const producer = kafka.producer();

const consumer1 = kafka.consumer({ groupId: 'logs-to-database-group' }); // First consumer group
const consumer2 = kafka.consumer({ groupId: 'logs-processing-group' }); // Second consumer group
const consumer3 = kafka.consumer({ groupId: 'logs-display-processed-log-group' });
export { producer, consumer1, consumer2 , consumer3 };
