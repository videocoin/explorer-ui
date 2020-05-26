GOOS?=linux
GOARCH?=amd64
GCP_PROJECT?=videocoin-network
NAME=explorer-ui
VERSION=$$(git describe --abbrev=0)-$$(git rev-parse --abbrev-ref HEAD)-$$(git rev-parse --short HEAD)
ENV?=dev

.PHONY: deploy build

default: build

version:
	@echo ${VERSION}

build:
	yarn run build

deps:
	yarn --ignore-optional
	cd src/ui-kit && yarn && cd -

docker-build:
	docker build -t gcr.io/${GCP_PROJECT}/${NAME}:${VERSION} \
	--build-arg REACT_APP_CLOUD_API_URL=${REACT_APP_CLOUD_API_URL} \
	--build-arg REACT_APP_TXLOG_API_URL=${REACT_APP_TXLOG_API_URL} \
	--build-arg REACT_APP_GOOGLE_MAP_KEY=${REACT_APP_GOOGLE_MAP_KEY} \
	-f Dockerfile .

docker-push:
	docker push gcr.io/${GCP_PROJECT}/${NAME}:${VERSION}

release: docker-build docker-push

deploy:
	ENV=${ENV} GCP_PROJECT=${GCP_PROJECT} deploy/deploy.sh
