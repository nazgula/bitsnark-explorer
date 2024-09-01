import AppDataSource from '../config/db-config';
import { RawTx, TxType } from '../entities/rawTx';
import 'reflect-metadata';
import * as dotenv from 'dotenv';


dotenv.config();



const insertData = async () => {
    const rawTxRepository = AppDataSource.getRepository(RawTx);

    const txArray = ['3b1c6f9fe90bab7aced3514781a20b7366b6df11554ad9da2eaa75699c9c3c91', // prover stake
        //'1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309', // initial
        'ab263d758510355f1828df632c17725eea453821227e785f0e414e8cb2d6fa42'//, // verifier stake
        // '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6',
        // 'c860d816bb6f7a1fa90b3d8e6cf6530ab97f3d2c1eec0061407e57b7b633ec70',
        // '4315696f6f5778731c02909f44fced5f0d9b7ac6a6391e7a607b021b936f81ae',
        // 'f46e5312f19f60a13002749eeb20ba2bd7f96f9309236a7291f98e8030b9a1a9',
        // 'ee6abc5f9413c12222aea40dc271fb8032a77f2790044bc017822e72991dff21',
        // '0c8bd626712505b689ec270d69dbc66630ea3ec47cb54617af2eb211c872306a',
        // '71ef73d38eb3dfa0ae3f96eee3bdb86d1f16cdf0168efb8adbe459278eeb6e99',
        // '43e367e9008698868d2aaed27054f2f8cce00b58859c0c492d30a9700cdd8bb0',
        // '0563661d05ecd2d5fc4a97365b46b3fda5622a1449d45a1de9d46e4fd569206d',
        // '38592363d38cad7b4abe609e57139a1aa5b15177581ff076ea8016b5a7038cdb',
        // '21426ab37f30c1d823de65fd39b62d901b7cbb2f863248cd15fe75ab1b6d794c',
        // '470b01c094692a8bdfee27fc7f65c7cab4c2cf03df2001b7ab5ed415929813a3',
        // '78461d1e02fc91dfac8cd7465b99b0b92e12e00229ad3930bfa50fb95ece0483',
        // 'c442b3f101f68031249b5465739b28dcb00bbb021f92d6ade71775a800531a2b',
        // '682a556c4b267192dfcbeb06e30560000274938b142fab818042b753a1449e9d',
        // '6d573cf9fd2d03898b57fc135d80e438b126b6c251f6c523b1a1af836896967f',
        // 'ee49cc99b1333e8434521f93827c71fbf8267275cfcdc4c9d9afb58374f6810c',
        // 'df1836f468b95bc7248a74209392ff495291ce99b6a7d7a34f6c97dc1fc8f8f3',
        // '72d2e90ce71d150c728eef1889400d144dec9d3d72ad2ec7b0d86ce8b0d3f2dc',
        // '77ad526bb03c9a06f4400a465669e0ef71359b1ec85bbac6412a56764c03088f',
        // '5c5294356ee80acae6958ec49429551e8027143ab6d0f1d5e3ddd2ad401e7a52',
        // '0ed3d155835101eaf735902f861d05c119af47796ddfe4fad21feda723b99329',
        // '7c7f68bb8f89358690ae0033e44aeecf6d3f0623d77f70fa972f541279f3b162',
        // '576581eab2151fce11092b49ac6911f8fd78cda9d2c11879d33e84d3121db912',
        // 'e6813bfa1f703232cd5da3f501b6dd48f0e9dc570af57926a8153fb4c1874dfa',
        // '37c86903319bd8c772bf23164deafcab105c2c6e273122ec4b1ba5f43c1c5ab2',
        // '7d4bbccc7644bf368fcf41aab8470240eddd7cc095ae38e4a169040e967a1571',
        // '0f45e8ab85561f0df2e34436550ba03bc0b2743ee3fb8a90dcd2cde02b5da8b9',
        // 'cebe6f504e1062730e8d7c1a384db527b94f83d4903f809f7d83ea0dc8f257d7',
        // '00b101e36984b5e56afd8bdb192e1bee9f26d2fbc4dbb7f3ecb33293c13f0b4f',
        // '0b0b9ea47cd7b85f491cd92a8c448e433721b5ddd58d3e4f65380dac70ae997f',
        // '338c0ce477feacf7f542c095d4ad19cb7daca42a90f2eabffd5d8ceb0280ab84',
        // '8a0cf88947795d97ff3d2245221bc3cc6fe1c94d3f381356eb36ecfc18130848',
        // '27c594206c47326d5f195c3a0e99b5ec5f1369e36f7ee39c2af4af06486f1a49',
        // 'fddf77a8ef1d831c92a2ceec18f17d4b5f925177a9e8157b815f4179df76b198',
        // '520876bd1ae42fb4fea8726b26319f606cc63c1feb31593e1b9e36d4905e8306',
        // '58343d81784bd5cb21c4f6fd343fbf796d8337035a8b8f2b592630c2a3a93ed8',
        // '78c06379ad63aa508eaef655cc99a47947b6c1f8ddf31ab372c8fb13bbecf9f8',
        // 'be795166737062567dfd6ec507ea42acc41e192b87186863b850ec5e60503e56',
        // 'f587a792ff96039a2b5a6f2023f061df8cd37605c94ff6e034599081bc5d2754',
        // '5f68503299c00ae211550a2259fb05818d4874c9cb88ebe221e360554be66326',
        // '7ae8a828a4e54486aabd5c180753a263a406a897d3f16dba624d2ad790e28a85',
        // '7a49cd67c7b04fe8dd59fffbed2c75f60144c86f0aae6ca01ed312e83d359faf',
        // '98d7226d6fc9bade95eb8601299941d3db8e6da9864c48995b529aefad0aa623',
        // '611cd3c9ce8a153f845240e53445041983cf5dc7a1ef634b5a1c4351bc3cf66e',
        // 'd14d3c224a5a27e16c534e218b5abee204370e4b0e18408eb94195d1e810bd87',
        // 'b0418688df5265f47f82402468c302ad5f1997cffb8501aadedafb1ae6b3ef56',
        // '1f7b3832a6b57822f3eafe04d9ce7b82237f1afb90d69a3bfd3f221e43f97ed2',
        // 'f983d8cd2ccf44dab1ba08e8d5438a24e56bfaf1ff249c2aee5a25278f1a7b9d',
        // 'ed0297d147c6f847346827779deb04abcf3a0bf3f075a9764bec02f85fb3818c',
        // '32d5cabf8cc2805bb57ba865f386f7ea94b0e6c3ee12ab12fd0f511130c2ea1f',
        // 'be848ff70f990d964e16ee8ee07e698b0755eeb5064f4eb3f1dc91d018d601fc'
    ]

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    txArray.forEach(async (txId, index) => {
        await delay(index * 4000)
        const newTransaction = new RawTx();

        newTransaction.txid = txId;

        const response = await fetch(`https://blockstream.info/testnet/api/tx/${txId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} on https://blockstream.info/testnet/api/tx/${txId}`);
        }
        const data = await response.json();

        newTransaction.block_height = data.status.block_height;
        newTransaction.pos_in_block = index * 10;

        if (txId === '1e2e0fcb27b3e89983eea4ed0cdbd06d867ac3bcfd83ae90510e2bec312ba309')
            newTransaction.tx_type = TxType.initial;
        else if (txId === '3cee52b99ef71f1b7a0c2d0f58483f338117d8c1f6232d1f43408b1860cd3bf6')
            newTransaction.tx_type = TxType.challenge;
        else if (txId === '3b1c6f9fe90bab7aced3514781a20b7366b6df11554ad9da2eaa75699c9c3c91' ||
            txId === 'ab263d758510355f1828df632c17725eea453821227e785f0e414e8cb2d6fa42')
            newTransaction.tx_type = TxType.stake;
        else
            newTransaction.tx_type = TxType.step;


        newTransaction.raw_data = data;
        newTransaction.processed = false;

        await rawTxRepository.save(newTransaction);
        console.log(`Data fo txId ${txId} inserted successfully`);

    });

};

AppDataSource.initialize()
    .then(() => {
        insertData();
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
