# Answers (Discussion)
## 1. Hva er noen fordeler og ulemper ved å benytte en stack bygget på kun JavaScript?   
`Advantages`   
There several advantages using only JavaScript in build stack. 
Developers can work in several layers of build stack, which make them universal.
JavaScript is the most famous language. Companies, using JS build stack, can
find or exchange engineer faster, which reduce costs. 
Most of development tools are free, which is just awesome. 
Another important thing is fast data transfer. 
All technologies in JS build stack works with the same data processing (use JSON).
There are plenty of frameworks, libraries, plugins for any cases. 
The most popular APIs have JS client. Another advantage is 
that development process can be faster because huge community 
and plenty of already have done solutions (code re-usage). 
Most of modern JS technologies are cloud-native, 
which make maintenance, deploy and support easier. 
It is also easier to GET STARTED with JS build stack, there are many free resources for it.  
`Disadvantages`  
Backwards compatibility and limitations for technologies in one stack. 
Mainstream of popular technologies change fast. Bright example of these 2 disadvantages are Angular.
Performance of MongoDB general is lower than Postgres or MySQL. 
Developers tied to one programming language. Huge amount of library can be found to solving one exact problem, 
sometimes it is difficult to find good quality library.  
  
## 2. Hva er et (web-)API, og hva er noen fordeler og ulemper ved å lage et? Når bør man ikke lage et API?  
API is Application Programming Interface. It is documented way for one application to communicate with another. 
A Web API communicate through REQUESTS & RESPONSES. There are two famous approaches: 
* REST (Representational State Transfer)  
An architectural style for managing state information. 
Following constraints [Hypermedia](https://en.wikipedia.org/wiki/Hypermedia) and [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) 
It  focuses on resource-based (or data-based) operations and inherits its operations (GET, PUT, POST, DELETE) from HTTP.
* SOAP  
A protocol specification for transfer structured information. XML-based messaging. 
It has set of strict rules for implementation of this approach.    
  
`Advantages`  
Web api is a simple data-processing solution for communication between systems, applications, web services.
Separation between client and server which improve system flexibility. Web APIs can be written with different programming language and use different platforms, 
 APIs are independent of the type of platform or language.  
`Disadvantages`  
There are many different implementations of APIs available, so many different implementation ways.  
It's difficult to tell what really is "right". The availability & response time of application are dependent on the availability and architecture style of the APIs it use. 
Solution is to build Responsive, Resilient, Elastic, Message Driven APIs. One of the mainstream's solution is 
[Reactive manifesto](http://www.reactivemanifesto.org/), requires knowledge in different fields. 

When you should not build API. The first case when your application does not provide access to its resources.
The second case is transfer or analyze streaming data.

## 3. Hva er noen fordeler og ulemper ved å sende et token (som JSON Web Token) via en HTTPheader (som Authorization) kontra å bruke en Cookie?
Token-based authentication is stateless, server does not need to keep a record.
Cookie based authentication is stateful, which means that session must be kept both server and client-side.
Token contain all required data for validation and user info: user_id, role, expire date, etc... 
Back-end systems with token-based authentication generate token on successful login and that incoming tokens are valid.
Token management across different domains with CORS is trivial comparing with managing cookies with cross domain.
Token-based authentication has lower performance than cookie-based because during the validation process, back-end system 
has to query database. Token-based authentication is easy to implement for services that do not have a concept of a cookie store: mobile clients, IoT.
The size of Jwt can be big depends on amount of claims inside, that can affect performance on each call. 
Common question also is where to store token. There are several options: 
local storage, cookie(limited with 4Kb) and sessionStorage(clear it after browser closed).
If token stored in local/session storage, than it won't work across domains, which makes token-based auth secured.
Additional complexity, If you store confidential info in token it should be encrypted. Also there are issue of how to deactivate token (make token invalid) after logout, because the token is still valid. 
One of the solutions could be retention policy (set expiration date for token as a claim inside token)   
 

## 4. Hva er hensikten med REpresentational State Transfer (REST)? Hva er noen fordeler og ulemper med å implementere nivå 2 og 3 av REST i Richardson Maturity Model?
The answer is in the name of REST abbreviation. Its architectural style for building communication via HTTP between server-client, where the client can be another server or service(web-services, micro-service, etc).
In REST, producers and consumers are decoupled, in server/client model it means that nodes interact with each other in complex ways without the client knowing anything beforehand about the server and the resources it hosts.
The REST purposes:  
1) Define resources by a identifier (URI)
2) For resources manipulation using a common set of verbs (HTTP verbs)
3) Resource representation depends on request (text, json, xml, etc...)
4) Provide transfer for state of object and representation of this state
5) Representing relationship between resource and its representation
6) Resource discovery (lvl3)

