#!/bin/bash
# test in localhost
./vginstance -id=$1 -r=$2 \
-b=1 \
-boo=4 \
-c=4 \
-cfp="./config/localhost4.conf" \
-ci=500 \
-cw=10 \
-d=0 \
-ed=1 \
-gc=false \
-lm=100 \
-log=5 \
-m=32 \
-ml=1 \
-pm=false \
-s=true \
-w=1 \
-yc=0 \
-bm=0

# To run in cluster, change -cfp to the cluster config file.
# E.g., -cfp="./config/cluster_4.conf"
