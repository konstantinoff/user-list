import axios from "axios";
import { User } from "../types";

const getUsers = (): Promise<User[]> =>
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);

export default getUsers;
