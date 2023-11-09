import { NextResponse } from "next/server"
import User from "@/models/User"
import { type User as UserType } from "@/types/user.types"
import { connectDB } from "@/utils/mongoose"
import { formatName } from "@/utils/fx/format"

export const POST = async (req: Request) => {
  const { name, phone }: { name: string; phone: number } = await req.json()

  await connectDB()

  try {
    const parsedName = formatName(name)
    if (!parsedName) throw new Error("El nombre no es válido")

    const user: UserType | null = await User.findOne({
      phone: phone,
    })
    if (!user) {
      // Si no lo encuentra, lo crea
      const newUser = new User({ name: parsedName, phone })
      const savedUser = await newUser.save()
      return NextResponse.json(
        { user: savedUser, message: "Usuario creado exitosamente" },
        {
          status: 201,
          statusText: "Created",
        }
      )
    } else {
      // Si lo encuentra, lo retorna
      return NextResponse.json(
        { user, message: `Bienvenido de nuevo, ${user?.name?.split(" ")[0]}` },
        {
          status: 200,
          statusText: "Ok",
        }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const _id = url.searchParams.get("_id")
  await connectDB()

  try {
    const user = await User.findById(_id)
    if (!user) throw new Error("Usuario no encontrado")

    return NextResponse.json(
      {
        user,
        message: "Usuario encontrado",
      },
      {
        status: 200,
        statusText: "Ok",
      }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 400,
        statusText: "Bad Request",
      }
    )
  }
}
