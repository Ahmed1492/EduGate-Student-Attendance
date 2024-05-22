import React, { useState } from "react";
import QRCode from "qrcode.react";
const DynamicQRCodeGenerator = () => {
  const [generate, serGenerate] = useState(true);

  const handleGenerate = () => {
    serGenerate(true);
  };

  return (
    <div className="qrCodeCard">
      <div className="theGeneration">
        {generate && <QRCode value={"Your data Foramt here"} />}
      </div>
    </div>
  );
};

export default DynamicQRCodeGenerator;
