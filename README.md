## How to run 

#### Docker  
* build (please build first -> recommend, because Im using docker-compose version 2)  
`docker-compose build`
* run  
`docker-compose up -d`  
* stop  
`docker-compose -f docker-compose.yml down --rmi all`  

API port exposed for reason to have access from mobile-client to docker container 

#### Local (optional)
* install  
`npm run setup`  
* start  
`npm run dev` 

#### Test available for api module
in api module, install node_module and run  
`npm run test`  
for test coverage  
`npm run test_coverage` 


## Reports
#### [Report API](./api/README.md)
#### [Report Web-client](./web-client/README.md)
#### [Report Mobile-client](./mobile/README.md)
#### [Answers on questions](./answers.md)