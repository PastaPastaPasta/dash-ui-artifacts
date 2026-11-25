// CONNECT proxy that shares one downstream budget (bytes/s) across all tunnels, plus a fixed added RTT.
import http from 'node:http';
import net from 'node:net';
const [, , port, rateArg, rttArg = '0', mapArg = ''] = process.argv;
const [mapDomain, mapTarget] = mapArg.split('=');
const rate = Number(rateArg);
const rtt = Number(rttArg);
let free = Date.now();
const slot = (n) => { free = Math.max(free, Date.now()) + (rate ? (n / rate) * 1000 : 0); return free; };
http
  .createServer()
  .on('connect', (req, client, head) => {
    let [host, p] = req.url.split(':');
    if (mapDomain && (host === mapDomain || host.endsWith(`.${mapDomain}`))) [host, p] = mapTarget.split(':');
    const queue = [];
    let pumping = false;
    const pump = () => {
      if (pumping || !queue.length) return;
      const [at, fn] = queue[0];
      pumping = true;
      setTimeout(() => { queue.shift(); fn(); pumping = false; pump(); }, Math.max(0, at - Date.now()));
    };
    const later = (at, fn) => { queue.push([at, fn]); pump(); };
    const up = net.connect(Number(p), host, () => {
      setTimeout(() => {
        client.write('HTTP/1.1 200 OK\r\n\r\n');
        if (head.length) up.write(head);
        client.on('data', (d) => setTimeout(() => up.write(d), rtt / 2));
        up.on('data', (d) => {
          const at = slot(d.length) + rtt / 2;
          later(at, () => client.write(d));
          if (at - Date.now() > 80) {
            up.pause();
            setTimeout(() => up.resume(), at - Date.now() - 60);
          }
        });
        up.on('end', () => later(0, () => client.end()));
      }, rtt);
    });
    up.on('error', () => client.destroy());
    client.on('error', () => up.destroy());
    client.on('close', () => up.destroy());
  })
  .listen(Number(port), '127.0.0.1', () => console.log('throttle proxy', port, rate, rtt));
