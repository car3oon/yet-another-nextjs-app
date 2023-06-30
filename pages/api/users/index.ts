import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const users = new Array(15)
  .fill(1)
  .map((_, i) => ({
    id: (Date.now() + i).toString(),
    name: `User nr ${i}`,
  }));

const router = createRouter<NextApiRequest, NextApiResponse>();


router
  .get((req, res) => {
    res.json({ data: users });
  })

  export default router.handler({
    onError: (err, req, res) => {
      console.error(err.stack);
      res.status(err.statusCode || 500).end(err.message);
    },
  });
