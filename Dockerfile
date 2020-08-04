FROM node:14.4-alpine3.11 as builder

ARG REACT_APP_CLOUD_API_URL
ARG REACT_APP_TXLOG_API_URL
ARG REACT_APP_PAYMENTS_API_URL
ARG REACT_APP_GOOGLE_MAP_KEY

RUN apk add --no-cache --virtual .gyp \
        build-base \
        git \
        libc6-compat \
        openssh-client \
        python \
        make \
        g++

RUN apk upgrade libcurl

COPY . /ui
WORKDIR /ui
RUN make deps && make build

FROM nginx:1.11.8-alpine
COPY --from=builder /ui/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]