import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db";
const jwt_secret = process.env.JWT_SECRET;


interface SignupData {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  roleId: number;
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const { fullName, email, password, phone, roleId } = data;

  const existingUser = await pool.query(
    "SELECT id FROM public.users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO public.users
    (full_name, email, password, phone, role_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, full_name, email, phone, role_id, created_at
    `,
    [fullName, email, hashedPassword, phone || null, roleId]
  );

  return result.rows[0];
};

export const login = async (data: LoginData) => {
  const { email, password } = data;

  const result = await pool.query(
    `
    SELECT u.*, r.name AS role_name
    FROM public.users u
    JOIN public.roles r ON r.id = u.role_id
    WHERE u.email = $1
    `,
    [email]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      roleId: user.role_id,
      role: user.role_name,
    },
    jwt_secret as string,
    { expiresIn: "7d" }
  );

  return {
    token
  };
};