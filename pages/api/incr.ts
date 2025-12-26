import { Redis } from "@upstash/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const redis = process.env.UPSTASH_REDIS_REST_URL
  ? Redis.fromEnv()
  : null;

export default async function incr(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "use POST" });
  }

  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ error: "must be json" });
  }

  const { slug } = req.body;

  if (!slug) {
    return res.status(400).json({ error: "Slug not found" });
  }

  // Se Redis não estiver configurado, retorna sucesso silenciosamente
  if (!redis) {
    return res.status(202).json({ success: true });
  }

  try {
    // Get IP address
    const forwarded = req.headers["x-forwarded-for"];
    const ip = typeof forwarded === "string"
      ? forwarded.split(",")[0]
      : req.socket.remoteAddress;

    if (ip) {
      // Hash the IP in order to not store it directly in your db.
      const hash = crypto
        .createHash("sha256")
        .update(ip)
        .digest("hex");

      // deduplicate the ip for each slug
      const isNew = await redis.set(
        ["deduplicate", hash, slug].join(":"),
        true,
        {
          nx: true,
          ex: 24 * 60 * 60,
        }
      );

      if (!isNew) {
        return res.status(202).json({ success: true });
      }
    }

    await redis.incr(["pageviews", "projects", slug].join(":"));
    return res.status(202).json({ success: true });
  } catch (error) {
    console.error("Redis error:", error);
    // Silently fail if Redis is not configured
    return res.status(202).json({ success: true });
  }
}
