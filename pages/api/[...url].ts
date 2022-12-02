import type { NextApiResponse, NextApiRequest } from "next";
import httpProxy from "http-proxy";

export const config = {
    api:{
        bodyParser: false
    }
}

const proxy = httpProxy.createProxyServer();
export default function handler(req:NextApiRequest, res:NextApiResponse){
    //dont send cookies
    // req.headers.cookies = ''
    // proxy.web(req, res,{
    //     target:"",
    //     changeOrigin:true,
    //     selfHandleResponse:false
    // })
}