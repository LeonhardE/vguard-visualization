from flask import request, jsonify, json
from msg_broker import msg_broker_app, vg_manager


@msg_broker_app.route('/start_order_phase', methods=['POST'])
def app_start_order_phase():
    if not request.data:
        return jsonify({'success': 'false'})

    params = json.loads(request.json)
    if 'booth' not in params or 'tx' not in params:
        return jsonify({'success': 'false'})

    if vg_manager.is_vguard_running():
        return jsonify({'success': 'false', 'error': 'VGuard instance is already running.'})

    output = vg_manager.start_order_phase(booth=params['booth'], msg=params['tx'])

    if output is None:
        return jsonify({'success': 'false', 'msg': 'VGuard instance initialize failed, pls try again later.'})

    data = {'success': 'true', 'msg': output}
    return jsonify(data)


@msg_broker_app.route('/next_step', methods=['GET', 'POST'])
def app_next_step():
    if not vg_manager.is_vguard_running():
        return jsonify({'success': 'false', 'error': 'VGuard instance is not running.'})

    output = vg_manager.next_step()

    if output is None:
        return jsonify({'success': 'false', 'error': 'VGUARD_STOPPED'})

    data = {'success': 'true', 'msg': output}
    return jsonify(data)
