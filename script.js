function calcular() {

    const multaTotal = Number(
        document.getElementById("multaTotal").value
    );

    const fidelidade = Number(
        document.getElementById("fidelidade").value
    );

    const contratoInput = document.getElementById("contrato").value;
    const cancelamentoInput = document.getElementById("cancelamento").value;

    if (!contratoInput || !cancelamentoInput) {
        alert("Informe as datas.");
        return;
    }

    if (!fidelidade || fidelidade <= 0) {
        alert("Informe um período de fidelidade válido.");
        return;
    }

    /*
     * Converte DD/MM/AAAA para AAAA-MM-DD
     * para manter a mesma lógica original da calculadora.
     */

    const contratoPartes = contratoInput.split("/");
    const cancelamentoPartes = cancelamentoInput.split("/");

    if (
        contratoPartes.length !== 3 ||
        cancelamentoPartes.length !== 3 ||
        contratoPartes[0].length !== 2 ||
        contratoPartes[1].length !== 2 ||
        contratoPartes[2].length !== 4 ||
        cancelamentoPartes[0].length !== 2 ||
        cancelamentoPartes[1].length !== 2 ||
        cancelamentoPartes[2].length !== 4
    ) {
        alert("Informe as datas no formato dd/mm/aaaa.");
        return;
    }

    const contrato =
        contratoPartes[2] + "-" +
        contratoPartes[1] + "-" +
        contratoPartes[0];

    const cancelamento =
        cancelamentoPartes[2] + "-" +
        cancelamentoPartes[1] + "-" +
        cancelamentoPartes[0];

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


// =========================================================
// FORMATAÇÃO DAS DATAS
// =========================================================

function configurarData(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        if (valor.length > 8) {
            valor = valor.substring(0, 8);
        }

        if (valor.length > 4) {

            valor =
                valor.substring(0, 2) + "/" +
                valor.substring(2, 4) + "/" +
                valor.substring(4);

        } else if (valor.length > 2) {

            valor =
                valor.substring(0, 2) + "/" +
                valor.substring(2);

        }

        this.value = valor;
    });


    // Dois cliques selecionam a data inteira
    campo.addEventListener("dblclick", function () {

        this.focus();
        this.select();

        this.setSelectionRange(
            0,
            this.value.length
        );
    });
}


configurarData("contrato");
configurarData("cancelamento");