# Find Focus


Usage
To use this app, you'll need to create a new Slack app and bot. You can follow the instructions in the Slack API documentation here to do this.

Once you have created your Slack app and bot, you'll need to set the following environment variables:

SLACK_APP_TOKEN: The app token for your Slack app
SLACK_BOT_TOKEN: The bot token for your Slack bot
SCHEDULE: The schedule on which to update your Slack status (in Cron format)

You can set these environment variables in a .env file in the root directory of your project:

```
SLACK_APP_TOKEN=your-app-token-here
SLACK_BOT_TOKEN=your-bot-token-here
SCHEDULE=* * * * *

```
Replace `your-app-token-here` and `your-bot-token-here` with the appropriate values for your Slack app and bot.

Once you have set your environment variables, you can start the app by running:

```

npm start

```

This will start the app and begin updating your Slack status on the schedule that you specified.

Deployment
To deploy this app to Vercel, you'll need to have the Vercel CLI installed. You can install it by running:

```

npm install -g vercel

```

Once you have the Vercel CLI installed, you can deploy your app by running:


```

vercel deploy

```

This will deploy your app to a Vercel subdomain. If you want to deploy to a custom domain, you can follow the instructions in the Vercel documentation here.

Conclusion
That's it! You now have a Slack Status Updater app that you can use to update your Slack status on a schedule. If you have any issues or questions, feel free to open an issue in this repository or contact me directly