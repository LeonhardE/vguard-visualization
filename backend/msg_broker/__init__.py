from flask import Flask, request, jsonify
from flask_cors import CORS
from common import prepare_vguard
from msg_broker.vguard_manager import VGuardManager
from msg_broker.vguard_state import VGuardState

prepare_vguard()
vg_state = VGuardState()
vg_manager = VGuardManager(vg_state)
# vg_manager.start_whole_order_phase(booth=[3, 4, 5, 6], blockid=1, msg='testmsg')
# vg_manager.start_whole_consensus_phase(booth=[3, 4, 5, 6], blockid=1, msg='testmsg')

msg_broker_app = Flask(__name__)
CORS(msg_broker_app)


@msg_broker_app.route('/test', methods=['POST', 'GET'])
def msg_broker_test():
    postdata = request.json
    if postdata:
        print(postdata)
    data = {'msg': 'Test OK'}
    return jsonify(data)


from msg_broker import steps
from msg_broker import state

if __name__ == '__main__':
    msg_broker_app.run('0.0.0.0', 8000, debug=False)
