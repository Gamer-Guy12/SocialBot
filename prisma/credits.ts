import type { GuildMember } from "discord.js"
import { prisma } from "./client"

async function giveCredits(user: GuildMember, amount: number) {
    const old = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!old) throw "Error getting user to accredit"

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            socialCredit: old?.socialCredit + amount
        }
    })
}

async function clearCredits() {
    await prisma.user.updateMany({
        data: {
            socialCredit: 100
        }
    })
}

async function getCredits(user: GuildMember): Promise<number> {
    const value = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })

    if (!value) throw "Error checking credits"

    return value?.socialCredit
}

export {
    giveCredits,
    clearCredits,
    getCredits
}