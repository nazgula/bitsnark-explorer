import React from 'react'
import { ProtocolStep } from './useFetchIneraction';
import { Link } from 'react-router-dom';


// export interface Step {
//     id: string,
//     pTxId: string,
//     vTxId: string,
//     step: string,
//     timout: string
// }
export interface StepProps {
    line: ProtocolStep;
    totalsteps: number;
}

function renderAction(isProver: boolean, step: string, txId?: string, timeout?: string) {
    const bgColor = txId ? step === '0' ? 'bg-gray-300' : 'bg-gray-200' : 'bg-white';
    const py = step === '0' ? 'py-8' : 'py-5';

    return (
        <div className={`px-5 border-2 rounded-md w-48 ${bgColor} ${py}`} >
            {txId ?
                <Link to={`/tx/${txId}`}>{

                    isProver ? step === '0' ? 'Initial tx' : 'Prover tx' :
                        step === '0' ? 'Chalange tx' : 'Verifier tx'
                } </Link> :
                <span>{timeout}</span>
            }

        </div >
    )

}


function Step(props: StepProps) {
    const { line, totalsteps } = props;

    return (
        <div className="flex items-center gap-3 p-2 border-gray-300 min-h-20">
            <div className="p-5 bg-gray-100 rounded-md w-100">
                Step {line.step} / {totalsteps}
            </div>
            {renderAction(true, line.step, line.pTxId, line.timeout)}
            {renderAction(false, line.step, line.vTxId, line.timeout)}
        </div>
    )

}

export default Step