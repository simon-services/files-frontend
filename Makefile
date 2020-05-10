.PHONY: all
all: tar

tar:
	mkdir files-frontend
	cp -rf webfonts files-frontend/
	cp -rf js files-frontend/
	cp -rf css files-frontend/
	cp -f index.html files-frontend/
	tar cfvz files-frontend.tar.gz files-frontend
	rm -rf files-frontend

.PHONY: clean 
clean:
	rm -fv *.tar.gz
	find . -name "*~" | xargs rm -fv
