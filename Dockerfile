FROM kong:2.0-ubuntu

USER root

ENV host='localhost'
ENV port=5672

RUN apt-get update -y && \
    apt-get install -y sudo nodejs curl npm && \
    apt-get clean && \
    npm cache clean -f && npm install -g n && sudo n stable && sudo n latest

ENV AMQP_HOST='localhost'
ENV AMQP_PORT=5972

WORKDIR /app

COPY ./dist /app/dist
COPY ./package.json /app
COPY ./config /app/config

RUN npm i

USER kong
RUN kong version

COPY ./my_wrapper_script.sh /app
COPY ./start_kong.sh /app
COPY ./start_node.sh /app
CMD pwd & ls
CMD chmod a+x /app/my_wrapper_script.sh
CMD chmod a+x /app/start_kong.sh
CMD chmod a+x /app/start_node.sh

EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGQUIT

ENTRYPOINT ["sh", "/app/my_wrapper_script.sh"]




