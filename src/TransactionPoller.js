import algosdk, { Transaction } from "algosdk";
import Notifier from "./Notifier";

function TransactionPoller(props){
    const token = '';
    const server = 'https://testnet-api.algonode.cloud';
    const port = 443;
    const client = new algosdk.Algodv2(token, server, port);
    const notifier = new Notifier();

    let poll;
  
    (async () => {
      
      let lastRound = (await client.status().do())["last-round"];
  
      const indexerClient = new algosdk.Indexer(token, server, port);
      
      poll = setInterval(pollForNewTxns, 1000);
      

      async function pollForNewTxns(){
        let txs = [];
        let currentRound = (await client.status().do())["last-round"];

        for(let i=lastRound+1; i<=currentRound; i++){
            let b = await indexerClient.lookupBlock(lastRound).do();

            if(Array.isArray(b.block.txns))
                txs.push(... b.block.txns);
        }

        lastRound = currentRound;

        if(txs.length > 0 && props.notifications.length > 0){
          notifier.processNewTransactions(props.notifications, txs);
        }

      }   
  
    })().catch((e) => {
      console.log(e);
    });

    return null;
}

export default TransactionPoller;