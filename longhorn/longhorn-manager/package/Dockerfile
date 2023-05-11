ARG BUILD_PLATFORM=amd64
FROM ${BUILD_PLATFORM}/ubuntu

RUN apt-get update
RUN apt-get -y install curl nfs-client iproute2 bind9-utils telnet \
              zip unzip e2fsprogs xfsprogs cifs-utils iputils-arping iputils-clockdiff iputils-ping iputils-tracepath && \
    rm -rf /var/cache/apt/*

COPY bin package/launch-manager package/nsmounter /usr/local/sbin/

VOLUME /usr/local/sbin
EXPOSE 9500
CMD ["launch-manager"]
