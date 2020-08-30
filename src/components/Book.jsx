import React, { Component } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Link } from "react-router-dom";
import { store } from "react-notifications-component";
import {
  faSave,
  faPlusSquare,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

class Book extends Component {
  state = {};

  //constructor
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  //staring the initial state
  initialState = {
    id: "",
    title: "",
    author: "",
    coverPhotoURL: "",
    isbnNumber: "",
    price: "",
    language: "",
  };

  componentDidMount = () => {
    //if id is not null then we wanna edit
    const id = this.props.match.params.id;
    console.log(id);
    axios
      .get("http://104.171.113.18:10606/api/v1/books/" + id)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  };

  //when i submit the form
  handleSubmit = (e) => {
    //prevent the page refreshing
    e.preventDefault();

    //if id not null then we wanna edit
    if (this.state.id) {
      axios
        .put("http://104.171.113.18:10606/api/v1/books/" + this.state.id, this.state)
        .then(() => {
          console.log("book edited successfullly!");
          this.setState(this.initialState);
        });
    } else {
      //we wanna add a new book
      //define the input book
      const book = {
        title: this.state.title,
        author: this.state.author,
        coverPhotoURL: this.state.coverPhotoURL,
        isbnNumber: this.state.isbnNumber,
        price: this.state.price,
        language: this.state.language,
      };

      console.log(book);

      //making the post request
      axios
        .post("http://104.171.113.18:10606/api/v1/books/", book)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            console.log(response.data);
            
            //alert("book inserted successfully!");
          }
        })
        .catch((e) => {
          console.log("catched error!"); //show notification
          store.addNotification({
            title: "OPS ☹,   Book not saved !",
            message: "Something went wrong ! ",
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        });
    }

    //show notification
    store.addNotification({
      title: "OK ! 😀",
      message: this.state.id
        ? "Book updated successfully"
        : "Book inserted successfully",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    //logging the values
    console.log(
      "title: ",
      this.state.title,
      "author: ",
      this.state.author,
      "coverUrl: ",
      this.state.coverPhotoURL,
      "isbn: ",
      this.state.isbnNumber,
      "price: ",
      this.state.price,
      "language: ",
      this.state.language
    );
  };

  //when the values in the form change
  handleChange = (e) => {
    //console.log(e.target.name, " ", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  //handling clear method
  handleReset = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const {
      title,
      author,
      coverPhotoURL,
      isbnNumber,
      price,
      language,
    } = this.state;
    return (
      <Card className="rounded shadow mt-5 bg-light">
        <Card.Header className="font-weight-bold text-center">
          <FontAwesomeIcon icon={faPlusSquare} /> Let's add a new Book 📚 🤗
        </Card.Header>
        <Form
          className={"font-weight-bold"}
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Card.Body>
            <Form.Row className="row">
              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>Title :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={title}
                  onChange={this.handleChange}
                  type="text"
                  name="title"
                  placeholder="Enter Book title"
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>Author :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={author}
                  onChange={this.handleChange}
                  type="text"
                  name="author"
                  placeholder="Enter Book Author"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="row">
              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>Cover Photo Url :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={coverPhotoURL}
                  onChange={this.handleChange}
                  type="text"
                  name="coverPhotoURL"
                  placeholder="cover photo"
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>ISBN number :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={isbnNumber}
                  onChange={this.handleChange}
                  type="text"
                  name="isbnNumber"
                  placeholder="Enter ISBN number"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="row">
              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>Price :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={price}
                  onChange={this.handleChange}
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail" className="col">
                <Form.Label>Language :</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={language}
                  onChange={this.handleChange}
                  type="text"
                  name="language"
                  placeholder="Enter the language"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer className="text-right">
            <Link className="btn btn-info mr-2" to="/list">
              📋 Book List
            </Link>
            <Button variant="secondary" type="reset">
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
            <Button variant="success" type="submit" className="ml-2">
              <FontAwesomeIcon icon={faSave} />{" "}
              {this.state.id ? "Update" : "Save"}
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}

export default Book;
