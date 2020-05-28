FROM kong:2.0
MAINTAINER UCConnect<support@ucconnect.co.th>

USER root

ENV AMQP_HOST='bf39e1fbcef4'
ENV AMQP_PORT=5672
ENV NODE_ENV='production'

WORKDIR /app

COPY ./dist /app/dist
COPY ./package.json /app
COPY ./config /app/config
COPY ./my_wrapper_script.sh /app
COPY ./start_kong.sh /app
COPY ./start_node.sh /app


CMD chmod a+x /app/my_wrapper_script.sh
CMD chmod a+x /app/start_kong.sh
CMD chmod a+x /app/start_node.sh

RUN apk add --update npm && \
    npm install -g n && \
    npm cache clean -f && \
    n stable && \
    npm i

USER kong
RUN kong version
EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGQUIT

ENTRYPOINT ["sh", "/app/my_wrapper_script.sh"]




