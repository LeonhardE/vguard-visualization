import json
import time

from msg_broker.vguard_process import VGuardProcess

ORDER_PHASE = 0
CONSENSUS_PHASE = 1

class VGuardManager(object):
    def __init__(self):
        self.booth = None
        self.vg_list = []

    def start_whole_consensus_phase(self, booth: list, blockid: int, msg: str):
        self.booth = booth

        self.vg_list.append(VGuardProcess(0, 3))
        self.vg_list.append(VGuardProcess(1, 3))
        self.vg_list.append(VGuardProcess(2, 3))
        self.vg_list.append(VGuardProcess(3, 3))

        for instance in self.vg_list:
            instance.start_vguard_instance()

        message = {
            'blockId': blockid,
            'timestamp': 1681080179379026,
            'tx': msg,
            'hash': '79ec30cfb5633788073027e684fcb6b1f352c47efad15764932fd054226af592',
            'tsig': '5145e86163629ce762ecce38d138bd6b4eebebf3860d17a335a45ad2f7465cd83d60518db9e2a5c7edc7548fd9e83a14cd45d1ba5da399e8d78143bf23c8cc4a',
        }
        self.vg_list[0].write_to_stdin(json.dumps(message))
        print('step 0:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[0].write_to_stdin('OK')
        print('step 1:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 2:', self.vg_list[1].get_a_line_output_dict())
        print('step 2:', self.vg_list[2].get_a_line_output_dict())
        print('step 2:', self.vg_list[3].get_a_line_output_dict())

        print('step 2:', self.vg_list[1].get_a_line_output_dict())
        print('step 2:', self.vg_list[2].get_a_line_output_dict())
        print('step 2:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 3:', self.vg_list[1].get_a_line_output_dict())
        print('step 3:', self.vg_list[2].get_a_line_output_dict())
        print('step 3:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[0].write_to_stdin('OK')
        print('step 4:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 5:', self.vg_list[1].get_a_line_output_dict())
        print('step 5:', self.vg_list[2].get_a_line_output_dict())
        print('step 5:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 6:', self.vg_list[1].get_a_line_output_dict())
        print('step 6:', self.vg_list[2].get_a_line_output_dict())
        print('step 6:', self.vg_list[3].get_a_line_output_dict())

        for instance in self.vg_list:
            instance.wait()

        print('Process O:')
        self.vg_list[0].print_all_output()
        print('Process 1:')
        self.vg_list[1].print_all_output()
        print('Process 2:')
        self.vg_list[2].print_all_output()
        print('Process 3:')
        self.vg_list[3].print_all_output()

        exit(0)

    def start_whole_order_phase(self, booth: list, blockid: int, msg: str):
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
        print('step 0:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[0].write_to_stdin('OK')
        print('step 1:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 2:', self.vg_list[1].get_a_line_output_dict())
        print('step 2:', self.vg_list[2].get_a_line_output_dict())
        print('step 2:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 3:', self.vg_list[1].get_a_line_output_dict())
        print('step 3:', self.vg_list[2].get_a_line_output_dict())
        print('step 3:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[0].write_to_stdin('OK')
        print('step 4:', self.vg_list[0].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 5:', self.vg_list[1].get_a_line_output_dict())
        print('step 5:', self.vg_list[2].get_a_line_output_dict())
        print('step 5:', self.vg_list[3].get_a_line_output_dict())

        time.sleep(1)

        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        print('step 6:', self.vg_list[1].get_a_line_output_dict())
        print('step 6:', self.vg_list[2].get_a_line_output_dict())
        print('step 6:', self.vg_list[3].get_a_line_output_dict())

        for instance in self.vg_list:
            instance.wait()

        print('Process O:')
        self.vg_list[0].print_all_output()

        print('Process 1:')
        self.vg_list[1].print_all_output()

        print('Process 2:')
        self.vg_list[2].print_all_output()

        print('Process 3:')
        self.vg_list[3].print_all_output()

        exit(0)
