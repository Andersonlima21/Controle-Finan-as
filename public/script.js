// Objeto para armazenar valores das despesas
const despesasValues = {
    despesas30: {},
    despesas15: {}
};

// Função para atualizar saldo com base no salário preenchido
function atualizarSaldoInstantaneo(salarioId, despesasDivId) {
    const salarioInput = document.getElementById(salarioId);
    const saldoSpan = document.getElementById(`saldo${salarioId === 'salario30' ? '30' : '15'}`);

    if (!salarioInput) return;

    let saldo = parseFloat(salarioInput.value) || 0;

    const despesasDiv = document.getElementById(despesasDivId);
    const checkboxes = despesasDiv.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const nomeDespesa = checkbox.id;
        const valorDespesa = despesasValues[despesasDivId][nomeDespesa];
        if (checkbox.checked) {
            saldo -= valorDespesa;
        }
    });

    saldoSpan.textContent = `R$ ${saldo.toFixed(2)}`;
    saldoSpan.className = saldo >= 0 ? 'positivo' : 'negativo';
}

document.getElementById('salario30').addEventListener('input', () => atualizarSaldoInstantaneo('salario30', 'despesas30'));
document.getElementById('salario15').addEventListener('input', () => atualizarSaldoInstantaneo('salario15', 'despesas15'));

function adicionarDespesa(despesasDivId, salarioId) {
    const nomeDespesa = document.getElementById(`nomeDespesa${despesasDivId === 'despesas30' ? '30' : '15'}`).value;
    const valorDespesa = parseFloat(document.getElementById(`valorDespesa${despesasDivId === 'despesas30' ? '30' : '15'}`).value);

    if (!nomeDespesa || isNaN(valorDespesa) || valorDespesa <= 0) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    const despesasDiv = document.getElementById(despesasDivId);

    const despesaDiv = document.createElement('div');
    despesaDiv.innerHTML = `
        <div class="item">
            <input type="checkbox" id="${nomeDespesa}" onchange="atualizarSaldo('${salarioId}', '${despesasDivId}')">
            <label for="${nomeDespesa}">${nomeDespesa}: R$ ${valorDespesa.toFixed(2)}</label>
        </div>
    `;
    despesasDiv.appendChild(despesaDiv);

    despesasValues[despesasDivId][nomeDespesa] = valorDespesa;
}

function atualizarSaldo(salarioId, despesasDivId) {
    const salarioInput = document.getElementById(salarioId);
    let saldo = parseFloat(salarioInput.value);

    const despesasDiv = document.getElementById(despesasDivId);
    const checkboxes = despesasDiv.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        const nomeDespesa = checkbox.id;
        const valorDespesa = despesasValues[despesasDivId][nomeDespesa];

        if (checkbox.checked) {
            saldo -= valorDespesa;
        }
    });

    const saldoSpan = document.getElementById(`saldo${salarioId === 'salario30' ? '30' : '15'}`);
    saldoSpan.textContent = `R$ ${saldo.toFixed(2)}`;
    saldoSpan.className = saldo >= 0 ? 'positivo' : 'negativo';
}

async function salvarMes() {
    const mes = document.getElementById('novoMes').value;
    const salario30 = document.getElementById('salario30').value;
    const salario15 = document.getElementById('salario15').value;

    const despesas30 = Array.from(document.querySelectorAll('#despesas30 input[type="checkbox"]')).map(checkbox => ({
        nome: checkbox.nextElementSibling.textContent.split(':')[0],
        valor: parseFloat(checkbox.nextElementSibling.textContent.split('R$ ')[1]),
        pago: checkbox.checked
    }));

    const despesas15 = Array.from(document.querySelectorAll('#despesas15 input[type="checkbox"]')).map(checkbox => ({
        nome: checkbox.nextElementSibling.textContent.split(':')[0],
        valor: parseFloat(checkbox.nextElementSibling.textContent.split('R$ ')[1]),
        pago: checkbox.checked
    }));

    const mesData = {
        mes: mes,
        dia30: {
            salario: salario30,
            despesas: despesas30
        },
        dia15: {
            salario: salario15,
            despesas: despesas15
        }
    };

    const response = await fetch('/salvarMes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mesData)
    });

    if (response.ok) {
        alert('Mês salvo com sucesso!');

    } else {
        alert('Erro ao salvar o mês.');
    }
}

async function carregarMes() {
    const mes = document.getElementById('mesSelecionado').value;

    const response = await fetch(`/carregarMes/${mes}`);
    if (response.ok) {
        const mesData = await response.json();
        document.getElementById('salario30').value = mesData.dia30.salario;
        document.getElementById('salario15').value = mesData.dia15.salario;

        const despesas30 = mesData.dia30.despesas;
        const despesas15 = mesData.dia15.despesas;

        const despesasDiv30 = document.getElementById('despesas30');
        despesasDiv30.innerHTML = '';
        despesas30.forEach(despesa => {
            despesasDiv30.innerHTML += `
                    <div class="item">
                        <input type="checkbox" id="${despesa.nome}" ${despesa.pago ? 'checked' : ''} onchange="atualizarSaldo('salario30', 'despesas30')">
                        <label for="${despesa.nome}">${despesa.nome}: R$ ${despesa.valor.toFixed(2)}</label>
                    </div>
                `;
            despesasValues.despesas30[despesa.nome] = despesa.valor;
        });

        const despesasDiv15 = document.getElementById('despesas15');
        despesasDiv15.innerHTML = '';
        despesas15.forEach(despesa => {
            despesasDiv15.innerHTML += `
                    <div class="item">
                        <input type="checkbox" id="${despesa.nome}" ${despesa.pago ? 'checked' : ''} onchange="atualizarSaldo('salario15', 'despesas15')">
                        <label for="${despesa.nome}">${despesa.nome}: R$ ${despesa.valor.toFixed(2)}</label>
                    </div>
                `;
            despesasValues.despesas15[despesa.nome] = despesa.valor;
        });

        atualizarSaldo('salario30', 'despesas30');
        atualizarSaldo('salario15', 'despesas15');
    } else {
        alert('Erro ao carregar os dados do mês.');
    }
}
