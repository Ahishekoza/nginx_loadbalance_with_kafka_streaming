import { producer } from "../config/kafka.js";

const sendOrderEvent = async(orderData)=>{
    await producer.connect()
    await producer.send({
        topic:'orders',
        messages:[{value:JSON.stringify(orderData)}]
    })
    await producer.disconnect()

}

export {sendOrderEvent}