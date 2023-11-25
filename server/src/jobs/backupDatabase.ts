import { CronJob } from "cron";
import { backupDatabase } from "../database/utils/backupDatabase";

export default CronJob.from({
  cronTime: "1 * * * * *", // runs every minute
  onTick: async () => {
    const chalk = (await import("chalk")).default;
    console.log(chalk.blue("[cron job] starting database backup..."));
    await backupDatabase();
    console.log(chalk.blue("[cron job] database backup ended"));
  },
  runOnInit: true,
});
