import { pool } from "../config/db";

interface RoleData {
  code: string;
  name: string;
}

export const createRole = async (data: RoleData) => {
  const { code, name } = data;

  const existingRole = await pool.query(
    "SELECT id FROM public.roles WHERE code = $1 OR name = $2",
    [code, name]
  );

  if (existingRole.rows.length > 0) {
    throw new Error("Role already exists");
  }

  const result = await pool.query(
    `
    INSERT INTO public.roles (code, name)
    VALUES ($1, $2)
    RETURNING *
    `,
    [code, name]
  );

  return result.rows[0];
};

export const getAllRoles = async () => {
  const result = await pool.query(
    `
    SELECT id, code, name, created_at
    FROM public.roles
    ORDER BY id ASC
    `
  );

  return result.rows;
};

export const getRoleById = async (id: number) => {
  const result = await pool.query(
    `
    SELECT id, code, name, created_at
    FROM public.roles
    WHERE id = $1
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Role not found");
  }

  return result.rows[0];
};

export const updateRole = async (
  id: number,
  data: Partial<RoleData>
) => {
  const { code, name } = data;

  const result = await pool.query(
    `
    UPDATE public.roles
    SET
      code = COALESCE($1, code),
      name = COALESCE($2, name)
    WHERE id = $3
    RETURNING *
    `,
    [code, name, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Role not found");
  }

  return result.rows[0];
};

export const deleteRole = async (id: number) => {
  const result = await pool.query(
    `
    DELETE FROM public.roles
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Role not found");
  }

  return {
    message: "Role deleted successfully",
  };
};