import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:'logs-reading-app',
    brokers:['kafka:9092']
})


const producer = kafka.producer()
const consumer = kafka.consumer({groupId:'logs-reading-group'})

export { producer, consumer }