FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["passwordmanagerapi/PasswordManagerApi.csproj", "passwordmanagerapi/"]
RUN dotnet restore "passwordmanagerapi/PasswordManagerApi.csproj"

COPY passwordmanagerapi/ passwordmanagerapi/
WORKDIR /src/passwordmanagerapi

RUN dotnet publish "PasswordManagerApi.csproj" -c Release -o /app/publish

FROM --platform=$TARGETPLATFORM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet", "PasswordManagerApi.dll" ]
