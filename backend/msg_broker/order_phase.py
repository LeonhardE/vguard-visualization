from flask import Flask, request, jsonify
from msg_broker import msg_broker_app


@msg_broker_app.route('/start_order_phase', methods=['POST', 'GET'])
def app_start_order_phase():
    postdata = request.json
    if postdata:
        print(postdata)
    data = {'msg': 'Test OK'}
    return jsonify(data)
