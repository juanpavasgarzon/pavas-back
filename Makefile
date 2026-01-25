migration-run:
	docker compose exec api sh -c "node node_modules/typeorm/cli.js migration:run -d dist/database/data-source.js"

migration-revert:
	docker compose exec api sh -c "node node_modules/typeorm/cli.js migration:revert -d dist/database/data-source.js"

migration-show:
	docker compose exec api sh -c "node node_modules/typeorm/cli.js migration:show -d dist/database/data-source.js"

migration-generate:
ifndef name
	$(error name is required. Usage: make migration-generate name=YourMigrationName)
endif
	docker compose exec api sh -c "pnpm build && node node_modules/typeorm/cli.js migration:generate src/database/migrations/$(name) -d dist/database/data-source.js"

migration-create:
ifndef name
	$(error name is required. Usage: make migration-create name=YourMigrationName)
endif
	docker compose exec api sh -c "node node_modules/typeorm/cli.js migration:create src/database/migrations/$(name)"
