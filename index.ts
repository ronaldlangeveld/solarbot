// import { bot } from "./services/telegram_bot/index";
import { startCron } from "./services/sched/jobs";
import { getLatestGridFrequency } from "./utils/db/queries/getLatestGridFreq";
import { getOutagesCount } from "./utils/db/queries/getOutagesCount";
import { testPower } from "./services/tasks/testPower";

const port = 3123;

const server = Bun.serve({
  port,
  routes: {
    "/api/currentStatus": async () => {
      const data = await getLatestGridFrequency();
      console.log("Current grid frequency:", data);
      return Response.json(data);
    },
    "/api/dailyCount": async () => {
      const data = await getOutagesCount();
      return Response.json(data);
    },
    "/api/ping": async () => {
      const data = await testPower();
      return Response.json(data);
    },
  },
});

console.log(`App is running at ${server.url}`);
console.log(`API endpoints:`);
console.log(`- ${server.url}api/currentStatus`);
console.log(`- ${server.url}api/dailyCount`);
console.log(`- ${server.url}api/ping`);

// startCron();
// bot.start();
