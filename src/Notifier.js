class Notifier {

    constructor(){

    }

    processNewTransactions(notifications, transactions){
        let notify = false;
        for(let i=0; i<notifications.length; i++){
            let n = notifications[i];

            for(let j=0; j<transactions.length; j++){
                let tx = transactions[j];

                notify = this.shouldNotify(n, tx);
                if(notify === true){
                    this.sendNotification(tx, n.url);
                    notify = false;
                }
            }
        }
    }

    shouldNotify(notification, transaction){
        
        let tx = transaction.txn;
        let notifyCount = 0;
        if(tx.amt !== undefined && parseInt(notification.amount) === tx.amt){
            notifyCount++;
        }
        if(tx.snd !== undefined && notification.sender === tx.snd){
            notifyCount++;
        }
        if(tx.rcv !== undefined && notification.receiver === tx.rcv){
            notifyCount++;
        }
        if(tx.note !== undefined && notification.note === tx.note){
           notifyCount++;
        }
        if(tx.type !== undefined && notification.type === tx.type){
            notifyCount++;
        }
        
        if(notifyCount === Object.keys(notification).length - 1){
            return true;
        }
        else {
            return false;
        }
    }

    sendNotification(transaction, endpoint){
        console.log("notification sent to " + endpoint);
        // Creating a XHR object
        let xhr = new XMLHttpRequest();

        // open a connection
        xhr.open("POST", endpoint, true);

        // Set the request header i.e. which type of content you are sending
        xhr.setRequestHeader("Content-Type", "application/json");

        // Create a state change callback
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                // Print received data from server
                console.log("response received", this.responseText);

            }
        };

        console.log("sending notification for tx: ", transaction);
        // Converting JSON data to string
        var data = JSON.stringify(transaction);

        // Sending data with the request
        xhr.send(data);
    }

}

export default Notifier;