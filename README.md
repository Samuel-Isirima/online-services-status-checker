# online-services-status-checker
Resource Collection : EG pages of website

On this event, fire this action

Config is basicallyy the request you want to send (GET/POST) with the data and the response types you want to capture

Actions can be send notification [mail, sms] or webhook data out

            COLLECTION
            RESOURCE
            REQUEST                                                                         
RESPONSE    RESPONSE    RESPONSE
ACTION      ACTION      ACTION



                ACTION
NOTIFICATION                WEBHOOK

Basic game plan

Each resource, you can set many requests
For each request, you can set many responses (with tags: Warning, bad)
For each response, you can set one action configuration (Notify different channels, send webhook)