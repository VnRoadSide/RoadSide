FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS publish
ARG configuration=Release

WORKDIR /src
COPY src .

ARG TARGETOS
ARG TARGETARCH
RUN dotnet publish RoadSide.Web -c $configuration --os=$TARGETOS --arch=$TARGETARCH --property:PublishDir=/src/published

# =====================================================================================

FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy-chiseled AS runtime
WORKDIR /app
COPY --from=publish /src/published .

EXPOSE 8080

ENTRYPOINT [ "dotnet", "RoadSide.Web.dll" ]