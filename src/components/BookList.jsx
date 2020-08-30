import React, { Component } from "react";
import { Card, Table, Image, ButtonGroup, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { store } from "react-notifications-component";
import { Link } from "react-router-dom";

class BookList extends Component {
  state = {
    books: [],
  };

  //this method is invoked immedietly after a component
  //is mounted(inserted into the tree)
  componentDidMount = () => {
    //calling this method to get all books and render them
    this.getAllBooks();
  };

  //this method is invoked immedietly after
  //updating occurs
  componentDidUpdate = () => {};

  //a method responsibile for getting all books from the server
  getAllBooks = () => {
    axios
      .get("http://104.171.113.18:10606/api/v1/books/")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: data,
        });
        console.log(this.state.books);
      });
  };

  //hanling delete button
  handleDelete = (book_id) => {
    axios
      .delete("http://104.171.113.18:10606/api/v1/books/" + book_id)
      .then((response) => {
        if (response.data != null) {
          console.log("book deleted successfully!");

          //rerender the table
          this.getAllBooks();

          //show notification
          store.addNotification({
            title: "Ok ! ",
            message: "Book deleted successfully",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
      });
  };

  render() {
    return (
      <Card className="bg-light shadow mt-5 rounded">
        <Card.Body>
          <Card.Header className="font-weight-bold text-center">
            <FontAwesomeIcon icon={faList} /> Here is the list of Books 📚😃
          </Card.Header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>ISBN Number</th>
                <th>Language</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.books.length === 0 ? (
                <tr align="center">
                  <td colSpan="6">No Books Available 👀</td>
                </tr>
              ) : (
                this.state.books.map((book) => (
                  <tr key={book.id}>
                    <td>
                      <Image
                        src={book.coverPhotoURL}
                        roundedCircle
                        width="25"
                        height="25"
                      />{" "}
                      {book.title}
                    </td>
                    <td>{book.author}</td>
                    <td>{book.isbnNumber}</td>
                    <td>{book.language}</td>
                    <td>
                      <ButtonGroup>
                        <Link
                          className="btn btn-secondary"
                          to={"/edit/" + book.id}
                        >
                          <FontAwesomeIcon
                            size="sm"
                            icon={faEdit}
                          ></FontAwesomeIcon>
                        </Link>

                        <Button
                          variant="danger"
                          onClick={this.handleDelete.bind(this, book.id)}
                        >
                          <FontAwesomeIcon
                            size="sm"
                            icon={faTrash}
                          ></FontAwesomeIcon>
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}

export default BookList;
