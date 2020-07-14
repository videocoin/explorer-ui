ENV?=dev
NAME=explorer
VERSION=$$(git describe --abbrev=0)-$$(git rev-parse --abbrev-ref HEAD)-$$(git rev-parse --short HEAD)

REGISTRY_SERVER?=registry.videocoin.net
REGISTRY_PROJECT?=cloud


REACT_APP_CLOUD_API_URL?=
REACT_APP_TXLOG_API_URL?=
REACT_APP_GOOGLE_MAP_KEY?=

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
	docker build -t ${REGISTRY_SERVER}/${REGISTRY_PROJECT}/${NAME}:${VERSION} \
	--build-arg REACT_APP_CLOUD_API_URL=${REACT_APP_CLOUD_API_URL} \
	--build-arg REACT_APP_TXLOG_API_URL=${REACT_APP_TXLOG_API_URL} \
	--build-arg REACT_APP_GOOGLE_MAP_KEY=${REACT_APP_GOOGLE_MAP_KEY} \
	-f Dockerfile .

docker-push:
	docker push  ${REGISTRY_SERVER}/${REGISTRY_PROJECT}/${NAME}:${VERSION}

release: docker-build docker-push

deploy:
	helm upgrade -i --wait --set image.tag="${VERSION}" -n console explorer ./deploy/helm
