const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

const generateCertificate = async () => {
  const pemsPath = path.join(__dirname, '../certs');
  const privateKeyPath = path.join(pemsPath, 'private.pem');
  const certPath = path.join(pemsPath, 'cert.pem');

  if (!fs.existsSync(privateKeyPath) || !fs.existsSync(certPath)) {
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const pems = selfsigned.generate(attrs, { days: 365 });

    if (!fs.existsSync(pemsPath)) {
      fs.mkdirSync(pemsPath);
    }

    fs.writeFileSync(privateKeyPath, pems.private);
    fs.writeFileSync(certPath, pems.cert);
    console.log('Certificates generated');
  } else {
    console.log('Certificates already exist');
  }

  return { privateKeyPath, certPath };
};

module.exports = generateCertificate;
