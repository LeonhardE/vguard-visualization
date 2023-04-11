import queue
import signal
import subprocess
import threading
import os
import json
from queue import Queue

from common import VGUARD_RUN_SCRIPT_PATH, VGUARD_DIR

NOT_RUNNING = 0
RUNNING = 1


class VGuardProcess(object):
    def __init__(self, param0, param1):
        self.param0 = str(param0)
        self.param1 = str(param1)
        self.status = NOT_RUNNING
        self.process = None
        self.outputThread = None
        self.outputQueue = Queue()

    def start_vguard_instance(self):
        self.process = subprocess.Popen([VGUARD_RUN_SCRIPT_PATH, self.param0, self.param1],
                                        stdin=subprocess.PIPE, stdout=subprocess.PIPE, cwd=VGUARD_DIR,
                                        preexec_fn=os.setsid)
        # print('pid:', os.getpgid(self.process.pid))
        self.status = RUNNING
        self.outputThread = threading.Thread(target=self._process_output)
        self.outputThread.start()

    def _process_output(self):
        line = self.read_a_line_from_stdout()
        while 'Visualization starts' not in line:
            line = self.read_a_line_from_stdout()
        # print(line)

        for line in self.process.stdout:
            msg = line.decode().strip()
            self.outputQueue.put(msg)

        # print('Output processing thread exits.')

    def write_to_stdin(self, msg):
        if self.status == RUNNING:
            self.process.stdin.write((msg + '\n').encode())
            self.process.stdin.flush()

    def read_a_line_from_stdout(self):
        return self.process.stdout.readline().decode().strip()

    def get_a_line_output(self, timeout=1):
        if self.status == RUNNING:
            try:
                msg = self.outputQueue.get(timeout=timeout)
                return msg
            except queue.Empty:
                self.kill()
                return None
        else:
            return None

    def get_a_line_output_dict(self, timeout=1):
        msg = self.get_a_line_output(timeout)
        if msg is not None:
            return json.loads(msg)
        else:
            return {'state': 'no_response'}

    def print_all_output(self):
        while not self.outputQueue.empty():
            print(self.outputQueue.get())

    def wait(self):
        self.process.wait()

    def kill(self):
        if self.status == RUNNING:
            os.killpg(os.getpgid(self.process.pid), signal.SIGTERM)
            self.process.wait()
            self.status = NOT_RUNNING

    def is_running(self):
        return self.status == RUNNING
