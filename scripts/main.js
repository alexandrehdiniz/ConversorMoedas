const origem = document.getElementById("moeda-origem");
const destino = document.getElementById("moeda-destino");
const resultadoEl = document.getElementById("resultado");

// Puxar as moedas
async function carregarMoedas() {
    const res = await fetch("https://api.frankfurter.app/currencies");
    const moedas = await res.json();

    for (let codigo in moedas) {
        const option1 = document.createElement("option");
        option1.value = codigo;
        option1.textContent = `${codigo} - ${moedas[codigo]}`;
        origem.appendChild(option1);

        const option2 = option1.cloneNode(true);
        destino.appendChild(option2);
    }

    origem.value = "USD";
    destino.value = "BRL";
}

// Convertendo
async function converter() {
    const valor = document.getElementById("value").value;
    if (!valor) {
        resultadoEl.textContent = "Digite um valor!";
        return;
    }

    const from = origem.value;
    const to = destino.value;

    if (from === to) {
        resultadoEl.textContent = `O valor convertido é: ${valor} ${to}`;
        return;
    }

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${valor}&from=${from}&to=${to}`);
    const data = await res.json();

    resultadoEl.textContent = `${data.rates[to]} ${to}`;
}

// Botão alternar moedas
document.getElementById("swap").addEventListener("click", () => {
    const temp = origem.value;
    origem.value = destino.value;
    destino.value = temp;
});

carregarMoedas();