// import cron from "node-cron";
// import { Borrow } from "../models/borrowModel.js";
// import { User } from "../models/userModel.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export const notifyUsers = () => {
//   console.log("hello");
//   cron.schedule("*/1 * * * * *", async () => {
//     try {
//       const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//       const borrowers = await Borrow.find({
//         dueDate: {
//           $lt: oneDayAgo,
//         },
//         returnDate: null,
//         notified: false,
//       });

//       for (const element of borrowers) {
//         if (element.user && element.user.email) {
//           const user = await User.findById(element.user.id);
//           sendEmail({
//             email: element.user.email,
//             subject: "Book return reminder",
//             message: `Hello ${element.user.name}, \n\nThis is a reminder that the book you borrowed id due for the next day. Please return the book on time.\nThank you.`,
//           });
//           element.notified = true;
//           await element.save();
//           console.log(`email send to ${element.user.email}`);
//         }
//       }
//     } catch (error) {
//       console.error("Some error occured whule notifing. ", error);
//     }
//   });
// };

import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    // Runs every 10 seconds for testing

    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const borrowers = await Borrow.find({
        dueDate: { $lt: oneDayAgo },
        returnDate: null,
        notified: false,
      });

      if (borrowers.length === 0) {
        console.log("✅ No due books found.");
        return;
      }

      for (const element of borrowers) {
        if (element.user && element.user.email) {
          console.log(`📨 Sending email to: ${element.user.email}`);

          await sendEmail({
            email: element.user.email,
            subject: "Book Return Reminder",
            message: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for return. Please return it on time.\nThank you.`,
          });

          element.notified = true;
          await element.save();
        }
      }
    } catch (error) {
      console.error("❌ Error occurred while notifying: ", error);
    }
  });
};
