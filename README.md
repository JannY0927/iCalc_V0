# Start
git clone  [https://github.com/JannY0927/iCalc_V0.git](https://github.com/JannY0927/iCalc_V0.git)

# Run:
run start.bat

open browser  [http://localhost:8080/](http://localhost:8080/)

# Compile steps:
mvn compile

mvnw spring-boot:run

open browser  [http://localhost:8080/](http://localhost:8080/)

# kill
kill 8080 port if need it

netstat -ano | findstr 8080

taskkill /F /PID
