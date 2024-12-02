import { Logs } from "../models/log.model.js";


export const saveLogsInDatabase = async(log)=>{
    try {
        const newlog = new Logs({
            server_ip:log.server_ip,
            requested_page:log.requested_page
        })

        await newlog.save()

        console.log(`Log from ${log.server_ip} save successfully`);
    } catch (error) {
        console.log(error);
    }
}