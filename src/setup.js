import io from 'socket.io-client';

export default function setup(options={}) {
  return io('http://localhost:3001')
}
