#!/bin/bash
rm ./vginstance
go clean -x -cache -testcache
go build -x -v -o vginstance ../vguardbft
./vginstance -h