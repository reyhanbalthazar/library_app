import React from 'react';
import Carousel from 'react-bootstrap/Carousel'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    printCarousel = () => {
        return (
            <div >
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            style={{borderRadius:30}}
                            src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            {/* <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            style={{borderRadius:30}}
                            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            {/* <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            style={{borderRadius:30}}
                            src="https://images.unsplash.com/photo-1549675584-91f19337af3d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            {/* <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }

    printImage = () => {
        return (
            <div>
                <div>
                    <img style={{ width: "25vw", borderRadius: 30 }} alt="..." src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                </div>
                <div style={{ marginTop: "10px" }}>
                    <img style={{ width: "25vw", borderRadius: 30 }} alt="..." src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className='row' style={{ width: "90vw", paddingTop: "120px", margin: "auto" }}>
                    <div className='col-8'>
                        {this.printCarousel()}
                    </div>
                    <div className='col-3' style={{ margin:"auto"}}>
                        {this.printImage()}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;