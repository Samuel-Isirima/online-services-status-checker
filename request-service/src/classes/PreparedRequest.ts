import { type } from "os";

export interface PreparedRequestInterface 
{
url: string;
type: string;
method: String;
request_id: String;
body_data: Object;
headers_data: Object;
}

class PreparedRequest implements PreparedRequestInterface 
{
    url: string;
    type: string;
    method: String;
    request_id: String;
    body_data: Object;
    headers_data: Object;

    constructor(url: string, type: string, method: String, request_id: String, body_data: Object, headers_data: Object)
    {
        this.url = url;
        this.type = type;
        this.method = method;
        this.request_id = request_id;
        this.body_data = body_data;
        this.headers_data = headers_data;
    }

    public send()
    {
       //First create the body data
       let bodyData = this.body_data;
       let headersData = this.headers_data;
       //Now send the request
         axios({
              method: this.method,
              url: this.url,
              data: bodyData,
              headers: headersData
         })
    }
}