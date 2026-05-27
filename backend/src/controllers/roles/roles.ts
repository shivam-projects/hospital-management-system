import { Request, Response } from "express";
import * as roleService from "../../services/roles";

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.createRole(req.body);

    res.status(201).json({
      success: true,
      data: role,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRoles = async (
  req: Request,
  res: Response
) => {
  try {
    const roles = await roleService.getAllRoles();

    res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRoleById = async (
  req: Request,
  res: Response
) => {
  try {
    const role = await roleService.getRoleById(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRole = async (
  req: Request,
  res: Response
) => {
  try {
    const role = await roleService.updateRole(
      Number(req.params.id),
      req.body
    );

    res.status(200).json({
      success: true,
      data: role,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRole = async (
  req: Request,
  res: Response
) => {
  try {
    const response = await roleService.deleteRole(
      Number(req.params.id)
    );

    res.status(200).json({
      success: true,
      ...response,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};