import * as bitcoin from 'bitcoinjs-lib';


export function processTxWitness(witness: string[]) {
    const { prvKeyscount, script } = extractInitialdataFromWitness(witness);

    const parsedScript = scriptToDataOptcodesArray(script);

    const pubKeys = extractPubKeysFromWitness(parsedScript);

    if (pubKeys.length !== prvKeyscount) {
        console.warn('cannot decode data - pubkeys and private keys count do not match');
        return 'cannot decode data - pubkeys and private keys count do not match';
    }

    console.log('keys count:', prvKeyscount);


    return pubKeys.length;
    const prvKeys = witness.slice(0, prvKeyscount - 1);
    return decodeScript(script, pubKeys, prvKeys);
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


    const parsedScript = scriptChunks.map(chunk => {
        if (Buffer.isBuffer(chunk)) {
            console.log(`DATA: ${chunk.toString('hex')}`);
        } else {
            console.log(`OPCODE: ${bitcoin.script.toASM([chunk])}`);
        }
    });
    //console.log('parsedScript', parsedScript);

    return scriptChunks;
}

function extractPubKeysFromWitness(scriptChunks: (number | Buffer)[]) {
    const pubKeys: Buffer[] = [];
    const cache: { [key: string]: boolean } = {};

    scriptChunks.forEach((chunk, index) => {
        if (Buffer.isBuffer(chunk) && chunk.length === 32) {
            if (bitcoin.script.toASM([scriptChunks[index + 2]]) === 'OP_PICK' &&
                bitcoin.script.toASM([scriptChunks[index + 3]]) === 'OP_SHA256' &&
                bitcoin.script.toASM([scriptChunks[index + 4]]) === 'OP_DUP') {
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

function decodeScript(script: string, pubKeys: Buffer[], prvKeys: string[]) {
    return '';
}