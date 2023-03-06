# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- I prefer separate different logic in different functions;
- I added some JSdoc comments;
- Constants must be provided by a config service, or in a specific file for it;
- I prefer to avoid hard code text;
- If a condition interrupt the method execution, I prefer make it clear, and return the result there rather than put the entire method inside a'else' block,
This way it's not necessary to read the entire method to know the reason for that condition;
- If there're only one possible value to be returned in that point, I prefer return this value explicitly instead of put it in a variable,
for example, I prefer return undefined, then declare implicitly a variable as undefined, and then return it.
This way you know exactly what is happening there;
- I prefer centralizing all the file exportations in one place; this way you know exactly what is being exported looking only one place
- Project configurations and functions must be async because nowadays almost every lib works with promises, some common features work in async process as well, so this way you avoid refactoring in the future;
- Separating logic in small functions makes it easy for testing