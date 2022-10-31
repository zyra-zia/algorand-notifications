import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

class TransactionSelector extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
                        amount: "",
                        sender: "",
                        receiver: "",
                        note: "",
                        type: "",
                        url: "",

                        showModal: false,
                        modalText: "",
                        modalTitle: ""
                    };

        // This binding is necessary to make `this` work in the callback
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
          ...this.state,
          [event.target.name]: value.toString()
        });
    }

    isFormValid(){
        let isValid = true;
        if(this.state.amount.length == 0 &&
            this.state.sender.length == 0 &&
            this.state.receiver.length ==0 &&
            this.state.note.length == 0 &&
            this.state.type.length == 0){
                isValid = false;
        }

        if(this.state.url.length == 0 ){
            isValid = false;
        }
        return isValid;
    }

    showErrorModal(){
        this.setState({ 
            modalText: "Please enter a Notification Endpoint and select at least one parameter",
            modalTitle: "Invalid Input"
        });
        this.handleOpenModal();
    }

    showSuccessModal(){
        this.setState({ 
            modalText: "A new notification has been successfully created.",
            modalTitle: "Success"
        });
        this.handleOpenModal();
    }

    handleSubmit(event){
        event.preventDefault();

        if(!this.isFormValid()){
            this.showErrorModal();
            return;
        }

        let params = {};
        if(!isNaN(parseInt(this.state.amount))){
            params.amount = this.state.amount;
        }

        if(this.state.sender !== undefined && this.state.sender.trim().length > 0){
            params.sender = this.state.sender;
        }

        if(this.state.receiver !== undefined && this.state.receiver.trim().length > 0){
            params.receiver = this.state.receiver;
        }

        if(this.state.note !== undefined && this.state.note.trim().length > 0){
            params.note = this.state.note;
        }

        if(this.state.type !== undefined && this.state.type.trim().length > 0){
            params.type = this.state.type;
        }

        if(this.state.url !== undefined && this.state.url.trim().length > 0){
            params.url = this.state.url;
        }

        this.props.addNotification(params);
        
        this.showSuccessModal();
        this.setState({
            amount: "",
            sender: "",
            receiver: "",
            note: "",
            type: "",
            url: ""
        });
    }

    getSelectedParams(){
        let content = [];
        if(!isNaN(parseInt(this.state.amount))){
            content.push(<li className="list-group-item" key="amount">Amount: {this.state.amount}</li>);
        }

        if(this.state.sender !== undefined && this.state.sender.trim().length > 0){
            content.push(<li className="list-group-item" key="sender">Sender: {this.state.sender}</li>);
        }

        if(this.state.receiver !== undefined && this.state.receiver.trim().length > 0){
            content.push(<li className="list-group-item" key="receiver">Receiver: {this.state.receiver}</li>);
        }

        if(this.state.note !== undefined && this.state.note.trim().length > 0){
            content.push(<li className="list-group-item" key="note">Note: {this.state.note}</li>);
        }

        if(this.state.type !== undefined && this.state.type.trim().length > 0){
            content.push(<li className="list-group-item" key="type">Type: {this.state.type}</li>);
        }
        
        return (
            <ul id="params" className="list-group">
                {content}
            </ul>
        );
    }

    render(){
        let params = this.getSelectedParams();
    return(
        <div className="col">
            <div className="row g-5">
                <div className="col-md-7 col-lg-8">
                    <p>
                        Please select the transaction parameters needed for notifications.
                    </p>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">Notification Endpoint</label>
                            <input type="text" className="form-control" id="url" name="url" onChange={this.handleChange} value={this.state.url}/>
                            <div id="urlHelp" className="form-text"><em>Required </em> - Your own URL that will receive the notification as a JSON object</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Payment Amount</label>
                            <input type="number" className="form-control" id="amount" name="amount" onChange={this.handleChange} value={this.state.amount}/>
                            <div id="amountHelp" className="form-text">Payment amount should be in microAlgos</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="sender" className="form-label">Sender</label>
                            <input type="text" className="form-control" id="sender" name="sender" onChange={this.handleChange} value={this.state.sender}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="receiver" className="form-label">Receiver</label>
                            <input type="text" className="form-control" id="receiver"  name="receiver" onChange={this.handleChange} value={this.state.receiver}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="note" className="form-label">Note</label>
                            <input type="text" className="form-control" id="note" name="note" onChange={this.handleChange} value={this.state.note}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="type" className="form-label">Transaction Type</label>
                            <select className="form-select" aria-label="Please choose a transaction type" id="type" name="type" onChange={this.handleChange} value={this.state.type}>
                                <option defaultValue={""}>Please choose a transaction type</option>
                                <option value="pay">Payment</option>
                                <option value="keyreg">Key Registration</option>
                                <option value="acfg">Asset Configuration</option>
                                <option value="afrz">Asset Freeze</option>
                                <option value="axfer">Asset Transfer</option>
                                <option value="appl">Application Call</option>
                            </select>
                        </div>
                        
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Create New Notification</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-5 col-lg-4 order-md-last">
                    <div>
                        Send a notification to <span id="urlInfo">{this.state.url}</span> when a transaction with the following parameters succeeds:
                           {params}
                    </div>
                </div>
            </div>

            <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example" className="modal d-block" tabIndex="-1" ariaHideApp={false}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleCloseModal}></button>
                        </div>
                        <div className="modal-body">
                            <p>{this.state.modalText}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
    }
}

export default TransactionSelector;