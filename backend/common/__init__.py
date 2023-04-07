import sys
import os

VGUARD_PATH = '/home/nu/Desktop/vguardbft'
VGUARD_APP_PATH = VGUARD_PATH + '/vginstance'
VGUARD_CONFIG_PATH = VGUARD_PATH + '/common'


def check_vginstance():
    # print(os.path.abspath(VGUARD_PATH))
    if not os.path.isfile(VGUARD_APP_PATH):
        sys.exit('vginstance not found!')
