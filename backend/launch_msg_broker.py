from msg_broker import msg_broker_app

if __name__ == '__main__':
    msg_broker_app.run('0.0.0.0', 8000, debug=False)
