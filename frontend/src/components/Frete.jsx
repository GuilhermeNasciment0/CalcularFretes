import { useState } from "react"

const Frete = () => {

    //Hooks-useState-Manipula o estado da variavel
    const [distancia, setDistancia] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('bicicleta');
    const [valorFrete, setValorFrete] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFrete = async (e) => {
        //previne que o formulario não faça reload
        e.preventDefault();
        setLoading(true);
        setValorFrete(null);
        setError(null);
        //TRATAMENTO DE ERROS COM TRY,CATCH, FINALLY
        try {
            const resp = await fetch("http://localhost:3001/calcularfrete", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ distancia: parseFloat(distancia), tipoTransporte }),
            });
            //validação
            if (!resp.ok) {
                const erroDados = await resp.json();
                //Tratamento de erros na aplicação
                throw new Error(erroDados.error || 'Erro ao calcular o frete');
            }
            const data = await resp.json();
            setValorFrete(data.valorTotal);

        }
        catch (erro) {
            setError(erro)
        }
        finally {
            setLoading(false)
        }


    }


    return (
        <>

        </>
    )
}

export default Frete
