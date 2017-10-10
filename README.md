#Yelp Hotel

#### General Information
Application built with Express, Mongoose, and Node. Application provides a hotel review website
where users can upload hotels and leave comments about them. Routes were created with RESTful
routing routies

## Routes
HOTEL ROUTES
```
INDEX   /hotels
NEW     /hotels/new
CREATE  /hotels
SHOW    /hotel/:id
```
Comment ROUTES
```
NEW     hotels/:id/comments/new     GET
CREATE  hotels/:id/comments         POST
```
### 10-10-2017
Planning to add user authenticaiton and expand data base of application
    