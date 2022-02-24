import React from 'react';
import Image from 'react-bootstrap/Image';
import library_book from '../library_book.png';
import { TiSocialFacebookCircular, TiSocialInstagramCircular, TiSocialTwitter } from 'react-icons/ti';
import { Label } from 'reactstrap';


class FooterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div className='shadow container' style={{
                left: 0,
                bottom: 0,
                maxWidth: "89vw",
                backgroundColor: "#F7F8FA",
                color:"black",
                textAlign: "center",
                position: "relative",
                borderRadius: 20,
                marginTop: "200px",
                padding: "1%",
            }}>
                <div style={{ width: "200px", margin: "auto" }}>
                    <Image alt="..." width="50px" src={library_book} />
                    <Label style={{ fontWeight: "bolder", fontSize: "30px" }}>Library</Label>
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
                    <h6> </h6>
                    <h6 style={{ fontWeight: "bolder" }}>Home</h6>
                    <h6 style={{ fontWeight: "bolder" }}>Books Collection</h6>
                    <h6 style={{ fontWeight: "bolder" }}>About Us</h6>
                    <h6> </h6>
                </div>
                <hr style={{ color: "lightgrey" }} />
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <div>
                        <Label style={{ marginTop: "10px" }}>Copyright &copy; 2022 Library. All rights reserved </Label>
                    </div>
                    <div>
                        <h2>
                            <TiSocialFacebookCircular />
                            <TiSocialInstagramCircular />
                            <TiSocialTwitter />
                        </h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default FooterComponent;