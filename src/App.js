import React from "react";
import { Routes, Route } from "react-router";
import NavbarComponent from "./component/Navbar";
import AboutPage from "./pages/About"
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register";
import { connect } from "react-redux";
import { loginAction } from "./redux/actions/userAction"
import BookListPage from "./pages/BookList";
import RentedListPage from "./pages/RentedList";
import NotFoundPage from "./pages/NotFound";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
  }

  keepLogin = async () => {
    try {
      let local = localStorage.getItem("data")
      if (local) {
        local = JSON.parse(local)
        let response = await this.props.loginAction(local.email, local.password)
        if (response.success) {
          this.setState({ loading: false })
        }
      } else {
        this.setState({ loading: false })
      }
    } catch (error) {
      console.log(error)
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <div className="App">
        <NavbarComponent loading={this.state.loading} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/bookslist" element={<BookListPage />} />
          {
            this.props.role === "user"
              ?
              <>
                <Route path="/rentedlist" element={<RentedListPage />} />
              </>
              : this.props.role === "admin"
                ?
                <>
                </>
                :
                <Route path="*" element={<NotFoundPage />} />
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    )
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { loginAction })(App);