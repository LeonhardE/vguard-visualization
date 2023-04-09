import json

class BrokerMessage(object):
    def __init__(self):
        self.values = {}

    def put_kv_pair(self, key, value):
        self.values[key] = value

    # def json(self):
    #     return json.