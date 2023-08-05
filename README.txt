# BachelorsThesis

## Install technologies

Download and install NodeJS & npm
https://nodejs.org/en/download
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Install .NET Core

https://dotnet.microsoft.com/en-us/download

## Create database

Before you start using application you need to create database.

```
dotnet ef migrations add InitialCreate 
dotnet ef database update
```

## Run project

Open .sln file in Rider/Visual Studio and click run button to start application. Application will automatically download frontend and backend packeges and then it will open in browser on port 44424.