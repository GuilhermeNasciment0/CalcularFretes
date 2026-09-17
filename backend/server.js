// IMPORTAR O MODULO EXPRESS - FRAMEWORK DE APLICACAO WEB PARA NODE.JS
const express = require('express');
// MÓDULO QUE PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DIFERENTES (DOMÍNIO)
const cors = require('cors');
// INSTANCIANDO EXPRESS PARA APP (Atribuindo o nome app ao express)
const app = express();
// DEFININDO A PORTA QUE O SERVIDOR SERÁ EXECUTADO
const port = 3001;

//Configura o express para analisar as requisições com o corpo no formato json, isso é necessário,
//para ler os dados enviados no corpo da requisição POST
app.use(express.json());

//HABILITA O CORS PARA TODAS AS ROTAS DA APLICAÇÃO,
app.use(cors());

const precos={
    bicicleta:0.75,
    carro: .25,
    drone: 1.20
}

app.post('/CalcularFrete',(req,res)=>{
    
    const{distancia,tipoTransporte}=req.body;

    if (distancia === undefined || tipoTransporte === undefined){
        return res.status();
    }
})

// INICIA O SERVIDOR PARA QUE ELE COMECE A ESCUTAR AS REQUISIÇÕES 
app.listen(port,()=>{
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})