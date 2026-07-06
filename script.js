function calcular(){

const multaTotal = Number(document.getElementById("multaTotal").value);
const fidelidade = Number(document.getElementById("fidelidade").value);

const contrato = document.getElementById("contrato").value;
const cancelamento = document.getElementById("cancelamento").value;

if(!contrato || !cancelamento){

alert("Informe as datas.");
return;

}

const c = contrato.split("-");
const x = cancelamento.split("-");

const ano1 = Number(c[0]);
const mes1 = Number(c[1]);
const dia1 = Number(c[2]);

const ano2 = Number(x[0]);
const mes2 = Number(x[1]);
const dia2 = Number(x[2]);

// Cálculo em calendário comercial (30 dias por mês)

let meses = (ano2-ano1)*12 + (mes2-mes1);
let dias = dia2-dia1;

if(dias<0){

dias+=30;
meses--;

}

if(meses<0){

alert("Datas inválidas.");
return;

}

let diasUtilizados=(meses*30)+dias;

const diasTotais=fidelidade*30;

if(diasUtilizados>diasTotais)
diasUtilizados=diasTotais;

let mesesUtilizados=Math.floor(diasUtilizados/30);
let diasUsados=diasUtilizados%30;

let diasRestantes=diasTotais-diasUtilizados;

let mesesRestantes=Math.floor(diasRestantes/30);
let diasRest=diasRestantes%30;

let multa=(diasRestantes/diasTotais)*multaTotal;

document.getElementById("resultado").innerHTML=`

<h2>Resultado</h2>

<p><strong>Dias utilizados:</strong> ${diasUtilizados}</p>

<p><strong>Tempo utilizado:</strong>
<span class="info">${mesesUtilizados} meses e ${diasUsados} dias</span>
</p>

<p><strong>Dias restantes:</strong> ${diasRestantes}</p>

<p><strong>Tempo restante:</strong>
<span class="info">${mesesRestantes} meses e ${diasRest} dias</span>
</p>

<hr>

<p><strong>Valor da Multa:</strong></p>

<p class="valor">
R$ ${multa.toLocaleString('pt-BR',{
minimumFractionDigits:2,
maximumFractionDigits:2
})}
</p>

`;

}