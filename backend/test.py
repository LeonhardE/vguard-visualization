import time

import requests
import json

url_base = 'http://127.0.0.1:8000'


def start_order_phase(booth, tx):
    url = url_base + '/start_order_phase'
    params = {'booth': booth, 'tx': tx}
    ret = requests.post(url, json=json.dumps(params))
    data = json.loads(ret.text)
    if data['success'] == 'true':
        print(data['msg'])
    else:
        print(data['error'])


def start_consensus_phase(booth):
    url = url_base + '/start_consensus_phase'
    params = {'booth': booth}
    ret = requests.post(url, json=json.dumps(params))
    data = json.loads(ret.text)
    if data['success'] == 'true':
        print(data['msg'])
    else:
        print(data['error'])


def next_step():
    url = url_base + '/next_step'
    ret = requests.post(url)
    data = json.loads(ret.text)
    if data['success'] == 'true':
        print(data['msg'])
    else:
        print(data['error'])


def get_order_log(car):
    url = url_base + '/get_order_log/' + str(car)
    ret = requests.post(url)
    data = json.loads(ret.text)
    if data['success'] == 'true':
        print(data['msg'])
    else:
        print(data['error'])


def get_committed_log(car):
    url = url_base + '/get_committed_log/' + str(car)
    ret = requests.post(url)
    data = json.loads(ret.text)
    if data['success'] == 'true':
        print(data['msg'])
    else:
        print(data['error'])


start_order_phase([0, 1, 2, 3], 'tes23452345234523452345')
next_step()
next_step()
next_step()
next_step()
next_step()
next_step()
next_step()
for car in range(10):
    print(car, ': ')
    get_order_log(car)


start_consensus_phase([3, 7, 8, 9])
next_step()
next_step()
next_step()
next_step()
next_step()
next_step()
next_step()
for car in range(10):
    print(car, 'order: ')
    get_order_log(car)

for car in range(10):
    print(car, 'committed: ')
    get_committed_log(car)
