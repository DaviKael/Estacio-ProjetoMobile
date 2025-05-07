const { execSync } = require('child_process');
const fs = require('fs');

console.log('Resetando projeto...');

try {
  // Apagar node_modules
  if (fs.existsSync('node_modules')) {
    execSync('rd /s /q node_modules', { stdio: 'inherit', shell: true });
  }

  // Apagar package-lock.json
  if (fs.existsSync('package-lock.json')) {
    execSync('del package-lock.json', { stdio: 'inherit', shell: true });
  }

  // Instalar novamente
  execSync('npm install', { stdio: 'inherit', shell: true });

  console.log('Projeto resetado com sucesso!');
} catch (error) {
  console.error('Erro ao resetar o projeto:', error.message);
}
