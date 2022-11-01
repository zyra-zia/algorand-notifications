
# Algorand Notifications

This is a notification service for the Algorand blockchain. Users can choose what parameters they want to be notified on and also choose a notification endpoint. When a transaction matching their parameters is added to the blockchain, a notification is sent to the user specified end point.

Demo Video: [https://youtu.be/1dqfMh2aDnE](https://youtu.be/1dqfMh2aDnE)

The application keeps track of the last round processed. It then polls the blockchain every second and iterates through all the transactions between the last and the current rounds. If a transaction matches the user specified parameters, a notification in the form of a JSON object containing the current transaction is sent as a POST request to the user specified endpoint.

#### Limitations
Unfortunately, due to time constraints, the application currently has limited functionality. Only a subset of possible transaction parameters can currently be selected. i.e. the payment amount, sender, receiver, note and transaction type.

Also, the application is currently only running in the browser. Ideally the blockchain polling should be done as a service and the front-end should only be used to create notifications. Also, currently there is no data persistence. 

But, I hope this serves as a useful proof of concept.

#### Usage
In the project directory, you can run:
### `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also need a test server to send the notification to. Navigate to the the test-server directory and run:
### `node server.js`

Now you have a very simple test server running at http://localhost:8000, which just echoes every POST request it gets.

Now create a new notification and choose http://localhost:8000 as the endpoint. Then create a test transaction. When the transaction executes, a notification will be sent to the test server running at http://localhost:8000
