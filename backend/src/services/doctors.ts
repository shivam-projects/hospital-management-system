import { pool } from "../config/db";

interface DoctorData {
  userId: number;
  departmentId: number;
  specialization: string;
  qualification?: string;
  experienceYears?: number;
  availabilityStatus?: boolean;
  licenseNumber?: string;
  profileImage?: string;
  consultationFee?: number;
}

export const createDoctor = async (
  data: DoctorData
) => {
  const {
    userId,
    departmentId,
    specialization,
    qualification,
    experienceYears,
    availabilityStatus,
    licenseNumber,
    profileImage,
    consultationFee,
  } = data;

  const existingDoctor = await pool.query(
    `
    SELECT id
    FROM doctors
    WHERE user_id = $1
    `,
    [userId]
  );

  if (existingDoctor.rows.length > 0) {
    throw new Error("Doctor already exists");
  }

  const result = await pool.query(
    `
    INSERT INTO doctors
    (
      user_id,
      department_id,
      specialization,
      qualification,
      experience_years,
      availability_status,
      license_number,
      profile_image,
      consultation_fee
    )
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8,$9)

    RETURNING *
    `,
    [
      userId,
      departmentId,
      specialization,
      qualification || null,
      experienceYears || 0,
      availabilityStatus ?? true,
      licenseNumber || null,
      profileImage || null,
      consultationFee || 0,
    ]
  );

  return result.rows[0];
};

export const getAllDoctors = async () => {
  const result = await pool.query(
    `
    SELECT
      d.id,

      d.specialization,
      d.qualification,
      d.experience_years,
      d.consultation_fee,
      d.availability_status,
      d.license_number,
      d.profile_image,

      u.id AS user_id,
      u.full_name,
      u.email,
      u.phone,

      dept.id AS department_id,
      dept.name AS department_name

    FROM doctors d

    JOIN users u
      ON u.id = d.user_id

    JOIN departments dept
      ON dept.id = d.department_id

    ORDER BY d.id DESC
    `
  );

  return result.rows;
};

export const getDoctorById = async (
  id: number
) => {
  const result = await pool.query(
    `
    SELECT
      d.id,

      d.specialization,
      d.qualification,
      d.experience_years,
      d.consultation_fee,
      d.availability_status,
      d.license_number,
      d.profile_image,

      u.id AS user_id,
      u.full_name,
      u.email,
      u.phone,

      dept.id AS department_id,
      dept.name AS department_name

    FROM doctors d

    JOIN users u
      ON u.id = d.user_id

    JOIN departments dept
      ON dept.id = d.department_id

    WHERE d.id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Doctor not found");
  }

  return result.rows[0];
};

export const updateDoctor = async (
  id: number,
  data: Partial<DoctorData>
) => {
  const {
    departmentId,
    specialization,
    qualification,
    experienceYears,
    availabilityStatus,
    licenseNumber,
    profileImage,
    consultationFee,
  } = data;

  const result = await pool.query(
    `
    UPDATE doctors
    SET
      department_id = COALESCE($1, department_id),
      specialization = COALESCE($2, specialization),
      qualification = COALESCE($3, qualification),
      experience_years = COALESCE($4, experience_years),
      availability_status = COALESCE($5, availability_status),
      license_number = COALESCE($6, license_number),
      profile_image = COALESCE($7, profile_image),
      consultation_fee = COALESCE($8, consultation_fee),
      updated_at = CURRENT_TIMESTAMP

    WHERE id = $9

    RETURNING *
    `,
    [
      departmentId,
      specialization,
      qualification,
      experienceYears,
      availabilityStatus,
      licenseNumber,
      profileImage,
      consultationFee,
      id,
    ]
  );

  if (result.rows.length === 0) {
    throw new Error("Doctor not found");
  }

  return result.rows[0];
};

export const deleteDoctor = async (
  id: number
) => {
  const result = await pool.query(
    `
    DELETE FROM doctors
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Doctor not found");
  }

  return {
    message: "Doctor deleted successfully",
  };
};