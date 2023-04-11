from flask import request, jsonify, json
from msg_broker import msg_broker_app, vg_manager, vg_state


@msg_broker_app.route('/start_order_phase', methods=['POST'])
def app_start_order_phase():
    if not request.data:
        return jsonify({'success': 'false'})

    params = request.json
    if 'booth' not in params or 'tx' not in params:
        return jsonify({'success': 'false'})

    if vg_manager.is_vguard_running():
        return jsonify({'success': 'false', 'error': 'VGuard instance is already running.'})

    output = vg_manager.start_order_phase(booth=params['booth'], msg=params['tx'])

    if output is None:
        return jsonify({'success': 'false', 'error': 'VGuard instance initialize failed, pls try again later.'})

    data = {'success': 'true', 'msg': output}
    return jsonify(data)


@msg_broker_app.route('/start_consensus_phase', methods=['POST'])
def app_start_consensus_phase():
    if not request.data:
        return jsonify({'success': 'false'})

    params = request.json
    if 'booth' not in params:
        return jsonify({'success': 'false'})

    # first car is proposer
    proposer = params['booth'][0]
    ordered_logs = vg_state.get_order_log(proposer)
    if len(ordered_logs) == 0:
        return jsonify({'success': 'false', 'error': 'No ordered logs.'})

    if vg_manager.is_vguard_running():
        return jsonify({'success': 'false', 'error': 'VGuard instance is already running.'})

    output = vg_manager.start_consensus_phase(booth=params['booth'])

    if output is None:
        return jsonify({'success': 'false', 'error': 'VGuard instance initialize failed, pls try again later.'})

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


@msg_broker_app.route('/terminate/<car>', methods=['GET', 'POST'])
def app_terminate_vginstance(car):
    if not vg_manager.is_vguard_running():
        return jsonify({'success': 'false', 'error': 'VGuard instance is not running.'})

    vg_manager.terminate_vginstance(int(car))

    data = {'success': 'true'}
    return jsonify(data)
