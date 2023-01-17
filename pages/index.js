import Head from 'next/head';
import Header from '../components/Header';
import { useState } from 'react';

import { indicators, factors } from '../lib/indicators';
import { calculate } from '../lib/calculate_request';
import Table from '../components/Table';

export default function HomePage() {

  const [ value, setValue ] = useState('');
  const [ error, setError ] = useState(null);
  const [ production, setProduction ] = useState(null);

  const [ results, setResults ] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const n = parseInt(value);

    if (isNaN(n)) {
      setError('Error: Debes ingresar un número!');
      return;
    }

    setError(null);
    setProduction(n);
    calculate(n).then(setResults);
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <>
      <Head>
        <title>Demanda de Materiales para la producción de Pigmento Beterraga</title>
      </Head>
      <Header />
      <div className="max-w-8xl mx-auto py-12">
        {/* Main section */}
        <main className="flex flex-col p-8 py-32 gap-16">
          <h1 className="mx-auto text-center text-black/80 font-medium text-4xl sm:text-5xl md:text-6xl">
            Calculadora - Pigmento Beterraga
          </h1>
          <form className="w-full px-24 flex flex-col gap-2">
            <div className="flex flex-row text-2xl w-full">
              <input
                className="border border-black/20 rounded-tl-2xl rounded-bl-2xl px-6 py-4 outline-none flex-1"
                placeholder="Ingresar F en kilogramos por hora..."
                type="text"
                onChange={handleChange}
                value={value}
              />
              <button
                type="submit"
                className="bg-pink-200 border border-white/30 text-white/80 hover:bg-pink-100 px-8 rounded-tr-2xl rounded-br-2xl"
                onClick={handleSubmit}
              >
                Calcular
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-center text-lg">{error}</p>
            )}
          </form>
        </main>

        {results && (
          <div className="flex flex-col gap-0">
            <h2 className="px-8 font-medium text-2xl">Indicadores Económicos</h2>
            <div className="flex flex-wrap -mx-1 p-8">
              {indicators.map(indicator => (
                <div
                  key={indicator.name}
                  className="flex basis-full p-2"
                >
                  <div className="flex flex-col border border-black/20 rounded-2xl px-8 py-6 w-full gap-8">
                    <h4 className="font-medium text-lg">{indicator.name}</h4>
                    <div className="flex flex-col px-8">
                      <Table
                        head={Object.values(indicator.data).map(d => d.name)}
                        data={[ Object.entries(indicator.data).map(([ key, { format } ]) => format(results[key])) ]}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {production !== null && (
          <div className="flex flex-col gap-0">
            <h2 className="px-8 font-medium text-2xl">Requerimientos de Materia Prima</h2>
            <div className="flex flex-wrap -mx-1 p-8">
              {factors.map(factor => (
                <div
                  key={factor.name}
                  className="flex basis-1/3 p-2"
                >
                  <div className="flex flex-col border border-black/20 rounded-2xl px-8 py-4 w-full">
                    <p className="text-black/80 font-medium text-xl">{factor.name}</p>
                    <p className="text-black/70 font-light text-lg">{(production * factor.factor).toFixed(2)} {factor.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};