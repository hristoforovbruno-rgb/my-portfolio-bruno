import type { Request, Response } from "express";
import { getRecentActivity } from "../store/cms-store.js";
import { countMessages, getRecentMessages } from "../store/data-store.js";

export async function getDashboardStatsController(_request: Request, response: Response) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const [totalMessages, unreadMessages, recentMessages, messagesThisWeek, messagesThisMonth, recentActivity] = await Promise.all([
    countMessages(),
    countMessages({ isRead: false }),
    getRecentMessages(5),
    countMessages({ fromDate: sevenDaysAgo }),
    countMessages({ fromDate: thirtyDaysAgo }),
    getRecentActivity(6),
  ]);

  response.json({
    totalMessages,
    unreadMessages,
    messagesThisWeek,
    messagesThisMonth,
    recentMessages,
    recentActivity,
  });
}
