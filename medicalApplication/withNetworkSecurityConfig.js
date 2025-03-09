const {
  withAndroidManifest,
  withDangerousMod,
} = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function addNetworkSecurityConfig(config) {
  // Utilizamos withDangerousMod para modificar los archivos nativos de Android
  config = withDangerousMod(config, [
    "android",
    async (config) => {
      // Definir la ruta donde se ubicará el XML
      const resDir = path.join(
        config.modRequest.platformProjectRoot,
        "app",
        "src",
        "main",
        "res",
        "xml"
      );
      // Crear la carpeta si no existe
      if (!fs.existsSync(resDir)) {
        fs.mkdirSync(resDir, { recursive: true });
      }
      // Ruta del archivo de configuración
      const filePath = path.join(resDir, "network_security_config.xml");
      // Contenido del archivo XML
      const xmlContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">69.164.214.201</domain>
  </domain-config>
  <debug-overrides>
    <trust-anchors>
      <certificates src="user" />
      <certificates src="system" />
    </trust-anchors>
  </debug-overrides>
</network-security-config>`;
      fs.writeFileSync(filePath, xmlContent);
      return config;
    },
  ]);
  // Agregar la referencia al archivo en el AndroidManifest.xml
  config = withAndroidManifest(config, (config) => {
    const manifest = config.modResults;
    if (
      manifest &&
      manifest.manifest &&
      manifest.manifest.application &&
      manifest.manifest.application[0]
    ) {
      manifest.manifest.application[0]["$"]["android:networkSecurityConfig"] =
        "@xml/network_security_config";
    }
    return config;
  });
  return config;
}

module.exports = (config) => {
  return addNetworkSecurityConfig(config);
};
