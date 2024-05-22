import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = () => {
  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCode value="https://example.com" />
    </div>
  );
};

export default QRCodeGenerator;
