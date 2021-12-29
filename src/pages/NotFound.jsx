import React from 'react';

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{display:"flex", justifyContent:"center", marginTop:"20vh"}}>
                <img src="https://cdn-2.tstatic.net/banjarmasin/foto/bank/images/404-not-found-error_20170222_103510.jpg" />
            </div>
         );
    }
}
 
export default NotFoundPage;