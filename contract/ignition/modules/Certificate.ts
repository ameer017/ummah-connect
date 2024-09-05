import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const CertificateModule = buildModule("CertificateModule", (m) => {

  const certificate = m.contract("Certificate");

  return { certificate };
});

export default CertificateModule;

//0x99021BAC4F96a9BB19760115d31408826ceA8747