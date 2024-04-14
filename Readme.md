#

[공식 사이트](https://opensearch.org/)

[공식 사이트 도커 환경](https://opensearch.org/docs/latest/install-and-configure/install-opensearch/docker/)

[공식 사이트 라이브러리 사용](https://opensearch.org/docs/latest/clients/javascript/index/)

[공식 api doc](https://opensearch.org/docs/latest/api-reference/search/)

[도커 허브 사이트](https://hub.docker.com/r/opensearchproject/opensearch)

# 에러 핸들

#### Elasticsearch 실행시 max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144] 에러가 발생하는 경우

##### [참조 블로그 사이트](https://m.blog.naver.com/itso-/222115351087)

##### 해결

```sh
# 1. 방법
sudo sysctl -w vm.max_map_count=262144

# 2. 방법 ( 이 방법으로 해결 )
sudo vi /etc/sysctl.conf 후
vm.max_map_count=262144 추가

// 적용
sudo sysctl -p
```
