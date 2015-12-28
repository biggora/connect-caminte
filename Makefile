ISTANBUL = `which istanbul`
MOCHA = `which _mocha`
MOCHA_REPORTER = spec
MOCHA_RUN = $(MOCHA) -r should -R $(MOCHA_REPORTER)
MOCHA_WATCH = $(MOCHA) -r should -R $(MOCHA_REPORTER) -w
MOCHA_COV = $(ISTANBUL) cover $(MOCHA) --  --timeout 5000 -r should -u exports -R $(MOCHA_REPORTER)
JSHINT = $(which jshint)

check:
	@jshint ./lib

test: test-mysql test-mariadb test-redis test-mongo test-rethinkdb test-arango test-sqlite test-postgres

test-cov: clear
	@CAMINTE_DRIVER=mariadb $(MOCHA_COV)

test-mysql:
	@CAMINTE_DRIVER=mysql $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-mariadb:
	@CAMINTE_DRIVER=mariadb $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-sqlite:
	@CAMINTE_DRIVER=sqlite $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-postgres:
	@CAMINTE_DRIVER=postgres $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-firebird:
	@CAMINTE_DRIVER=firebird $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-redis:
	@CAMINTE_DRIVER=redis $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-mongo:
	@CAMINTE_DRIVER=mongo $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-tingo:
	@CAMINTE_DRIVER=tingo $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-rethinkdb:
	@CAMINTE_DRIVER=rethinkdb $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-neo4j:
	@CAMINTE_DRIVER=neo4j $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

test-arango:
	@CAMINTE_DRIVER=arango $(MOCHA) --timeout 5000 -r should -R $(MOCHA_REPORTER)

clear:
	@rm -rf coverage

.PHONY: test
.PHONY: doc
