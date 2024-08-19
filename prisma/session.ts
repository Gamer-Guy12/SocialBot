import { prisma } from "./client";

async function checkForSession(session: string): Promise<boolean> {
    try {
        prisma.session.findUniqueOrThrow({
            where: {
                id: session
            }
        })

        return true
    } catch (err) {
        return false
    }
}