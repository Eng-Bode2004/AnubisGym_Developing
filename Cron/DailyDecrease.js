import cron from "node-cron";
import UserMembershipService from "../Services/UserMembershipService.js";

cron.schedule("0 0 * * *", async () => { // Runs every day at midnight
    console.log("⏳ Running daily membership decrease...");
    await UserMembershipService.decreaseDaily();
});
