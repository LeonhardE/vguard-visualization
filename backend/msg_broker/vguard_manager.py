import json
import time
from common import write_new_config
from msg_broker.vguard_process import VGuardProcess
from msg_broker.vguard_state import VGuardState

ORDER_PHASE = 0
CONSENSUS_PHASE = 1

STEP_NOT_RUNNING = 0

STEP_OP_0 = 100
STEP_OP_1 = 101
STEP_OP_2 = 102
STEP_OP_3 = 103
STEP_OP_4 = 104
STEP_OP_5 = 105
STEP_OP_6 = 106

STEP_CP_0 = 201
STEP_CP_1 = 202
STEP_CP_2 = 203
STEP_CP_3 = 204
STEP_CP_4 = 205
STEP_CP_5 = 206
STEP_CP_6 = 207


class VGuardManager(object):
    def __init__(self, state: VGuardState):
        self.vg_state = state
        self.booth = None
        self.current_step = STEP_NOT_RUNNING

        self.current_block_id = 0
        self.order_log_info = None

        self.to_be_committed_log = None

        self.vg_list = []

    def is_vguard_running(self):
        if self.current_step == STEP_NOT_RUNNING:
            return False
        else:
            return True

    def terminate_vginstance(self, car: int):
        if self.current_step == STEP_NOT_RUNNING:
            return

        if car not in self.booth:
            return

        index = self.booth.index(car)
        self.vg_list[index].kill()

    def start_order_phase(self, booth: list, msg: str):
        write_new_config()

        self.booth = booth
        self.current_block_id = self.vg_state.get_new_block_id()

        self.vg_list.append(VGuardProcess(0, 2))
        self.vg_list.append(VGuardProcess(1, 2))
        self.vg_list.append(VGuardProcess(2, 2))
        self.vg_list.append(VGuardProcess(3, 2))

        self.vg_list[0].start_vguard_instance()
        time.sleep(1)
        self.vg_list[1].start_vguard_instance()
        self.vg_list[2].start_vguard_instance()
        self.vg_list[3].start_vguard_instance()
        # for instance in self.vg_list:
        #     instance.start_vguard_instance()

        message = {
            'blockId': self.current_block_id,
            'tx': msg
        }
        self.vg_list[0].write_to_stdin(json.dumps(message))
        output = self.vg_list[0].get_a_line_output_dict()

        self.current_step = STEP_OP_0

        self.order_log_info = {
            'blockId': self.current_block_id,
            'tx': msg,
            'booth': self.booth.copy()
        }

        output['id'] = self.booth[0]
        output['Tx'] = msg
        output['blockId'] = self.current_block_id
        return [output]

    def start_consensus_phase(self, booth: list):
        write_new_config()

        self.booth = booth
        self.to_be_committed_log = self.vg_state.get_first_order_log(booth[0])

        self.vg_list.append(VGuardProcess(0, 3))
        self.vg_list.append(VGuardProcess(1, 3))
        self.vg_list.append(VGuardProcess(2, 3))
        self.vg_list.append(VGuardProcess(3, 3))

        self.vg_list[0].start_vguard_instance()
        time.sleep(1)
        self.vg_list[1].start_vguard_instance()
        self.vg_list[2].start_vguard_instance()
        self.vg_list[3].start_vguard_instance()
        # for instance in self.vg_list:
        #     instance.start_vguard_instance()

        message = {
            'blockId': self.to_be_committed_log['blockId'],
            'timestamp': self.to_be_committed_log['timestamp'],
            'tx': self.to_be_committed_log['tx'],
            'hash': self.to_be_committed_log['hash'],
            'tsig': self.to_be_committed_log['tsig'],
        }
        self.vg_list[0].write_to_stdin(json.dumps(message))
        output = self.vg_list[0].get_a_line_output_dict()

        self.current_step = STEP_CP_0

        output['id'] = self.booth[0]
        output['Tx'] = self.to_be_committed_log['tx']
        output['blockId'] = self.current_block_id
        return [output]

    def next_step(self):
        if self.all_process_are_killed():
            self.vg_list.clear()
            self.order_log_info = None
            self.current_step = STEP_NOT_RUNNING
            self.booth = None
            self.to_be_committed_log = None
            return None

        ret = []
        # order phase
        if self.current_step == STEP_OP_0:
            self.current_step = STEP_OP_1
            ret = self.op_step_1()

        elif self.current_step == STEP_OP_1:
            self.current_step = STEP_OP_2
            ret = self.op_step_2()

        elif self.current_step == STEP_OP_2:
            self.current_step = STEP_OP_3
            ret = self.op_step_3()

        elif self.current_step == STEP_OP_3:
            self.current_step = STEP_OP_4
            ret = self.op_step_4()

        elif self.current_step == STEP_OP_4:
            self.current_step = STEP_OP_5
            ret = self.op_step_5()

        elif self.current_step == STEP_OP_5:
            self.current_step = STEP_OP_6
            ret = self.op_step_6()

        elif self.current_step == STEP_OP_6:
            for instance in self.vg_list:
                instance.wait()
            self.vg_list.clear()
            self.order_log_info = None
            self.current_step = STEP_NOT_RUNNING
            self.booth = None
            return None

        # consensus phase
        elif self.current_step == STEP_CP_0:
            self.current_step = STEP_CP_1
            ret = self.cp_step_1()

        elif self.current_step == STEP_CP_1:
            self.current_step = STEP_CP_2
            ret = self.cp_step_2()

        elif self.current_step == STEP_CP_2:
            self.current_step = STEP_CP_3
            ret = self.cp_step_3()

        elif self.current_step == STEP_CP_3:
            self.current_step = STEP_CP_4
            ret = self.cp_step_4()

        elif self.current_step == STEP_CP_4:
            self.current_step = STEP_CP_5
            ret = self.cp_step_5()

        elif self.current_step == STEP_CP_5:
            self.current_step = STEP_CP_6
            ret = self.cp_step_6()

        elif self.current_step == STEP_CP_6:
            for instance in self.vg_list:
                instance.wait()
            self.vg_list.clear()
            self.current_step = STEP_NOT_RUNNING
            self.to_be_committed_log = None
            self.booth = None
            return None

        return ret

    def op_step_1(self):
        self.vg_list[0].write_to_stdin('OK')
        output = self.vg_list[0].get_a_line_output_dict()
        output['id'] = self.booth[0]

        if output['state'] == 'OPA_broadcast':
            self.order_log_info['timestamp'] = output['timestamp']
            self.order_log_info['hash'] = output['hash']

        return [output]

    def op_step_2(self):
        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        output1 = self.vg_list[1].get_a_line_output_dict()
        output2 = self.vg_list[2].get_a_line_output_dict()
        output3 = self.vg_list[3].get_a_line_output_dict()
        output1['id'] = self.booth[1]
        output2['id'] = self.booth[2]
        output3['id'] = self.booth[3]
        return [output1, output2, output3]

    def op_step_3(self):
        return self.op_step_2()

    def op_step_4(self):
        self.vg_list[0].write_to_stdin('OK')
        output = self.vg_list[0].get_a_line_output_dict()
        output['id'] = self.booth[0]

        if output['state'] == 'OP_proposer_ordered':
            self.order_log_info['tsig'] = output['tSig']
            self.vg_state.append_order_log(self.booth[0], self.order_log_info)

        return [output]

    def op_step_5(self):
        return self.op_step_2()

    def op_step_6(self):
        ret = self.op_step_2()
        if ret[0]['state'] == 'OPB_validator_ordered':
            self.vg_state.append_order_log(self.booth[1], self.order_log_info)

        if ret[1]['state'] == 'OPB_validator_ordered':
            self.vg_state.append_order_log(self.booth[2], self.order_log_info)

        if ret[2]['state'] == 'OPB_validator_ordered':
            self.vg_state.append_order_log(self.booth[3], self.order_log_info)
        return ret

    def cp_step_1(self):
        self.vg_list[0].write_to_stdin('OK')
        output = self.vg_list[0].get_a_line_output_dict()
        output['id'] = self.booth[0]
        return [output]

    def cp_step_2(self):
        ret = []
        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        output1 = self.vg_list[1].get_a_line_output_dict()
        output2 = self.vg_list[2].get_a_line_output_dict()
        output3 = self.vg_list[3].get_a_line_output_dict()
        if not self.vg_state.has_seen_order_log(self.booth[1], self.to_be_committed_log['blockId']):
            output1['id'] = self.booth[1]
            ret.append(output1)

        if not self.vg_state.has_seen_order_log(self.booth[2], self.to_be_committed_log['blockId']):
            output2['id'] = self.booth[2]
            ret.append(output2)

        if not self.vg_state.has_seen_order_log(self.booth[3], self.to_be_committed_log['blockId']):
            output3['id'] = self.booth[3]
            ret.append(output3)

        output1 = self.vg_list[1].get_a_line_output_dict()
        output2 = self.vg_list[2].get_a_line_output_dict()
        output3 = self.vg_list[3].get_a_line_output_dict()
        output1['id'] = self.booth[1]
        output2['id'] = self.booth[2]
        output3['id'] = self.booth[3]
        ret.append(output1)
        ret.append(output2)
        ret.append(output3)
        return ret

    def cp_step_3(self):
        self.vg_list[1].write_to_stdin('OK')
        self.vg_list[2].write_to_stdin('OK')
        self.vg_list[3].write_to_stdin('OK')
        output1 = self.vg_list[1].get_a_line_output_dict()
        output2 = self.vg_list[2].get_a_line_output_dict()
        output3 = self.vg_list[3].get_a_line_output_dict()
        output1['id'] = self.booth[1]
        output2['id'] = self.booth[2]
        output3['id'] = self.booth[3]
        return [output1, output2, output3]

    def cp_step_4(self):
        self.vg_list[0].write_to_stdin('OK')
        output = self.vg_list[0].get_a_line_output_dict()
        output['id'] = self.booth[0]
        if output['state'] == 'CPB_broadcast_commited':
            self.vg_state.commit_log(self.booth[0], self.to_be_committed_log)
        return [output]

    def cp_step_5(self):
        return self.cp_step_3()

    def cp_step_6(self):
        ret = self.cp_step_3()
        if ret[0]['state'] == 'CPB_validator_committed':
            self.vg_state.commit_log(self.booth[1], self.to_be_committed_log)
        if ret[1]['state'] == 'CPB_validator_committed':
            self.vg_state.commit_log(self.booth[2], self.to_be_committed_log)
        if ret[2]['state'] == 'CPB_validator_committed':
            self.vg_state.commit_log(self.booth[3], self.to_be_committed_log)
        return ret

    def all_process_are_killed(self):
        for proc in self.vg_list:
            if proc.is_running():
                return False
        return True

    def start_whole_consensus_phase(self, booth: list, blockid: int, msg: str):
        write_new_config()

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

        # self.vg_list[1].kill()
        # self.vg_list[2].kill()

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
        write_new_config()

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

        # self.vg_list[1].kill()
        # self.vg_list[2].kill()

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
