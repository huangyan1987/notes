Log while working with kotlin; place to store bookmarks and thoughts

Got a Spring web service setup with Elastic Beanstalk

https://stackoverflow.com/questions/60840569/aws-codepipeline-deploy-spring-boot-application-to-elastic-beanstalk

https://aws.amazon.com/blogs/devops/deploying-a-spring-boot-application-on-aws-using-aws-elastic-beanstalk/

Deployment goes:
1. code stored in CodeCommit
2. code built with CodeBuild
3. hosted on Elastic Beanstalk
4. CodePipeline manages steps #1-3

Challenges:
1. (easy) Getting git creds
2. (medium) figuring out the buildspec.yml
3. (easy) getting the service to run on the right port

IntelliJ / Java:

remember, fun main() goes outside a class, if it's in a class, then it's a member function

If fun main() is in a file Thing.kt, then in Java it's: ThingKt.main()

https://kotlinlang.org/docs/java-to-kotlin-interop.html#package-level-functions

All the functions and properties declared in a file app.kt inside a package org.example, including extension functions, are compiled into static methods of a Java class named org.example.AppKt.

To set a custom name to the generated Java class, use the @JvmName annotation:

Maven to Gradle: https://pitcer.github.io/maven-to-gradle-kotlin-dsl/

