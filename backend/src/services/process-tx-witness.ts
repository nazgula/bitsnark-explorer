import * as bitcoin from 'bitcoinjs-lib';
import { DecodeError, DecodeData } from 'bitsnark/dist/encoder-decoder/codec-provider';
import { decodeTx, Identity } from 'bitsnark'
import { buffer } from 'stream/consumers';

// proof = {
//     "pi_a": ["4531350982720745483183896166010272188780196700199407980342269744581989148149",
//         "8537072424426339037594105475681425616791387434880920465097584850313527560965"],
//     "pi_b": [
//         ["2411699281801306923564935501152972918367713935498519592436730569804473762071",
//             "9802075445186058683936769178514143384687031267769197843391560534835079597863"],
//         ["9841644077687891842107824701324051165061919977670341286300780240127706993433",
//             "542961677870429289316706958907664752199371035048761897149284127652926867503"]],
//     "pi_c": ["3973245501156043393965035252994987222825469293526203824011347102421386558530",
//         "5182492167196517803964084985226343839022108025654500361628202698319357889198"],
// };

export function processTxWitness(witness: string[], identity: Identity, step: number) {
    const { prvKeyscount, script } = extractInitialdataFromWitness(witness);
    const parsedScript = scriptToDataOptcodesArray(script);
    const prvToPubMultiplier = identity === Identity.prover ? 1 : 2;
    const pubKeys = extractPubKeysFromWitness(parsedScript, identity);

    if (pubKeys.length !== prvToPubMultiplier * prvKeyscount) {
        const msg = `cannot decode data - pubkeys and private keys count do not match ${pubKeys.length} !== ${prvKeyscount}`;
        console.warn(msg);
        return msg;
    }

    //return pubKeys.length;
    const prvKeys = witness.slice(0, prvKeyscount);
    return decodeScript(pubKeys, prvKeys, step, identity);
}


function extractInitialdataFromWitness(witness: string[]) {
    return witness.reduce((acc, cur, index) => {
        if (cur.length === 64 && index == acc.prvKeyscount) {
            acc.prvKeyscount++;
        } else if (cur.length === 128 && (index == acc.sigCount + 1 || acc.sigCount == 0)) {
            acc.sigCount++;
        } else if (index === witness.length - 2) {
            acc.script = cur;
        }
        return acc
    }, { prvKeyscount: 0, sigCount: 0, script: '' });
}


function scriptToDataOptcodesArray(script: string) {
    const scriptBuffer = Buffer.from(script, 'hex');

    const scriptChunks = bitcoin.script.decompile(scriptBuffer);
    if (!scriptChunks) return [];


    // const parsedScript = scriptChunks.map(chunk => {
    //     if (Buffer.isBuffer(chunk)) {
    //         console.log(`DATA: ${chunk.toString('hex')} / ${chunk}`);
    //     } else {
    //         console.log(`OPCODE: ${bitcoin.script.toASM([chunk])} / ${chunk}`);
    //     }
    // });
    //console.log('parsedScript', parsedScript);

    return scriptChunks;
}

function extractPubKeysFromWitness(scriptChunks: (number | Buffer)[], identity: Identity) {
    const pubKeys: Buffer[] = [];
    const cache: { [key: string]: boolean } = {};

    scriptChunks.forEach((chunk, index) => {
        if (Buffer.isBuffer(chunk) && chunk.length === 32) {
            if (isPubKey(identity, scriptChunks)(chunk, index)) {
                if (!cache[chunk.toString('hex')]) {
                    cache[chunk.toString('hex')] = true;
                    pubKeys.push(chunk);
                    console.log('PUBKEY:', chunk.toString('hex'));
                }
            }
        }
    })

    return pubKeys;
}

function isPubKey(identity: Identity, scriptChunks: (number | Buffer)[]) {
    if (identity === Identity.prover) {
        return (chunk: Buffer, index: number) => {
            return index + 4 <= scriptChunks.length &&
                bitcoin.script.toASM([scriptChunks[index + 2]]) === 'OP_PICK' &&
                bitcoin.script.toASM([scriptChunks[index + 3]]) === 'OP_SHA256' &&
                bitcoin.script.toASM([scriptChunks[index + 4]]) === 'OP_DUP';
        }
    } else {
        return (chunk: Buffer, index: number) => {
            return index - 2 >= 0 && index + 1 <= scriptChunks.length &&
                bitcoin.script.toASM([scriptChunks[index - 2]]) === 'OP_PICK' &&
                bitcoin.script.toASM([scriptChunks[index - 1]]) === 'OP_SHA256' &&
                bitcoin.script.toASM([scriptChunks[index + 1]]) === 'OP_EQUAL';
        }
    }
}



function decodeScript(pubKeys: Buffer[], prvKeys: string[], step: number, identity: Identity) {
    const decoded = decodeTx(
        Buffer.concat(pubKeys),
        Buffer.concat(
            prvKeys.map(key => Buffer.from(key, 'hex'))
        ),
        step,
        identity);

    if (decoded && decoded.hasOwnProperty('data')) {
        const hexString = (decoded as DecodeData).data.toString('hex');
        return BigInt('0x' + hexString).toString(10);

    }
    else if (decoded && decoded.hasOwnProperty('error')) {
        return (decoded as DecodeError).error;
    }
    return '';
}