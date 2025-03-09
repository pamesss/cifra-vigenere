//efeito da barra de progresso no topo do site
document.querySelector(".content").addEventListener("scroll", function () {
    var scrollTop = this.scrollTop;
    var scrollHeight = this.scrollHeight - this.clientHeight;
    var scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
});

//cifra vigenère
document.addEventListener('DOMContentLoaded', function () {
  // Gera a tabela de Vigenère
  const table = document.getElementById('vigenereTable');
  for (let i = 0; i <= 26; i++) {
      const row = document.createElement('tr');
      for (let j = 0; j <= 26; j++) {
          const cell = document.createElement(i === 0 || j === 0 ? 'th' : 'td');
          if (i === 0 && j === 0) {
              cell.textContent = '';
          } else if (i === 0) {
              cell.textContent = String.fromCharCode(64 + j); // Cabeçalho das colunas (A-Z)
          } else if (j === 0) {
              cell.textContent = String.fromCharCode(64 + i); // Cabeçalho das linhas (A-Z)
          } else {
              cell.textContent = String.fromCharCode(65 + ((i + j - 2) % 26)); // Conteúdo da tabela
          }
          row.appendChild(cell);
      }
      table.appendChild(row);
  }

  // Event listeners
  document.getElementById('encrypt').addEventListener('click', () => processText('encrypt'));
  document.getElementById('decrypt').addEventListener('click', () => processText('decrypt'));
  document.getElementById('clear').addEventListener('click', () => {
      document.getElementById('message').value = '';
      document.getElementById('key').value = '';
      document.getElementById('result').innerHTML = ''; // Limpa o resultado
  });

  // Mostrar/Esconder tabela
  document.getElementById('showTable').addEventListener('click', () => {
      const tableContainer = document.getElementById('tableContainer');
      const btn = document.getElementById('showTable');
      if (tableContainer.classList.contains('hidden')) {
          tableContainer.classList.remove('hidden');
          btn.textContent = 'Esconder tabela Vigenère';
      } else {
          tableContainer.classList.add('hidden');
          btn.textContent = 'Mostrar tabela Vigenère';
      }
  });

  // Copiar resultado
  document.getElementById('copyResult').addEventListener('click', () => {
      const resultText = document.getElementById('result').textContent.replace('Mensagem convertida:', '').trim();
      if (resultText) { navigator.clipboard.writeText(resultText) }
  });
});

function processText(action) {
  const message = document.getElementById('message').value;
  const key = document.getElementById('key').value.toUpperCase();
  const resultDiv = document.getElementById('result');
  const copyBtn = document.getElementById('copyResult');

  let result;
  if (action === 'encrypt') {
      result = vigenereCipher(message, key, true);
  } else {
      result = vigenereCipher(message, key, false);
  }

  resultDiv.innerHTML = `<p><strong>Mensagem convertida:</strong> ${result}</p>`;
  copyBtn.classList.remove('hidden');
}

function vigenereCipher(text, key, encrypt) {
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = text.charCodeAt(i);

      if (/[A-Za-z]/.test(char)) { // Verifica se é uma letra
          const isUpperCase = char === char.toUpperCase();
          const baseCharCode = isUpperCase ? 65 : 97; // Base para letras maiúsculas ou minúsculas
          const keyChar = key[keyIndex % key.length].toUpperCase();
          const keyShift = keyChar.charCodeAt(0) - 65; // Calcula o deslocamento da chave

          const textCharPosition = charCode - baseCharCode; // Posição da letra no alfabeto
          let newPosition;
          if (encrypt) {
              newPosition = (textCharPosition + keyShift) % 26; // Criptografar
          } else {
              newPosition = (textCharPosition - keyShift + 26) % 26; // Descriptografar
          }
          const newChar = String.fromCharCode(baseCharCode + newPosition); // Nova letra

          result += newChar;
          keyIndex++;
      } else {
          result += char; // Mantém caracteres não alfabéticos
      }
  }

  return result;
}