Advantages and disadvantages of implementing lvl2 and lvl3 of Richardson Maturity Model.  
`Advantages:`  
Leonard Richardson defined the principal elements of a REST approach into three steps (levels).  
Level 0 is use http for state transfer.  
Level 1 is introducing resources to several endpoints with semantic aggregation. 
Level 2 is using HTTP verbs to separate action logic to resource. 
HTTP is oriented around verbs and resources, REST uses HTTP verbs for lookups should use GET(defined as a safe operation) requests and PUT, POST, 
and DELETE requests should be used for mutation, creation, and deletion. At this stage client also can use caching and get response code to understand what actually happened.
Level 3 is using HATEOAS (Hypertext As The Engine Of Application State). Its introduces discoverability, it contain additional information in server response, 
which helps to client understand state representations and get hints about future steps. 
There are several benefits such as: Allows the server to change URI scheme without breaking clients, 
It helps client developers explore api(discovery) and server team can advertise new features(discovery).  
`Disadvantages:`  
The biggest disadvantage of level 2 & 3 is that REST by itself is a standard its architectural style - The implementations of its style could be so different and we can only follow best practises of it.
How to find best practises of REST implementation this is not trivial problem, because nobody can agree on what all the methods, payloads, and response codes really mean.
Implementing of Level 2 is that The REST vocabulary is not fully supported, web browsers could have limited support for PUT or DELETE

## 5. Hva er hensikten med å automatisere testing av en fullstack webapplikasjon? Hvis du måtte velge mellom å skrive unit-tester, integrasjonstester, eller end-to-end-tester, hvilken type test ville du valgt? Hvorfor?
The purpose of test automation is to provide fast feedback to developers about is software working correct, robust, stable. Enable team run faster, usually several people work on different parts of project.
It helps to find weak points on early stages of development. Its support software quality protection and reduce costs in long-term, 
because companies pays for each working hour, including bug -hunting, -fixing. I would chose to write all tests unit, integrational and e2e.
A type of tests are doing the same job, just with different scale. In unit testing its small unit: class, method. 
In integrational tests its test against subsystem, which can be also isolated. In e2e is testing against deployed system.  
Different type of testing give feedback to developers on different scale. I work mostly with bottom-up, 
because during my study I had to build many different applications. When you start from scratch, you build your system from bottom, 
starts with small units, test them and keep building on top of it.  

## 6.Hva er fordeler og ulemper ved å bruke WebSockets? Når bør man ikke bruke dem? 
WebSockets is a new W3C JavaScript API and protocol for two-way communication over the Internet. 
The advantage is low-latency bidirectional data interchanges. Allows push messages from server side. Provide opportunity to build real-time, time-sensitive applications.
This protocol is faster than HTTP, because in HTTP client must request documents from a server and wait for the document to be sent before it can displayed. 
With WebSockets allows to send and receive data immediately using fixed data formats: text, binary arrays, or blobs.   
`Advantages` short: Duplex communication, fast, increase client/server efficiency, uses TCP.  
`Disadvantages`:  
There are still several proxies and transparent proxies not supporting WebSockets. Browser must be fully HTML5 compliant.    
`When to use`:
WebSockets could be used for long-term, two-way communication is useful such as:
online games, social network notifications, real-time displays of stock and weather information, and other timely data.
## Sources
[Quora](https://www.quora.com/What-are-the-pros-and-cons-of-MEAN-javascript-stack-vs-LAMP-stack)  
[Altexsoft](https://www.altexsoft.com/blog/engineering/the-good-and-the-bad-of-javascript-full-stack-development/)
[BBVA](https://bbvaopen4u.com/en/actualidad/rest-api-what-it-and-what-are-its-advantages-project-development)  
[Martin Fawler](https://martinfowler.com/articles/richardsonMaturityModel.html)

Login design  
https://serverless-stack.com/chapters/create-a-login-page.html 