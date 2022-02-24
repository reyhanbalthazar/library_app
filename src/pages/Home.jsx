import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import { Button, Card, CardBody, CardGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { GiCash, GiElvenCastle } from 'react-icons/gi';
import { IoPeople } from 'react-icons/io5';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    printCarousel = () => {
        return (
            <div>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            style={{ borderRadius: 30 }}
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
                            style={{ borderRadius: 30 }}
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
                            style={{ borderRadius: 30 }}
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

    printCard = () => {
        return (
            <div style={{ textAlign: "left" }}>
                <CardGroup>
                    <Card className='shadow' style={{ borderRadius: 30, padding: "10px", margin: "20px", border:"none" }}>
                        <CardBody>
                            <h1><GiCash /></h1>
                            <h2>Business</h2>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </CardBody>
                    </Card>
                    <Card className='shadow' style={{ borderRadius: 30, padding: "10px", margin: "20px", border:"none"  }}>
                        <CardBody>
                            <h1><GiElvenCastle /></h1>
                            <h2>Fiction</h2>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </CardBody>
                    </Card>
                    <Card className='shadow' style={{ borderRadius: 30, padding: "10px", margin: "20px", border:"none"  }}>
                        <CardBody>
                            <h1><IoPeople /></h1>
                            <h2>Psychology</h2>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        </CardBody>
                    </Card>
                </CardGroup>
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
                    <div className='col-3 p-0 mx-auto my-0' style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <img className='shadow' style={{ width: "25vw", borderRadius: 30 }} alt="..." src="https://images.unsplash.com/photo-1544716278-e513176f20b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                        <img className='shadow' style={{ width: "25vw", borderRadius: 30 }} alt="..." src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" />
                    </div>
                </div>
                <div className='position-relative' style={{ marginTop: "70px" }}>
                    <div >
                        <div style={{
                            width: "100vw", height: "70vh",
                            backgroundColor: "#0d6efd"
                        }}></div>
                    </div>
                    <div className='row position-absolute top-50 start-50 translate-middle' style={{ width: "90vw", margin: "auto" }}>
                        <div className='col-5' style={{ margin: "auto" }}>
                            <div className="jumbotron" style={{ color: "white" }}>
                                <h1 className="display-4" style={{ fontWeight: "bolder" }}>Category</h1>
                                <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <p className="lead">
                                    <Button outline color='warning' style={{ height: "50px", width: "200px", borderRadius:45 }}><Label style={{fontWeight:"bolder", margin:0}}>More Category</Label></Button>
                                </p>
                            </div>
                        </div>
                        <div className='col-6' style={{ marginTop: "300px" }}>
                            <div style={{ display: "flex" }}>
                                {this.printCard()}
                            </div>
                            <div style={{ display: "flex" }}>
                                {this.printCard()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapToProps = ({ bookReducer }) => {
    return {
        booksList: bookReducer.booksList
    }
}

export default connect(mapToProps)(HomePage);