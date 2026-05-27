import { pool } from "../config/db";

interface DepartmentData {
  name: string;
  description?: string;
}

export const createDepartment = async (
  data: DepartmentData
) => {
  const { name, description } = data;

  const existingDepartment = await pool.query(
    `
    SELECT id
    FROM public.departments
    WHERE name = $1
    `,
    [name]
  );

  if (existingDepartment.rows.length > 0) {
    throw new Error("Department already exists");
  }

  const result = await pool.query(
    `
    INSERT INTO public.departments
    (name, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [name, description || null]
  );

  return result.rows[0];
};

export const getAllDepartments = async () => {
  const result = await pool.query(
    `
    SELECT *
    FROM public.departments
    ORDER BY id ASC
    `
  );

  return result.rows;
};

export const getDepartmentById = async (
  id: number
) => {
  const result = await pool.query(
    `
    SELECT *
    FROM public.departments
    WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Department not found");
  }

  return result.rows[0];
};

export const updateDepartment = async (
  id: number,
  data: Partial<DepartmentData>
) => {
  const { name, description } = data;

  const result = await pool.query(
    `
    UPDATE public.departments
    SET
      name = COALESCE($1, name),
      description = COALESCE($2, description)
    WHERE id = $3
    RETURNING *
    `,
    [name, description, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Department not found");
  }

  return result.rows[0];
};

export const deleteDepartment = async (
  id: number
) => {
  const result = await pool.query(
    `
    DELETE FROM public.departments
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Department not found");
  }

  return {
    message: "Department deleted successfully",
  };
};