from flask import jsonify

from msg_broker import msg_broker_app, vg_state


@msg_broker_app.route('/get_order_log/<car>', methods=['GET', 'POST'])
def app_get_order_log(car):
    order_logs = vg_state.get_order_log(int(car))

    data = {'success': 'true', 'msg': order_logs}
    return jsonify(data)


@msg_broker_app.route('/get_committed_log/<car>', methods=['GET', 'POST'])
def app_get_committed_log(car):
    order_logs = vg_state.get_committed_log(int(car))

    data = {'success': 'true', 'msg': order_logs}
    return jsonify(data)
