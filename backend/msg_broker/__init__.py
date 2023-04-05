from flask import Flask

msg_broker_app = Flask(__name__)


@msg_broker_app.route('/test', methods=['POST', 'GET'])
def msg_broker_test():
    return 'Test OK'


if __name__ == '__main__':
    msg_broker_app.run('0.0.0.0', 5000, debug=False)
