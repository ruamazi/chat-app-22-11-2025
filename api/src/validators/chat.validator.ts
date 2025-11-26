import { z } from "zod"

export const createChatValidator = z.object({
participantId: z.string().min(1, "Participant ID is required").optional(),
isGroup: z.boolean().optional(),
participants: z.array(z.string().trim().min(1, "Participant ID is required")).optional(),
groupName: z.string().trim().min(1, "Group name is required").optional(),
})

export const chatIdSchema = z.object({
    id: z.string().trim().min(1, "Chat ID is required"),
})