# Birdie Test

This is an application that allows user to see data for home care recipient. 
The users will need to know the care recipient Id in order to see their data.

## Background

This Application was made with **Typescript** , **Sequelize** and **Jest** for the backend 
while the frontend was made with **React**, **Jest** and **Grommet** framework for the ui. 

## Configuration

You will need to have the following environment variables in your `.env` set for the application to run:

`backend root folder`

```
DB_NAME=<insert db name>
DB_HOST=<insert host>
DB_USERNAME=<insert username>
DB_PASSWORD=<insert db password>
```

## Getting started

1. Start the API. (Run the following commands within the `backend` folder)

   a. Install the dependencies

   ```bash
   npm install
   ```

   b. Run the HTTP server (will start on port `8000`)

   ```bash
   npm run dev
   ```

2. Start the React app  (Run the following commands within the `front-end` folder)

    a. Install the dependencies

   ```bash
   npm install
   ```

   b. Run the application (will start on port `3000`)

   ```bash
   npm start
   ```

## Testing

To test the application run the following command in respective folders:

```bash
npm test
```

## Reflection

### What I'm pleased with

- I am pleased with the backend where pagination is used therefore the API wont sent too "heavy" data to the frontend. I also like the use of sequelize because it makes managing databases easier and more secure.
- In front-end, I like how the table can rendered a different column according to eventTypes. It also have validation for the careRecipientId to ensure users type in the correct format of care recipient Id.

### Room for improvement

- I should be doing smaller commits, and with additional time, I would add more testing such as integration tests. I would also love to display the data differently according to event type instead of only using a table.
- The Api I created can also process some optional params such as careGiverId, startDate and endDate, with more time, I would introduced a filter option in the front-end to filter events according to said params.
