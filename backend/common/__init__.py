import sys
import os
import stat

VGUARD_DIR = os.path.abspath('./vguardbft')
VGUARD_APP_PATH = os.path.join(VGUARD_DIR, 'vginstance')
VGUARD_CONFIG_DIR = os.path.join(VGUARD_DIR, 'config')
VGUARD_CONFIG_PATH = os.path.join(VGUARD_CONFIG_DIR, 'localhost_visual.conf')
VGUARD_RUN_SCRIPT_DIR = os.path.join(VGUARD_DIR, 'scripts')
VGUARD_RUN_SCRIPT_PATH = os.path.join(VGUARD_RUN_SCRIPT_DIR, 'run_visualization.sh')


def prepare_vguard():
    # print(os.path.abspath(VGUARD_PATH))
    if not os.path.isfile(VGUARD_APP_PATH):
        sys.exit('vginstance not found!')

    if not os.path.isdir(VGUARD_CONFIG_DIR):
        sys.exit('Vguard config folder not found!')

    if not os.path.isdir(VGUARD_RUN_SCRIPT_DIR):
        sys.exit('Vguard script folder not found!')

    create_run_script()
    create_config()


def create_run_script():
    with open(VGUARD_RUN_SCRIPT_PATH, 'w') as f:
        f.write(VGUARD_RUN_SCRIPT)
    st = os.stat(VGUARD_RUN_SCRIPT_PATH)
    os.chmod(VGUARD_RUN_SCRIPT_PATH, st.st_mode | stat.S_IEXEC)


def create_config():
    with open(VGUARD_CONFIG_PATH, 'w') as f:
        f.write(VGUARD_CONFIG)


VGUARD_RUN_SCRIPT = r'''#!/bin/bash
# Visualization run script
./vginstance -id=$1 -r=$2 \
-b=1 \
-boo=4 \
-c=4 \
-cfp="./config/localhost_visual.conf" \
-ci=500 \
-cw=2 \
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
'''

MSG_BROKER_IP = '127.0.0.1'
MSG_BROKER_PROT = 9988

map_port_id = {
    10407: 0,
    11407: 1,
    12407: 2,
    13407: 3
}

VGUARD_CONFIG = r'''# VGuard Visualization config. The first server is proposer.
0 127.0.0.1 vg 10000 10001 10002 10003 10100 10200 10300 10007 10407 9988
1 127.0.0.1 vg 11000 11001 11002 11003 11100 11200 11300 11007 11407 9988
2 127.0.0.1 vg 12000 12001 12002 12003 12100 12200 12300 12007 12407 9988
3 127.0.0.1 vg 13000 13001 13002 13003 13100 13200 13300 13007 13407 9988
'''
