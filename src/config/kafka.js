import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId:'grocery-app',
    brokers:['kafka:9092']
})


const producer = kafka.producer()
const consumer = kafka.consumer({groupId:'grocery-group'})

export { producer, consumer }