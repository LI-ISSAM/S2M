#!/bin/sh
#
# docker run -p 9000:9000 myorg/myapp --server.port=9000
# ${@} = --server.port=9000 # spring boot arguments
# docker run -p 8080:8080 -e "JAVA_OPTS=-Ddebug -Xmx128m" myorg/myapp
# ${JAVA_OPTS} = -Ddebug -Xmx128m
#
# Some steps to accelerate the startup
# Use the spring-context-indexer (link to docs). It’s not going to add much for small apps, but every little helps.
# Don’t use actuators if you can afford not to.
# Use Spring Boot 2.1 and Spring 5.1.
# Fix the location of the Spring Boot config file(s) with spring.config.location (command line argument or System property etc.).
# Switch off JMX - you probably don’t need it in a container - with spring.jmx.enabled=false
# Run the JVM with -noverify. Also consider -XX:TieredStopAtLevel=1 (that will slow down the JIT later at the expense of the saved startup time).
# Use the container memory hints for Java 8: -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap. With Java 11 this is automatic by default.
#
# Your app might not need a full CPU at runtime, but it will need multiple CPUs to start up as quickly as possible 
# (at least 2, 4 are better). If you don’t mind a slower startup you could throttle the CPUs down below 4. 
# If you are forced to start with less than 4 CPUs it might help to set -Dspring.backgroundpreinitializer.ignore=true 
# since it prevents Spring Boot from creating a new thread that it probably won’t be able to use (this works with Spring Boot 2.1.0 and above).
#
exec java ${JAVA_OPTS} -jar /app.jar ${@}