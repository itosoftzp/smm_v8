#!/bin/sh

export JAVA_OPTS="-Xmx2048M -Dfile.encoding=UTF-8 -Dwflow.home=./wflow/ -javaagent:./wflow/wflow-cluster.jar -javaagent:./wflow/aspectjweaver-1.9.22.jar -javaagent:./wflow/glowroot/glowroot.jar -Dgit.disabled=true"

apache-tomcat-9.0.86/bin/catalina.sh $*
