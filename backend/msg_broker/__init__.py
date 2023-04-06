from flask import Flask, request, jsonify
from flask_cors import CORS

msg_broker_app = Flask(__name__)
CORS(msg_broker_app)

@msg_broker_app.route('/test', methods=['POST', 'GET'])
def msg_broker_test():
    postdata = request.json
    if postdata:
        print(postdata)
    data = {'msg': 'Test OK'}
    return jsonify(data)


if __name__ == '__main__':
    msg_broker_app.run('0.0.0.0', 8000, debug=False)
