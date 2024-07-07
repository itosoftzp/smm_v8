FROM tomcat:9.0.89-jre11

# variable env untuk jalankan joget
ENV JAVA_OPTS="-Xmx768M -Dgit.disabled=true -Dfile.encoding=UTF-8 -Dwflow.home=./wflow/ -javaagent:./wflow/wflow-cluster.jar -javaagent:./wflow/aspectjweaver-1.9.22.jar -javaagent:./wflow/glowroot/glowroot.jar"

# ambil yg dibutuhkan untuk menjalankan joget,berada dalam wflow
COPY ./wflow /usr/local/tomcat/wflow

# Copy *.war ke direktori Tomcat webapps
COPY ./apache-tomcat-9.0.86/webapps/jw.war /usr/local/tomcat/webapps/

# buka port container
EXPOSE 8080

# jalankan Tomcat
CMD ["catalina.sh", "run"]
