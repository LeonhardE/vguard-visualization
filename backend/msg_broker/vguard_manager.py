import subprocess
from common import VGUARD_RUN_SCRIPT_PATH, VGUARD_DIR


class VGuardManager(object):
    def __init__(self):
        pass

    def start_order_phase(self):
        p0 = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, '0', '0'], stdout=subprocess.PIPE, cwd=VGUARD_DIR)
        p1 = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, '1', '1'], stdout=subprocess.PIPE, cwd=VGUARD_DIR)
        p2 = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, '2', '1'], stdout=subprocess.PIPE, cwd=VGUARD_DIR)
        p3 = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, '3', '1'], stdout=subprocess.PIPE, cwd=VGUARD_DIR)

        p0.wait()
        p1.wait()
        p2.wait()
        p3.wait()

        print('Process O:')
        for line in p0.stdout:
            print(line.decode(), end='')
        print()

        print('Process 1:')
        for line in p1.stdout:
            print(line.decode(), end='')
        print()

        print('Process 2:')
        for line in p2.stdout:
            print(line.decode(), end='')
        print()

        print('Process 3:')
        for line in p3.stdout:
            print(line.decode(), end='')
        print()

        exit(0)

