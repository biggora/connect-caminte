NODEUNIT = `which nodeunit`
JSHINT = $(which jshint)

check:
	@jshint ./lib

test: test-mysql test-mariadb test-sqlite test-postgres test-redis test-mongo test-rethinkdb test-arango test-neo4j

test-mysql:
	@CAMINTE_DRIVER=mysql $(NODEUNIT) tests/test.js

test-mariadb:
	@CAMINTE_DRIVER=mariadb $(NODEUNIT) tests/test.js

test-sqlite:
	@CAMINTE_DRIVER=sqlite $(NODEUNIT) tests/test.js

test-postgres:
	@CAMINTE_DRIVER=postgres $(NODEUNIT) tests/test.js

test-firebird:
	@CAMINTE_DRIVER=firebird $(NODEUNIT) tests/test.js

test-redis:
	@CAMINTE_DRIVER=redis $(NODEUNIT) tests/test.js

test-mongo:
	@CAMINTE_DRIVER=mongo $(NODEUNIT) tests/test.js

test-tingo:
	@CAMINTE_DRIVER=tingo $(NODEUNIT) tests/test.js

test-rethinkdb:
	@CAMINTE_DRIVER=rethinkdb $(NODEUNIT) tests/test.js

test-neo4j:
	@CAMINTE_DRIVER=neo4j $(NODEUNIT) tests/test.js

test-arango:
	@CAMINTE_DRIVER=arango $(NODEUNIT) tests/test.js


.PHONY: test
.PHONY: doc
