FROM nginx:1.19.10

ARG DOCKER_FILE_PATH
ENV NGINX_ENTRYPOINT_QUIET_LOGS=true


RUN chown -R 101:101 /var/cache/nginx \
 && chmod -R g+w /var/cache/nginx \
 && touch /var/run/nginx.pid \
 && chown -R 101:101 /var/run/nginx.pid \
 && ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log


COPY $DOCKER_FILE_PATH/default.conf /etc/nginx/conf.d/default.conf
COPY $DOCKER_FILE_PATH/nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
RUN chown -R 101:101 /usr/share/nginx/html
COPY $DOCKER_FILE_PATH/entrypoint.sh /entrypoint.sh
RUN chown -R 101:101 /entrypoint.sh
RUN chmod 777 /entrypoint.sh

USER 101

EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
