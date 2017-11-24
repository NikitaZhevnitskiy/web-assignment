## How to run 

#### Docker  
* build (please build first -> recommend, because Im using docker-compose version 2)  
`docker-compose build`
* run  
`docker-compose up -d`  
Verify that all nodes up  
`docker-compose ps`  
    // *if api Exits, run again  
    // `docker-compose up -d`  
* stop  
`docker-compose -f docker-compose.yml down --rmi all`  

API port exposed for reason to have access from mobile-client to docker container 

#### Local (optional)
* install  
`npm run setup`  
* start  
`npm run dev` 

### Comments
* All modules auth feature (login/register)  
* API module Tests, WebSockets
in api module, install node_module and run  
`npm run test`  
for test coverage  
`npm run test_coverage` 

* WEB-client module Chat feature implemented with WebSockets
* WEB-client module ajax calls for create item and delete item
* WEB-client module search by string entry for item.title
* WEB-client module search by string entry for item.title

* MOBILE-client module implemented using react-native and redux, for more info check `report Mobile-client` 
* MOBILE-client module search feature

## Reports
#### [Report API](./api/README.md)
#### [Report Web-client](./web-client/README.md)
#### [Report Mobile-client](./mobile/README.md)
#### [Answers on questions](./answers.md)