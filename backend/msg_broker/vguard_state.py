import json


class OrderLogEntry(object):
    def __init__(self, values=None):
        self.blockId = 0
        self.timestamp = 0
        self.tx = ''
        self.hash = ''
        self.tsig = ''
        self.booth = []
        if values is not None:
            self.set_values(values)

    def set_values(self, values: dict):
        self.blockId = values['blockId']
        self.timestamp = values['timestamp']
        self.tx = values['tx']
        self.hash = values['hash']
        self.tsig = values['tsig']
        self.booth = values['booth']

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)


class VGuardState(object):
    def __init__(self):
        self.block_count = 0
        self.order_log = {}
        self.committed_log = {}
        for i in range(10):
            self.order_log[i] = []
            self.committed_log[i] = []

    def get_new_block_id(self):
        ret = self.block_count
        self.block_count += 1
        return ret

    def append_order_log(self, car: int, order_log_entry: dict):
        self.order_log[car].append(order_log_entry)

    def get_first_order_log(self, car: int):
        return self.order_log[car][0]

    def get_order_log(self, car: int):
        return self.order_log[car]

    def get_committed_log(self, car: int):
        return self.committed_log[car]

    def has_seen_order_log(self, car: int, order_log_id: int):
        ordered_logs = self.order_log[car]
        for log in ordered_logs:
            if log['blockId'] == order_log_id:
                return True
        return False

    def commit_log(self, booth: list, order_log_entry: dict):
        for car in booth:
            ordered_logs = self.order_log[car]
            for log in ordered_logs:
                if log['blockId'] == order_log_entry['blockId']:
                    ordered_logs.remove(log)
                    break

            self.committed_log[car].append({
                'blockId': order_log_entry['blockId'],
                'timestamp': order_log_entry['timestamp'],
                'tx': order_log_entry['tx'],
                'booth': order_log_entry['booth']
            })
