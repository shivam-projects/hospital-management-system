import { Request, Response } from "express";
import * as doctorService from "../../services/doctors";

export const createDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const doctor =
      await doctorService.createDoctor(req.body);

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllDoctors = async (
  req: Request,
  res: Response
) => {
  try {
    const doctors =
      await doctorService.getAllDoctors();

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDoctorById = async (
  req: Request,
  res: Response
) => {
  try {
    const doctor =
      await doctorService.getDoctorById(
        Number(req.params.id)
      );

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const doctor =
      await doctorService.updateDoctor(
        Number(req.params.id),
        req.body
      );

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const response =
      await doctorService.deleteDoctor(
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