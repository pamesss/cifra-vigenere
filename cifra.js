//efeito da barra de progresso no topo do site
document.querySelector(".content").addEventListener("scroll", function () {
    var scrollTop = this.scrollTop;
    var scrollHeight = this.scrollHeight - this.clientHeight;
    var scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
});


document.addEventListener('DOMContentLoaded', function () {

    const table = document.getElementById('vigenereTable');
    let header = document.createElement('tr');

    let cornerCell = document.createElement('td');
    cornerCell.style.fontWeight = 'bold';
    header.appendChild(cornerCell);

    for (let i = 0; i < 26; i++) {
        let row = document.createElement('tr');

        let rowHeader = document.createElement('td');
        rowHeader.textContent = String.fromCharCode(65 + i);
        rowHeader.style.fontWeight = 'bold';
        row.appendChild(rowHeader);

        for (let j = 0; j < 26; j++) {
            let cell = document.createElement('td');
            cell.textContent = String.fromCharCode(65 + (i + j) % 26);
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    document.getElementById('encrypt').addEventListener('click', function () {
        processText('encrypt');
    });

    document.getElementById('decrypt').addEventListener('click', function () {
        processText('decrypt');
    });

    document.getElementById('clear').addEventListener('click', function () {
        document.getElementById('message').value = "";
        document.getElementById('key').value = "";
        document.getElementById('result').innerHTML = '<p>Result will appear here...</p>';
    })

    document.getElementById('showTable').addEventListener('click', function () {
        const tableContainer = document.getElementById('tableContainer');
        const btn = document.getElementById('showTable');

        if (tableContainer.classList.contains('hiden')) {
            tableContainer.classList.remove('hiden');
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

        if(!message || !key) {
            resultDiv.innerHTML = '<p>Message and key are required!</p>';
            return;
        }

        const filteredKey = key.replace(/[^A-Z]/g, '');
        
        if(filteredKey.length === 0) {
            resultDiv.innerHTML = '<p>Key must contain at least one letter!</p>';
            return;
        }

    }