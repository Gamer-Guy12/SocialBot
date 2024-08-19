import type { GuildMember, User } from "discord.js";
import { prisma } from "./client";

async function checkForUser(id: string): Promise<boolean> {

    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return user ? true : false

}

async function createUser(user: GuildMember) {
    await prisma.user.create({
        data: {
            id: user.id,
            name: user.displayName,
            gulag: user.roles.cache.get(process.env.GULAG_ROLE as string) === undefined ? false : true,
            leader: user.roles.cache.get(process.env.LEADER_ROLE as string) === undefined ? false : true
        }
    })
}

async function createUserIfNone(user: GuildMember) {
    if (await checkForUser(user.id)) return
    createUser(user)
}

export {
    createUserIfNone,
    checkForUser,
    createUser
}