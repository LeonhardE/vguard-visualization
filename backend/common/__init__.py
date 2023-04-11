import random
import sys
import os
import stat
import socket

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
    write_new_config()


def create_run_script():
    with open(VGUARD_RUN_SCRIPT_PATH, 'w') as f:
        f.write(VGUARD_RUN_SCRIPT)
    st = os.stat(VGUARD_RUN_SCRIPT_PATH)
    os.chmod(VGUARD_RUN_SCRIPT_PATH, st.st_mode | stat.S_IEXEC)


def create_config():
    with open(VGUARD_CONFIG_PATH, 'w') as f:
        f.write(VGUARD_CONFIG)


def port_in_use(port):
    test_socket = socket.socket()
    ok = test_socket.connect_ex(('127.0.0.1', port))
    test_socket.close()
    return ok == 0


def get_available_ports(count):
    ret = []
    while len(ret) < count:
        port = random.randint(20000, 60000)
        if port in ret:
            continue
        if port_in_use(port):
            continue
        ret.append(port)
    return ret


def generate_new_config():
    config_str = r'# VGuard Visualization config. The first server is proposer.' + '\n'
    ports = get_available_ports(32)
    for serverid in [0, 1, 2, 3]:
        port_slice = ports[serverid * 8: (serverid + 1) * 8]
        config_str += str(serverid) + ' 127.0.0.1 vg ' + ' '.join(str(p) for p in port_slice) + '\n'
    return config_str


def write_new_config():
    with open(VGUARD_CONFIG_PATH, 'w') as f:
        f.write(generate_new_config())


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

VGUARD_CONFIG = r'''# VGuard Visualization config. The first server is proposer.
0 127.0.0.1 vg 10000 10001 10002 10003 10100 10200 10300 10007
1 127.0.0.1 vg 11000 11001 11002 11003 11100 11200 11300 11007
2 127.0.0.1 vg 12000 12001 12002 12003 12100 12200 12300 12007
3 127.0.0.1 vg 13000 13001 13002 13003 13100 13200 13300 13007
'''
