# NODE-GOOGLE

# Application Description
Demonstrates using google authentication for application access, and integration with passport using passport-google-oauth. Once that is complete, the googleapis library is used to access calendar services
 

##  Running locally

### Start Mongodb
brew install mongodb

to run

1. create a mongod.conf file

```
#mongod.conf

#logs
logpath=/Users/dhenton/mongo_data/logs/mongolog.log
logappend=true


#path to database
dbpath=/Users/dhenton/mongo_data/db
```

run mongod -f /Users/dhenton/mongo_data/mongod.conf
or mongod --dbpath=/Users/dhenton/mongo_data/db

### Start node server
node server.js (at root directory) http://localhost:3500

