# ── Build ────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app
COPY . .

RUN chmod +x gradlew
RUN ./gradlew clean bootJar -x test

# ── Runtime ──────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre

WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Render injecte la variable PORT ; l'application l'utilise via server.port.
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
