const crypto = require('crypto');
const { apisecret, apikey } = require('./.env/keys.js')

// Decode the base64 apiSecret to get the private key
const privateKeyData = Buffer.from(apisecret, 'base64');
console.log(privateKeyData)
const toPkcs8der = (rawB64) => {
  var base64 = Buffer.from(rawB64, "base64")
  var rawPrivate = base64.subarray(0, 32);
  var prefixPrivateEd25519 = Buffer.from("302e020100300506032b657004220420", "hex");
  var der = Buffer.concat([prefixPrivateEd25519, rawPrivate]);
  return crypto.createPrivateKey({ key: der, format: "der", type: "pkcs8" });
};


// Create the KeyObject
const privateKey = toPkcs8der(privateKeyData);
console.log(privateKey);

console.log(crypto.generateKeyPairSync('ed25519', {}))

// Now you can use privateKey for cryptographic operations, for example to create a signature
const message = 'Hello, world!';
const signature = crypto.sign(null, Buffer.from(message), privateKey);

console.log(signature.toString('base64'));