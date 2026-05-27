import { Request, Response } from "express";
import * as departmentService from "../../services/departments";

export const createDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const department =
      await departmentService.createDepartment(req.body);

    res.status(201).json({
      success: true,
      data: department,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDepartments = async (
  req: Request,
  res: Response
) => {
  try {
    const departments =
      await departmentService.getAllDepartments();

    res.status(200).json({
      success: true,
      data: departments,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response
) => {
  try {
    const department =
      await departmentService.getDepartmentById(
        Number(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const department =
      await departmentService.updateDepartment(
        Number(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      data: department,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response
) => {
  try {
    const response =
      await departmentService.deleteDepartment(
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