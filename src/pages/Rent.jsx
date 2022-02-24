import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Card, CardGroup, CardBody, CardTitle, CardSubtitle, Button, CardText } from "reactstrap";
import { API_URL } from "../helper";
import { updateUserBook } from "../redux/actions/userAction";

class RentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            selectedDay: {},
        }
    }

    componentDidMount() {
        console.log("CEK URL DETAIL PAGE:", window.location)
        axios.get(`${API_URL}/books${window.location.search}`)
            .then((response) => {
                this.setState({ detail: response.data[0] })
                console.log("detail", this.state.detail)
                console.log("detail option", this.state.detail.option)
            }).catch((err) => {
                console.log(err)
            })
    }

    onBtAddToRent = () => {
        let { selectedDay, detail } = this.state
        if (selectedDay.day) {
            let dataBook = {
                title: detail.title,
                author: detail.author,
                image: detail.image,
                category: detail.category,
                desc: detail.desc,
                year: detail.tear,
                startDate: new Date(Date.now()).toLocaleDateString(),
                day: selectedDay.day,
                endDate: new Date(Date.now() + (3600 * 1000 * (24 * selectedDay.day))).toLocaleDateString(),
            }
            let temp = [...this.props.book]
            temp.push(dataBook)
            if (this.props.iduser) {
                axios.patch(`${API_URL}/dataUser/${this.props.iduser}`, {
                    book: temp
                }).then((response) => {
                    console.log("data cart", response.data)
                    this.props.updateUserBook(response.data.book)
                    alert("Success")
                }).catch((error) => {
                    console.log(error)
                })
                // axios.post(`${API_URL}/userTransactions`, {
                //     iduser: this.props.iduser,
                //     username: this.props.username,
                //     invoice: `#INV${date.getTime()}`,
                //     date: date.toLocaleString(),
                //     detail:[...this.props.book],
                //     status:"On Rent"
                // }).then((response) =>{
                //     this.props.updateUserBook(this.props.iduser)
                // }).catch((err)=> {
                //     console.log(err)
                // })
            }
        }
    }

    render() {
        console.log("selectedDay", this.state.selectedDay)
        return (
            <div style={{ margin: "auto", width: "30vw", textAlign: "center", justifyContent: "center", paddingTop: "100px" }}>
                <p>You're about to rent this book</p>
                <CardGroup>
                    <Card className="shadow">
                        <div style={{ padding: "20px" }}>
                            <img alt='...' src={this.state.detail.image} width="100%" />
                        </div>
                        <CardBody>
                            <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                                {this.state.detail.title}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                {this.state.detail.category}
                            </CardSubtitle>
                            <CardText>
                                {this.state.detail.desc}
                            </CardText>
                            <CardBody style={{ display: "flex", justifyContent: "space-around" }}>
                                {
                                    this.state.detail.option &&
                                    this.state.detail.option.map((value, index) => {
                                        return (
                                            <div>
                                                <Button
                                                    color="success"
                                                    outline
                                                    style={{ width: "100px" }}
                                                    onClick={() => this.setState({ selectedDay: value })}
                                                >
                                                    {value.day} Day
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                            </CardBody>
                            <CardBody>
                                <Button
                                    color="primary"
                                    onClick={this.onBtAddToRent}
                                >RENT</Button>
                            </CardBody>
                        </CardBody>
                    </Card>
                </CardGroup>
            </div>
        )
    }
}

const mapToProps = (state) => {
    return {
        book: state.userReducer.book,
        iduser: state.userReducer.id,
        username: state.userReducer.username
    }
}

export default connect(mapToProps, { updateUserBook })(RentPage);