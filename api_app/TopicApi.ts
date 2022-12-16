import { topicResPayload, TopicType } from "@/models"
import axiosClient from "./AxiosClient"


export const TopicApi = {
    getTopic(){
        return axiosClient.get<TopicType[]>("/rest/topic")
    },
    registerTopics(payload: topicResPayload){
        return axiosClient.post("/rest/topic", payload)
    },
    changeStatus(payload:{status:number, id:number}){
        return axiosClient.put("/rest/topic/status", payload)
    },
    getTopicDetail(){
        
    }
}