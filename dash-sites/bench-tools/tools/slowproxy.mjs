// TLS proxy to a local wrangler dev that sends the verifier at ~RATE bytes/s, for screenshots of the download state.
import https from 'node:https';
import { readFileSync } from 'node:fs';
const [, , port, upstream, rate = '400000'] = process.argv;
const [uhost, uport] = upstream.split(':');
https
  .createServer({ key: readFileSync('/work/scratch/dash-site/slowproxy/key.pem'), cert: readFileSync('/work/scratch/dash-site/slowproxy/cert.pem') }, (req, res) => {
    const up = https.request({ host: uhost, port: uport, path: req.url, method: req.method, headers: req.headers, rejectUnauthorized: false }, (r) => {
      res.writeHead(r.statusCode, r.headers);
      if (!req.url.includes('dash-sites-verifier-')) return r.pipe(res);
      r.on('data', (chunk) => {
        r.pause();
        res.write(chunk, () => setTimeout(() => r.resume(), (chunk.length / Number(rate)) * 1000));
      });
      r.on('end', () => res.end());
    });
    req.pipe(up);
  })
  .listen(Number(port), '127.0.0.1', () => console.log('slow proxy on', port));
