FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp

COPY target/cart-service-1.0.jar CartService.jar

ENTRYPOINT ["java", "-jar", "CartService.jar"]