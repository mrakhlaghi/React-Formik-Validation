import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import usersDB from "../database/database";

var mock = new MockAdapter(axios);
mock.onGet("/users").reply(200, {...usersDB});

export default mock