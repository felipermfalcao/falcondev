// Script para gerar hash bcrypt da senha do admin
// Execute: node generate-hash.js

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('❌ Erro: Forneça a senha como argumento');
  console.log('Uso: node generate-hash.js SUASENHA');
  process.exit(1);
}

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

console.log('\n✅ Hash gerado com sucesso!\n');
console.log('📋 Copie este valor para a variável ADMIN_PASSWORD_HASH:\n');
console.log(hash);
console.log('\n');
