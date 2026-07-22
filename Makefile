up:
	docker compose -f infra/docker/docker-compose.dev.yml up -d

down:
	docker compose -f infra/docker/docker-compose.dev.yml down

reset-db:
	docker compose -f infra/docker/docker-compose.dev.yml down -v
	docker compose -f infra/docker/docker-compose.dev.yml up -d postgres valkey meilisearch mailpit minio

logs:
	docker compose -f infra/docker/docker-compose.dev.yml logs -f

psql:
	docker exec -it simal-postgres psql -U simal -d simal_web

valkey-cli:
	docker exec -it simal-valkey valkey-cli

meili-keys:
	curl -s http://localhost:7700/keys -H "Authorization: Bearer simal-meili-dev-key" | jq .

minio-buckets:
	docker exec -it simal-minio mc alias set local http://localhost:9010 simalminio simalminio123
	docker exec -it simal-minio mc mb local/simal-public-dev
	docker exec -it simal-minio mc mb local/simal-sensitive-dev
