import queue
import subprocess
import json
import threading
import time
from queue import Queue

from common import VGUARD_RUN_SCRIPT_PATH, VGUARD_DIR


class VGuardProcess(object):
    def __init__(self, param0, param1):
        self.param0 = str(param0)
        self.param1 = str(param1)
        self.process = None
        self.outputThread = None
        self.outputQueue = Queue()

    def start_vguard_instance(self):
        self.process = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, self.param0, self.param1],
                                        stdin=subprocess.PIPE, stdout=subprocess.PIPE, cwd=VGUARD_DIR)
        self.outputThread = threading.Thread(target=self._process_output)
        self.outputThread.start()

    def _process_output(self):
        line = self.read_a_line_from_stdout()
        while 'Visualization starts' not in line:
            line = self.read_a_line_from_stdout()
        print(line)

        for line in self.process.stdout:
            msg = line.decode().strip()
            self.outputQueue.put(msg)

        # print('Output processing thread exits.')

    def write_to_stdin(self, msg):
        self.process.stdin.write((msg + '\n').encode())
        self.process.stdin.flush()

    def read_a_line_from_stdout(self):
        return self.process.stdout.readline().decode().strip()

    def get_a_line_output(self, timeout=2):
        try:
            msg = self.outputQueue.get(timeout=timeout)
            return msg
        except queue.Empty:
            return None

    def print_all_output(self):
        while not self.outputQueue.empty():
            print(self.outputQueue.get())

    def wait(self):
        self.process.wait()


class VGuardManager(object):
    def __init__(self):
        self.booth = None
        self.vg_list = []

    def start_order_phase(self, booth: list, blockid: int, msg: str):
        self.booth = booth

        self.vg_list.append(VGuardProcess(0, 2))
        self.vg_list.append(VGuardProcess(1, 2))
        self.vg_list.append(VGuardProcess(2, 2))
        self.vg_list.append(VGuardProcess(3, 2))

        for instance in self.vg_list:
            instance.start_vguard_instance()

        message = {
            'blockId': blockid,
            'tx': msg
        }
        self.vg_list[0].write_to_stdin(json.dumps(message))
        print('step 0:', self.vg_list[0].get_a_line_output())

        time.sleep(2)

        self.vg_list[0].write_to_stdin('OK')
        print('step 1:', self.vg_list[0].get_a_line_output())

        time.sleep(2)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 2:', self.vg_list[1].get_a_line_output())
        print('step 2:', self.vg_list[2].get_a_line_output())
        print('step 2:', self.vg_list[3].get_a_line_output())

        time.sleep(2)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 3:', self.vg_list[1].get_a_line_output())
        print('step 3:', self.vg_list[2].get_a_line_output())
        print('step 3:', self.vg_list[3].get_a_line_output())

        for instance in self.vg_list:
            instance.wait()

        print('Process O:')
        self.vg_list[0].print_all_output()
        print()

        print('Process 1:')
        self.vg_list[1].print_all_output()
        print()

        print('Process 2:')
        self.vg_list[2].print_all_output()
        print()

        print('Process 3:')
        self.vg_list[3].print_all_output()
        print()

        exit(0)
