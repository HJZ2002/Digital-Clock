# Digital Clock

A real-time digital clock built with React and Vite that displays your local time alongside live world clocks from 9 major cities.

## How It Works

The app uses React's `useState` and `useEffect` hooks to update the time every second using `setInterval`. The local time is displayed at the top, and 9 world city clocks are shown in a grid below using the browser's built-in `Intl.DateTimeFormat` API to convert time zones accurately.

Each city card shows:
- The country code and city name
- The current local time in that city
- The UTC offset
- A dot indicator — yellow for daytime, indigo for nighttime

The clock also detects the current date and shows a greeting or holiday label such as Good Morning, Good Evening, or a holiday name if today matches a known date.
## Cities Included

New York, London, Paris, Dubai, Tokyo, Sydney, Singapore, Manila, São Paulo
