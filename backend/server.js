// importar o modulo express- framework de aplicação web para node.js
const express = require('express')

// modulo que permite que o servidor aceite requisições diferentes (dominios)
const cors = require('cors')

// instanciando express para app
const app = express();

const port=3001;


//configura o express para analisar as requisições com o corpo no formato json
// corpo no formato json, isso é necessário para ler os dados enviados
// no corpo da requisição POST
app.use(express.json());

//habilita o cors para todas as rotas da aplicação permitindo o acesso
app.use(cors())

//objeto (tabela com os preços)
const precos={
    bicicleta:0.75, //preço por km para bicicleta
    carro:0.25, // preço por km para bicicleta
    drone:1.20 // preço por km para drone
}

// definindo uma rota de API tipo POST

// função de callback lida com requisição

app.post('/calcularfrete',(req,res)=>{
    //destruct para o corpo da requisição e extrair distancia e tipoTransporte
    const {distancia,tipoTransporte}= req.body;

    // verifica se a distancia ou tipoTransporte não foram fornecidos
    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error: 'Distancia e tipo de transporte são obrigatorios'})

    }

    // Busca o preço por KM no objeto convertendo o tipo de transporte para minusculos
    const precoPorKm = precos[tipoTransporte.toLowerCase()];


    // verifica se o tipoTransporte fornecido existe na tabela de preços
    if(precoPorKm === undefined){
        return res.status(400).json({error: "Tipo de transporte inválido"})
    }


    // calcula o valor total do frete multiplicando a distancia pelo preço por km
    const valorTotal = distancia * precoPorKm;
    // Envia a resposta com o objeto JSON
    // toFixed - formata o valor total para ter exatamente duas casas decimais
    res.json({valorTotal: valorTotal.toFixed(2)})

})

//inicia o servidor para que ele comece a escutar as requisições na porta
app.listen(port,()=>{
    console.log(`Servidor ROdando na porta http://localhost:${port}`);
})


