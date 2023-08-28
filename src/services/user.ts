import prisma from "@/lib/prisma";
import { hash } from "@/lib/hash";
import { exclude } from "@/lib/exclude-prisma";
import { CreateUser } from "@/schema/user.schema";

export const createUser = async (data: CreateUser) => {
  const hashedPassword = await hash(data.password);
  return prisma.user.create({
    data: { ...data, password: hashedPassword },
    select: exclude("User", ["password"]),
  });
};

export const getFullUserByEmail = async (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const isEmailTaken = async (email: string) =>
  !!(await getFullUserByEmail(email));
