import Table from "react-bootstrap/Table";
import Placeholder from "react-bootstrap/Placeholder";
import React from "react";
import { User } from "../../types";

const UsersTable = ({
  users,
  isLoading,
}: {
  users: User[];
  isLoading: boolean;
}) => {
  return (
    <Table striped bordered hover size="xs">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        {isLoading
          ? Array(5)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td colSpan={5}>
                    <Placeholder animation="glow">
                      <Placeholder xs={12} />
                    </Placeholder>
                  </td>
                </tr>
              ))
          : users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.website}</td>
              </tr>
            ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
