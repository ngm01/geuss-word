import "../styles/ToastMessage.css";

function ToastMessage(props) {
    return ( 
        <div className={`toast ${props.show ? 'show' : 'hide'}`}>
            <p className="message">{props.message}</p>
        </div>
     );
}

export default ToastMessage;