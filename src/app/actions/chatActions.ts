'use server';

import { prisma } from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createGuestTicket(formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const conversation = await prisma.conversation.create({
      data: {
        guestEmail: email,
        subject: subject,
        messages: {
          create: {
            sender: 'GUEST',
            content: message,
          }
        }
      }
    });

    return { success: true, conversationId: conversation.id };
  } catch (error: any) {
    console.error('Error creating ticket:', error);
    return { success: false, error: error.message };
  }
}

export async function adminReplyToChat(conversationId: string, content: string) {
  try {
    await prisma.message.create({
      data: {
        conversationId,
        sender: 'ADMIN',
        content,
        isRead: true, // Admin is sending it
      }
    });

    revalidatePath(`/admin/chats/${conversationId}`);
    return { success: true };
  } catch (error: any) {
    console.error('Error replying to chat:', error);
    return { success: false, error: error.message };
  }
}

export async function closeConversation(conversationId: string) {
  try {
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { status: 'CLOSED' }
    });
    
    revalidatePath('/admin/chats');
    revalidatePath(`/admin/chats/${conversationId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
