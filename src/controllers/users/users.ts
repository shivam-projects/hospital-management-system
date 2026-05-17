import { Request, Response } from "express";
import * as userService from "../../services/users";

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await userService.signup(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data = await userService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successfully.",
      data,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};