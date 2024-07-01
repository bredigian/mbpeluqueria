import { WEBSOCKET_API_URL } from '@/constants/api';
import io from 'socket.io-client';

export const connectWebsocket = (name: string) =>
  io(WEBSOCKET_API_URL as string, {
    query: {
      user: name,
    },
  });
