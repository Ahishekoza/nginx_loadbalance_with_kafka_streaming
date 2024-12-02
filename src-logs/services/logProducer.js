import { producer } from '../config/kafka.js'

const sendLogsToDatabase = async(log) =>{
    await producer.connect()
    await producer.send({
        topic:'web_logs',
        messages:[{value:JSON.stringify(log)}]
    })

}


export { sendLogsToDatabase}