## Report API  
API based on node.js with Express, MongoDB & WebSockets

### Endpoints 
| Path          | Require |Description (onSuccess)|
| ------------- | ------------- |-------------|
| `GET` /hei  |   | return  ack that api is up|
| `POST` /login  |  body: {email,password} | return token|
| `GET`  /me  | header: Authorization:token  | return email from token| 
| `GET`  /users  | header: Authorization:token  | return array with all users| 
| `GET`  /users/list   | header: Authorization:token  | return list of todo-items for specific user(encoded in token)| 
| `PUT`  /users/list   | header: Authorization:token, body: {title,description} | return list of todo-items for specific user(encoded in token)| 
| `DELETE`  /users/list/:item_id  | header: Authorization:token | return info with number of modified rows | 

### Comments
I have done all tasks. To get resource I used GET, to perform an action such as login I used POST. I used PUT to add nested entities to todo-list.
I used DELETE to delete entity with specific id. For sockets implementation I chose chat feature.

### (+)Advantages, (-)disadvantages & improvements
| Status          | Description | Improvement
| ----- | ----- | ----- |
| -/+  |  `GET` users/list return list of concrete user encoded in token. I left it because of user---list relationship is one-to-one | `GET` users/:user_id/list and add pagination|
| -  |  `PUT` users/list return list of concrete user encoded in token. The same as previous example + it returns updated list  | `POST` users/:user_id/list and return only status code. For example 201, item was created|
| -  |  API documentation  | Use swagger next time|
| -  |  Exception handling  | It is huge topic, make more research on How To, read about status codes and rfc 5789, 7230, 7231, 7396 |
| +  |  Project structure  | I could elaborate more with controllers. For example extract CRUD logic of list entity in new controller. The same with repositories |
| +  |  DI has done by env variables (helpful with docker)  | Elaborate more, make it easy for testing. For example connect to another db|
| +  | Docker  | Improve networking and linking between docker containers|
| +  | Test  | Add more test, for WebSockets and Services|
