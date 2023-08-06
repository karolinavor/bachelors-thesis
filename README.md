# BachelorsThesis


## Install technologies

Download and install Rider or Visual Studio

https://www.jetbrains.com/rider/

https://visualstudio.microsoft.com/

Download and install NodeJS & npm

https://nodejs.org/en/download

Install .NET Core 7 SDK

https://dotnet.microsoft.com/en-us/download/dotnet/7.0

On MacOS Silicon run command

MacOS ARM64: ```sudo ln -s /usr/local/share/dotnet/x64/dotnet /usr/local/bin/```

Install Dotnet Entity Framework

MacOS ARM64: ```dotnet tool install dotnet-ef --global -a arm64```
Windows: dotnet ```tool install --global dotnet-ef --version 7.0.9```

If you get error while installing Dotnet EF, try this command:

Windows: ```dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org```

## Build solution

Open .sln file in Rider/Visual Studio and build. Application will automatically download frontend and backend packages.

## Create database

Before you start using application you need to create database.

```
dotnet ef migrations add InitialCreate 
dotnet ef database update
```

## Run project

Start application in Rider/Visual Studio by clicking Run button. Application will open in browser on port 44424.

## Available on the internet

https://bachelorsthesis.azurewebsites.net