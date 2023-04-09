import socket
import threading
from common import MSG_BROKER_IP, MSG_BROKER_PROT, map_port_id


class SocketServer(object):
    def __init__(self):
        self.server_socket = None
        self.listenerThread = None
        self.MAX_CONNECTION = 4
        self.connected_client = 0
        self.connected_socket_map = {}

    def start_listening(self):
        self.listenerThread = threading.Thread(target=self._accept_connection)
        self.listenerThread.start()

    def _accept_connection(self):
        self.connected_client = 0
        self.server_socket = socket.socket()
        self.server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        self.server_socket.bind((MSG_BROKER_IP, MSG_BROKER_PROT))
        self.server_socket.listen(self.MAX_CONNECTION)
        while self.connected_client < self.MAX_CONNECTION:
            connected_socket, addr = self.server_socket.accept()

            recv_data = connected_socket.recv(1024).decode()
            server_id = int(recv_data)
            self.connected_socket_map[server_id] = connected_socket

            print('Accept connection from ', addr, 'server:', server_id)

            self.connected_client += 1

        print('Listener thread quit.')
        self.server_socket.shutdown(socket.SHUT_RDWR)
        self.server_socket.close()

    def write_to_server(self, server_id: int, msg: str):
        self.connected_socket_map[server_id].send(msg.encode())

    def read_from_server(self, server_id: int):
        recv_data = self.connected_socket_map[server_id].recv(1024)
        return recv_data.decode()

    def close_connections(self):
        for server_id in self.connected_socket_map:
            self.connected_socket_map[server_id].shutdown(socket.SHUT_RDWR)
            self.connected_socket_map[server_id].close()
        self.connected_socket_map.clear()
