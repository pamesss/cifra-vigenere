//efeito da barra de progresso no topo do site
document.querySelector(".content").addEventListener("scroll", function () {
    var scrollTop = this.scrollTop;
    var scrollHeight = this.scrollHeight - this.clientHeight;
    var scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
});


//chiper
document.addEventListener('DOMContentLoaded', function() {
    // Generate Vigenère table
    const table = document.getElementById('vigenereTable');
    let header = document.createElement('tr');
    
    let cornerCell = document.createElement('td');
    cornerCell.style.fontWeight = 'bold';
    header.appendChild(cornerCell);
    
    for (let i = 0; i < 26; i++) {
      let cell = document.createElement('td');
      cell.textContent = String.fromCharCode(65 + i);
      cell.style.fontWeight = 'bold';
      header.appendChild(cell);
    }
    table.appendChild(header);
    
    for (let i = 0; i < 26; i++) {
      let row = document.createElement('tr');
      
      let rowHeader = document.createElement('td');
      rowHeader.textContent = String.fromCharCode(65 + i);
      rowHeader.style.fontWeight = 'bold';
      row.appendChild(rowHeader);
      
      for (let j = 0; j < 26; j++) {
        let cell = document.createElement('td');
        let letter = (i + j) % 26;
        cell.textContent = String.fromCharCode(65 + letter);
        row.appendChild(cell);
      }
      
      table.appendChild(row);
    }
    
    // Event listeners
    document.getElementById('encrypt').addEventListener('click', function() {
      processText('encrypt');
    });
    
    document.getElementById('decrypt').addEventListener('click', function() {
      processText('decrypt');
    });
    
    document.getElementById('clear').addEventListener('click', function() {
      document.getElementById('message').value = '';
      document.getElementById('key').value = '';
      document.getElementById('result').innerHTML = '<p>Result will appear here...</p>';
    });
    
    document.getElementById('showTable').addEventListener('click', function() {
      const tableContainer = document.getElementById('tableContainer');
      const btn = document.getElementById('showTable');
      
      if (tableContainer.classList.contains('hidden')) {
        tableContainer.classList.remove('hidden');
        btn.textContent = 'Hide Vigenère Table';
      } else {
        tableContainer.classList.add('hidden');
        btn.textContent = 'Show Vigenère Table';
      }
    });
  });
  
  function processText(action) {
    const message = document.getElementById('message').value;
    const key = document.getElementById('key').value.toUpperCase();
    const resultDiv = document.getElementById('result');
    
    if (!message || !key) {
      resultDiv.innerHTML = '<p>Please enter both a message and a key.</p>';
      return;
    }
    
    // Filter key to only include letters
    const filteredKey = key.replace(/[^A-Z]/g, '');
    
    if (filteredKey.length === 0) {
      resultDiv.innerHTML = '<p>Key must contain at least one letter.</p>';
      return;
    }
    
    let result;
    let steps = [];
    
    if (action === 'encrypt') {
      result = vigenereEncrypt(message, filteredKey, steps);
    } else {
      result = vigenereDecrypt(message, filteredKey, steps);
    }
    
    // Display result with steps
    let output = `<h3>${action === 'encrypt' ? 'Encrypted' : 'Decrypted'} Result:</h3>`;
    output += `<p><strong>Original message:</strong> ${message}</p>`;
    output += `<p><strong>Key:</strong> ${filteredKey}</p>`;
    output += `<p><strong>Result:</strong> ${result}</p>`;
    
    if (steps.length > 0) {
      output += '<h3>Detailed Steps:</h3><ol>';
      steps.forEach(step => {
        output += `<li>${step}</li>`;
      });
      output += '</ol>';
    }
    
    resultDiv.innerHTML = output;
  }
  
  function vigenereEncrypt(text, key, steps) {
    const result = [];
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = text.charCodeAt(i);
      
      // Only encrypt letters
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        const isUpperCase = charCode >= 65 && charCode <= 90;
        const baseCharCode = isUpperCase ? 65 : 97;
        
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.charCodeAt(0) - 65;
        
        const textCharPosition = charCode - baseCharCode;
        const encryptedPosition = (textCharPosition + keyShift) % 26;
        const encryptedChar = String.fromCharCode(baseCharCode + encryptedPosition);
        
        result.push(encryptedChar);
        
        // Record the step
        steps.push(`Letter '${char}' (position ${textCharPosition}) + Key '${keyChar}' (shift ${keyShift}) = '${encryptedChar}' (position ${encryptedPosition})`);
        
        // Move to the next key character
        keyIndex++;
      } else {
        // Non-letter characters remain unchanged
        result.push(char);
        steps.push(`Character '${char}' is not a letter, so it remains unchanged.`);
      }
    }
    
    return result.join('');
  }
  
  function vigenereDecrypt(text, key, steps) {
    const result = [];
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const charCode = text.charCodeAt(i);
      
      // Only decrypt letters
      if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
        const isUpperCase = charCode >= 65 && charCode <= 90;
        const baseCharCode = isUpperCase ? 65 : 97;
        
        const keyChar = key[keyIndex % key.length];
        const keyShift = keyChar.charCodeAt(0) - 65;
        
        const textCharPosition = charCode - baseCharCode;
        const decryptedPosition = (textCharPosition - keyShift + 26) % 26;
        const decryptedChar = String.fromCharCode(baseCharCode + decryptedPosition);
        
        result.push(decryptedChar);
        
        // Record the step
        steps.push(`Letter '${char}' (position ${textCharPosition}) - Key '${keyChar}' (shift ${keyShift}) = '${decryptedChar}' (position ${decryptedPosition})`);
        
        // Move to the next key character
        keyIndex++;
      } else {
        // Non-letter characters remain unchanged
        result.push(char);
        steps.push(`Character '${char}' is not a letter, so it remains unchanged.`);
      }
    }
    
    return result.join('');
  }