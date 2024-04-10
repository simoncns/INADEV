make: build run

build:
	docker build -t inadev .

run:
	docker run -p 5000:5000 inadev

.PHONY: all build run
