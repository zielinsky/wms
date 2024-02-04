//importing modules
import express from "express";
import { app } from "../index";
import { UserController } from "../controllers/user.controller";

//get posts

app.get("/api/users", UserController.getUsers);
