import React from "react";
import TransactionPoller from "./TransactionPoller";
import TransactionSelector from "./TransactionSelector";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
                    notifications: []
                };
    
    this.addNotification = this.addNotification.bind(this);
  }

  addNotification(notification){
    this.setState({
      notifications: [...this.state.notifications, notification]
    });
  }

  render(){
    return (
      <div className="App" id="App">
        <TransactionPoller notifications={this.state.notifications} />

        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              <span className="fs-4">Algorand Realtime Notifications</span>
            </a>

          </header>
          
          <div className="row">
            <TransactionSelector addNotification={this.addNotification}/>
          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        </footer>
        
      </div>
    ); 
  }
  
}

export default App;
