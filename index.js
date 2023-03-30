const express = require("express");
const { WebClient } = require("@slack/web-api");

const app = express();

// Initialize a new Slack API client
const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

// Define a route that handles the "Update Status" shortcut
app.post("/update-status", async (req, res) => {
  const { trigger_id } = req.body;

  // Open a modal dialog to get the new status text and time from the user
  const dialog = {
    trigger_id,
    dialog: {
      callback_id: "set_status",
      title: "Update Status",
      submit_label: "Update",
      elements: [
        {
          type: "textarea",
          name: "status_text",
          label: "Status Text",
        },
        {
          type: "text",
          name: "status_time",
          label: "Status Time (in 24-hour format, e.g. 09:00)",
        },
      ],
    },
  };
  await slackClient.dialog.open(dialog);

  res.sendStatus(200);
});

app.post("/update-status-submit", async (req, res) => {
  const { submission, user } = req.body;

  // Parse the time input from the user
  const [hours, minutes] = submission.status_time.split(":").map(Number);

  // Schedule a job to update the user's status at the specified time
  const job = cron.schedule(
    `${minutes} ${hours} * * *`,
    async () => {
      await slackClient.users.profile.set({
        user: user.id,
        profile: {
          status_text: submission.status_text,
          status_emoji: ":writing_hand:",
          status_expiration: 0,
        },
      });
    },
    {
      scheduled: true,
      timezone: user.tz_offset / 3600, // Convert the user's TZ offset to hours
    }
  );

  // Store the job ID in the user's profile so we can cancel it later if needed
  await slackClient.users.profile.set({
    user: user.id,
    profile: {
      status_job_id: job.id,
    },
  });

  res.json({
    response_action: "clear",
    replace_original: true,
  });
});
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
