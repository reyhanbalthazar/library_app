import React from "react";
import { Routes, Route } from "react-router";
import NavbarComponent from "./component/Navbar";
import AboutPage from "./pages/About"
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register";
import { connect } from "react-redux";
import { keepAction, loginAction } from "./redux/actions/userAction"
import { getBookAction, getCategory } from "./redux/actions/bookAction";
import BookListPage from "./pages/BookList";
import RentedListPage from "./pages/RentedList";
import NotFoundPage from "./pages/NotFound";
import RentPage from "./pages/Rent";
import BookManagementPage from "./pages/BookManagement";
import BooksOnRentPage from "./pages/BooksOnRent";
import FooterComponent from "./component/Footer";
import VerificationPage from './pages/VerificationPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.keepLogin()
    this.props.getBookAction()
    this.props.getCategory()
  }

  keepLogin = async () => {
    try {
      await this.props.keepAction()
      this.setState({ loading: false })
      // let local = localStorage.getItem("data")
      // if (local) {
      //   local = JSON.parse(local)
      //   let response = await this.props.loginAction(local.email, local.password)
      //   if (response.success) {
      //     this.setState({ loading: false })
      //   }
      // } else {
      //   this.setState({ loading: false })
      // }
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
          <Route path="/verification/:token" element={<VerificationPage />} />
          {
            this.props.role === "user"
              ?
              <>
                <Route path="/rent" element={<RentPage />} />
                <Route path="/rentedlist" element={<RentedListPage />} />
              </>
              : this.props.role === "admin"
                ?
                <>
                  <Route path="/bookmanagement" element={<BookManagementPage />} />
                  <Route path="/booksonrent" element={<BooksOnRentPage />} />
                </>
                :
                <Route path="*" element={<NotFoundPage />} />
          }
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FooterComponent />
      </div>
    )
  }
}

const mapToProps = (state) => {
  return {
    role: state.userReducer.role
  }
}

export default connect(mapToProps, { loginAction, getBookAction, keepAction, getCategory })(App);