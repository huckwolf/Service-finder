COMPOSE ?= docker compose
MONGO_SERVICE ?= mongodb
MONGO_DB ?= service_finder
MONGO_URI ?= mongodb://service_finder:service_finder_password@localhost:27017/$(MONGO_DB)?authSource=admin
JSON_DIR ?= private/mongodb_json

.PHONY: db deploy db-deploy db-check db-count

db: db-check

db-check:
	@$(COMPOSE) exec -T $(MONGO_SERVICE) mongosh "$(MONGO_URI)" --quiet --eval 'db.runCommand({ ping: 1 }).ok' >/dev/null || (echo "MongoDB is not ready. Run 'docker compose up -d' first, then try again."; exit 1)
	@echo "MongoDB is ready."

deploy: db-deploy

db-deploy: db
	@echo "Importing $(JSON_DIR)/tags.json -> $(MONGO_DB).tags"
	@$(COMPOSE) exec -T $(MONGO_SERVICE) mongoimport --uri "$(MONGO_URI)" --collection tags --jsonArray --drop < $(JSON_DIR)/tags.json
	@echo "Importing $(JSON_DIR)/target_audiences.json -> $(MONGO_DB).target_audiences"
	@$(COMPOSE) exec -T $(MONGO_SERVICE) mongoimport --uri "$(MONGO_URI)" --collection target_audiences --jsonArray --drop < $(JSON_DIR)/target_audiences.json
	@echo "Importing $(JSON_DIR)/services.json -> $(MONGO_DB).services"
	@$(COMPOSE) exec -T $(MONGO_SERVICE) mongoimport --uri "$(MONGO_URI)" --collection services --jsonArray --drop < $(JSON_DIR)/services.json
	@echo "Database seed complete."

db-count: db
	@$(COMPOSE) exec -T $(MONGO_SERVICE) mongosh "$(MONGO_URI)" --quiet --eval 'for (const name of ["tags", "target_audiences", "services"]) print(name + ": " + db.getCollection(name).countDocuments())'
