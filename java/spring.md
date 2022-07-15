From doc:
https://docs.spring.io/spring-framework/docs/current/reference/html/overview.html#overview

Spring Framework is where it started.
Divided into modules.
Core is configuration & dependency injection

Learn Spring

Setup & pre-work:
```
$ git clone https://github.com/eugenp/learn-spring.git
$ cd learn-spring
$ git checkout module2
```
Maven:
```
$ mvn clean install
$ mvn clean install -Dmaven.test.skip=true
$ mvn spring-boot:run
```
Module 1

Why Spring?
Can refer to the core or the whole ecosystem
Originally a response to the complexity of Java EE
Remove complexity
Not all-or-nothing. Can pick & choose
Plumbing

Core:
- configuration
- dep injection
- Spring Expression Language (SpEI)
- Testing

Spring MVC:
- REST
- Servlet
- Web Flex (Netty)

Spring Persistence:
- some parts of core
- data, transactions
- JDBC
- DAO
- Spring Data

Spring Security:
- Can use in any Servlet, even non-Spring

Spring Cloud:
- microservices
- distributed

Spring Boot: reduce the complexity of the growing ecosystem
- opinionated defaults
- a layer of abstraction on Spring
- an extension with opinionated defaults
- reduce boilerplate
- easy to start
- intelligently backs off
- hides the internals to simplify (good & bad)

Boot featuers:
- Boot starters
- default config
- Actuators


Why DI?
- Separation of responsibilities
- A loosely coupled system
- Helpful for testing

DI Types: field, constructor, or setter 
(I prefer constructor)

DI is part of Inversion of Control (IoC) Principle
Dependency ~= Bean

@Configuration - on class that has methods which provide beans. Marks the class that it should be scanned.
@Bean - on methods within a Configuration class to show they provide a bean. The method name is the bean name
"Context" is the whole set of beans, many come with Spring already
Alternatively, can mark a class as a bean and have Spring discover it
@Component - Marks classes to be scanned by Spring during bootstrap
Stereotypes are other types of @Component-like annotations:
    @Repository
    @Service

@SpringBootApplication marks that the project should be scanned
- Can specify only certain packages with annotation option scanBasePackages

Bean lifecycle:
1. Initialization
2. Usage
3. Destroy

To have methods execute within the lifecycle
@PostConstruct - method annotation, runs after #1
    But adds spring-related stuff into the class
@Bean(initMethod = "initialization") - option on @Bean to run initialization method
    This keeps the Spring logic out of the class
There's also InitializingBean but covered later


Constructor Injection: default, simple, clean. No extra annotation needed (other than the class annotation)
@Autowired - Setter or Field Injection

Multiple beans for same impl require either @Primary or @Qualifier
@Qualifier("someName")

@Scope for lifecycle scopes: https://www.baeldung.com/spring-bean-scopes
- singleton: default, a single object is created
    @Scope("singleton") or @Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
- prototype: a new object is created each time it's requested
    @Scope("prototype") or @Scope(value = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
- request, session, application, websocket: used for web applications

BeanPostProcessor: modify bean or execute code after initialization
executed after EVERY bean
@Component public class MyBeanPostProcessor implements BeanPostProcessor {...}

Similarly, BeanFactoryPostProcessor allows us to read the configuration metadata of a bean and potentially modify it before the container has actually instantiated any of the beans.
Example:
    BeanDefinition bd = beanFactory.getBeanDefinition("beanA"); 
    bd.getPropertyValues().add("foo", "bar");

BeanFactoryPostProcessor invoked, then invoke, then BeanPostProcessor

Or as a Bean:
@Bean public static MyBeanPostProcessor beanPostProcessor() {...}
notice it's static because it's invoked before inits

Application Context is a core part of the Spring Framework. 
It represents the IoC container and is responsible for instantiating, configuring and assembling beans.

Get the context via: @Autowired, or implementing ApplicationContextAware

@PostConstruct - method annotation, executed after bean is instantiated
@PreDestroy - method, executed when context is beind destroyed

---
Config Sources: Property files, YAML, Env Variables, CLI args
propertyName=propertyValue
External configuration 
Runtime, not compile time!

@Value - to inject the values
`@Value("${project.prefix}")` // Note, you can type "${}" and use autocomplete within brackets


Beans can be restricted to a profile using @Profile
@Profile("dev") - class annotation; default is "default"
profile is set in application.properties file with spring.profiles.active (it has autocomplete)

```
2020-11-16 18:30:30.018  INFO 14990 --- [           main] com.baeldung.ls.LsApp                    : The following profiles are active: dev
```
More property files can be specified using @PropertySource on the configuration classes
@PropertySource("classpath:additional.properties")
@Configuration

PropertySourcesPlaceholderConfigurer is the actual class that goes through and replaces ${your.key} with the real value

---
IntelliJ Shortcuts:
Run last: Ctrl+R
Debug last: Ctrl+D
Run from cursor: Ctrl+Shift+R
Debug from cursor: Ctrl+Shift+D

---

Testing

Integration tests give easier peace of mind
Unit tests are faster and improve design

@SpringJUnitConfig - integration of JUnit + Spring

Create a single "empty" test that makes sure the Spring is being bootstrapped

The test config needs to be configured to know what classes to scan for the context


TestConfig.java defines what classes to scan for tests
```
@Configuration
@ComponentScan("com.baeldung.ls")
public class TestConfig {
}
```
// Now we point our test to config
``@SpringJUnitConfig(classes = TestConfig.class)

To specify properties just for testing:
``@TestPropertySource(locations = "classpath:test.properties")

When running tests, TestProperties override regular Properties (as you would expect)

---

Boot is auto-configured and intelligently backs off
It uses a lot of @Conditional annotations to know when to not apply autos, allows config based on conditions
The Boot beans check if a bean of that class is already defined. If there's already one of that Class, then it backs off.

---
# Spring in Action, 5th Ed, Spring 5.0

```
$ mvn clean install spring-boot:run
# omit clean for faster, spring-boot:start to start in background, spring-boot:stop to stop
$ gradle bootRun
```
Couldn't find main:
```
pom.xml
<properties>
        <start-class>com.valbaca.tacos.TacoCloudApplication</start-class>
</properties>
```
To generate mvnw and mvnw.cmd: `mvn -N wrapper:wrapper`

Unit tests are now simpler than in the book, just:

```
import org.junit.jupiter.api.Test; // <-- IMPORTANT
@SpringBootTest
public MyTest {
    @Test
    void testThing() {...}
}
```

The @Test is important b/c it changed between versions from JUnit4 (org.junit.Test) and JUnit5 (org.junit.jupiter.api.Test)

Dockerfile:
```
FROM openjdk:8-jdk-alpine
ENV SPRING_PROFILES_ACTIVE docker
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java",\
            "-Djava.security.egd=file:/dev/./urandom",\
            "-jar",\
            "/app.jar"]
```