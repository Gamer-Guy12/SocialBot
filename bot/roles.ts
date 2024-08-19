import type { GuildMember } from "discord.js";
import { prisma } from "~/prisma/client";
import { getGuild } from "./utils";

async function setRole(user: GuildMember) {
    const check = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!check) return

    if (check.socialCredit < 0) {
        user.roles.add([process.env.GULAG_ROLE as string])
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                gulag: true
            }
        })
    } else {
        user.roles.remove([process.env.GULAG_ROLE as string])
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                gulag: false
            }
        })
    }

    if (user.roles.cache.has(process.env.LEADER_ROLE as string)) {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                leader: true
            }
        })
    } else {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                leader: false
            }
        })
    }
}

async function updateAllRoles() {
    (await getGuild()).members.cache.forEach(async user => {
        await setRole(user)
    })
}

export {
    setRole,
    updateAllRoles
}