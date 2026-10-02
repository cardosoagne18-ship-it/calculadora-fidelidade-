function calcular() {

    const multaTotal = Number(
        document.getElementById("multaTotal").value
    );

    const fidelidade = Number(
        document.getElementById("fidelidade").value
    );

    const contrato = document.getElementById("contrato").value;
    const cancelamento = document.getElementById("cancelamento").value;

    if (!contrato || !cancelamento) {
        alert("Informe as datas.");
        return;
    }

    if (!fidelidade || fidelidade <= 0) {
        alert("Informe um período de fidelidade válido.");
        return;
    }

    const dataContrato = contrato.split("-");
    const dataCancelamento = cancelamento.split("-");

    const anoContrato = Number(dataContrato[0]);
    const mesContrato = Number(dataContrato[1]);
    const diaContrato = Number(dataContrato[2]);

    const anoCancelamento = Number(dataCancelamento[0]);
    const mesCancelamento = Number(dataCancelamento[1]);
    const diaCancelamento = Number(dataCancelamento[2]);

    let meses =
        (anoCancelamento - anoContrato) * 12 +
        (mesCancelamento - mesContrato);

    let dias = diaCancelamento - diaContrato;

    if (dias < 0) {
        dias += 30;
        meses--;
    }

    if (meses < 0) {
        alert("A data de cancelamento não pode ser anterior à data do contrato.");
        return;
    }

    let diasUtilizados = (meses * 30) + dias;

    const diasTotais = fidelidade * 30;

    if (diasUtilizados > diasTotais) {
        diasUtilizados = diasTotais;
    }

    const mesesUtilizados = Math.floor(diasUtilizados / 30);
    const diasUsados = diasUtilizados % 30;

    const diasRestantes = diasTotais - diasUtilizados;

    const mesesRestantes = Math.floor(diasRestantes / 30);
    const diasRestantesDoMes = diasRestantes % 30;

    const multa = (diasRestantes / diasTotais) * multaTotal;

    const multaTotalFormatada = multaTotal.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const multaFormatada = multa.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    document.getElementById("resultado").innerHTML = `

        <h2>Resultado</h2>

        <div class="resultado-item">
            <strong>Multa contratual:</strong>
            <span>R$ ${multaTotalFormatada}</span>
        </div>

        <div class="resultado-item">
            <strong>Dias utilizados:</strong>
            <span>${diasUtilizados}</span>
        </div>

        <div class="resultado-item">
            <strong>Tempo utilizado:</strong>
            <span class="info">
                ${mesesUtilizados} meses e ${diasUsados} dias
            </span>
        </div>

        <div class="resultado-item">
            <strong>Dias restantes:</strong>
            <span>${diasRestantes}</span>
        </div>

        <div class="resultado-item">
            <strong>Tempo restante:</strong>
            <span class="info">
                ${mesesRestantes} meses e ${diasRestantesDoMes} dias
            </span>
        </div>

        <hr>

        <div class="resultado-multa">

            <strong>Valor da Multa:</strong>

            <span class="valor">
                R$ ${multaFormatada}
            </span>

        </div>
    `;
}