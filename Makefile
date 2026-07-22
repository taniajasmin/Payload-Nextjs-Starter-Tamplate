.PHONY: up down reset-db logs psql valkey-cli meili-keys minio-buckets

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
	docker exec -it app-postgres psql -U app -d app_web

valkey-cli:
	docker exec -it app-valkey valkey-cli

meili-keys:
	curl -s http://localhost:7700/keys -H "Authorization: Bearer app-meili-dev-key" | jq .

minio-buckets:
	docker exec -it app-minio mc alias set local http://localhost:9010 minioadmin minioadmin123
	docker exec -it app-minio mc mb local/app-public-dev
