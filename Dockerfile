FROM kong:2.0-ubuntu

USER root

RUN apt-get update -y && \
    apt-get install -y git nodejs npm && \
    apt-get clean

#RUN mkdir /app && cd /app
#    git clone https://ucconnect:8GUHEGP4-ux-p9XxPwNM@gitlab.com/ucconnect.devs/i-bank/api-gateway/gateway-log-exporter.git && \
WORKDIR /app
#COPY ../ /
COPY  ./dist /app
COPY ./package.json /app
COPY ./config /app

RUN npm i


USER kong
RUN kong version

CMD cd /
COPY my_wrapper_script.sh /
COPY start_kong.sh /
COPY start_node.sh /
CMD pwd & ls
CMD chmod a+x /my_wrapper_script.sh
CMD chmod a+x /start_kong.sh
CMD chmod a+x /start_node.sh

EXPOSE 8000 8443 8001 8444

STOPSIGNAL SIGQUIT

ENTRYPOINT ["/my_wrapper_script.sh"]




