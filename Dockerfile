FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR "/app/"
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR "/src"
COPY ["Weather.API.csproj", "./Weather.API/"]
RUN dotnet restore "./Weather.API/Weather.API.csproj"
WORKDIR "/src/Weather.API/"
COPY . .
RUN dotnet build "./Weather.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./Weather.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR "/app/"
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Weather.API.dll"]