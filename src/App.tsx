import React, { useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { User } from "./types";
import { useQuery } from "react-query";
import getUsers from "./api/getUsers";
import UsersTable from "./components/UsersTable";

function App() {
  const {
    isLoading,
    data = [],
    error,
  } = useQuery<User[], Error>("users", getUsers);
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const usersRender = useMemo(() => {
    if (searchText.length > 2) {
      return data.filter((user) =>
        user.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      );
    }

    return data;
  }, [searchText, data]);

  if (error) {
    return (
      <Container className="mt-5" fluid="md">
        <Row>
          <Col>
            <Alert variant="danger">{error.message}</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5" fluid="md">
      <Row className="justify-content-end">
        <Col xs={3}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              value={searchText}
              onChange={handleSearchText}
              type="text"
              disabled={data.length === 0}
              placeholder="Type text to search user"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <UsersTable isLoading={isLoading} users={usersRender} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
