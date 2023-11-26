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
For each request, you can set many responses (with tags: Warning, bad) [Remind users that an important request header is content type: 
xxx-url-form-data, json, etc
]
For each response, you can set one action configuration (Notify different channels, send webhook)

UPDATES AFTER LAUNCH
1. Add webhook support
2. Add phone numbers and emails for notifications (After verification)
2.5 User can select which email and phone or slack channel to be connected for which action
3. Select specific phone numbers and emails for each action


This is how the request service will work:
There will be 10 queues for sending the requests

The requests will be sent in 20mins intervals

From when a request is created, it is noted

Once it's 20 mins time, it is added to one of the request queues, then processed and the 
response processed also; 
There will be response processing queues also

The time when the request was carried out is stored against the request in a table.
When it's 20 mins again, it gets picked up and the process continues



Code change; 
Move structure from microservice architecture to monolith. There's no need for microservices for this product At this moment



MARKETING BITS:
NO DENIAL ATTACK AS REQUESTS ARE SENT MINUTES APART

For the queues, device a method to efficiently share the messages to the queues without overloading one queue