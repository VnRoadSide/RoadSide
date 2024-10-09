FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:8.0-jammy AS publish
ARG configuration=Release

WORKDIR /src
COPY src .

ARG TARGETOS
ARG TARGETARCH

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

RUN dotnet publish RoadSide.Web -c $configuration --os=$TARGETOS --arch=$TARGETARCH --property:PublishDir=/src/published

# =====================================================================================

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
RUN apt update && apt upgrade -y && apt install -y libicu-dev

USER app
WORKDIR /app
COPY --from=publish /src/published .

EXPOSE 8080

ENTRYPOINT [ "dotnet", "RoadSide.Web.dll" ]