import { registerDoTopicsPayload, topicResPayload, TopicType } from "@/models"
import registerTopics from "@/pages/registerTopics"
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
        
    },
    updateTopic(payload: topicResPayload){
        return axiosClient.put("/rest/topic", payload)
    },
    deleteTopic(payload: number|string){
        return axiosClient.delete(`/rest/topic/${payload}`)
    },
    searchTopic(payload: string){
        return axiosClient.get(`/rest/instuctors/find`, {data:payload})
    },
    registerDoTopics(payload:registerDoTopicsPayload){
        return  axiosClient.post(`/rest/join`,payload)
    }
}