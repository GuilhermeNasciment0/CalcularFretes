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
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
            <div className="bg-amber-100 p-8 rounded-2xl shadow-2xl w-full">
                <h1 className="text-3xl font-bold text-blue-950 mb-6 text-center uppercase">Calculadora de Frete</h1>
                <form onSubmit={handleFrete} className="space-y-6">
                    <div className="space-y-2 text-left">
                        <label className="block text-gray-700 font-medium">Distância(km)</label>
                        <input
                            type="number"
                            id="distancia"
                            value={distancia}
                            min="0"
                            step="0.01"
                            required
                            onChange={(e) => setDistancia(e.target.value)}
                            className="w-full px-4 py-3 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="block text-gray-700 font-medium">Transporte</label>
                        <select
                            id="transport"
                            value={tipoTransporte}
                            onChange={(e) => setTipoTransporte(e.target.value)}
                            className="w-full px-4 py-3 border-gray-400 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 "
                        >
                            <option value="bicicleta">Bicicleta</option>
                            <option value="carro">Carro</option>
                            <option value="drone">Drone</option>                     </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 text-white font-bold py-3 rounded-2xl hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Calculando" : "Calcular"}
                    </button>
                </form>

                {error && <p className="text-red-600 mt-4">{error}</p>}

                {valorFrete !== null && (
                    <div className="mt-6 p-4 bg-blue-400 border-blue-600 rounded-2xl">
                        <h2 className="font-semibold text-blue-800 text-center">Valor do Frete: R$ {valorFrete}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Frete
