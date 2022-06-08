.PHONY: install_ontop convert pipeline

install_ontop:
	cd ontop-scripts && ./install.sh

convert:
	cd ontop-scripts && ./convert.sh

pipeline:
	cd pipeline && npm run pipeline-file

validate:
	cd validate && npm run validate-file
