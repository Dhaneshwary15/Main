import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { users } from "../utils/data";
import { User } from "../models/user";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

// Create a new user
export const createUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const parsed = userSchema.parse(req.body);
    const newUser: User = { id: `${users.length + 1}`, ...parsed };
    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    next(error); // Pass errors to centralized error handler
  }
};

// Retrieve all users
export const getUsers = (req: Request, res: Response): void => {
  res.json({ success: true, data: users });
};

// Retrieve a user by ID
export const getUserById = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
export const updateUser = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    const parsed = userSchema.parse(req.body);
    Object.assign(user, parsed);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// Delete a user by ID
export const deleteUser = (req: Request, res: Response): void => {
  const index = users.findIndex((u) => u.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: "User not found" });
    return;
  }
  users.splice(index, 1);
  res.status(204).send();
};
