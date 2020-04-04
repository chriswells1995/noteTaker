# Unit 11 Express Homework: Note Taker 
# by Chris Wells

## Description
A website that allows the user to write a note with a title, 
which is then saved to a list of notes which can be viewed by clicking on the title,
and deleted by clicking on the trash can.


## Development
The focus was using express servers to create functioning webpage with API calls. 
We had already worked with the client side of API calls, now we were working the the server side.

I struggled a bit, nameley with the JSON file, and combining old fs functions with new topics.
But with help I was able to figure things out mostly. My biggest critique of my current work is the ID.
Currently the ID is assigned based off of a globalID that increases by one every time a note is created. 
In theory this should work fine, as each note will have a unique ID, one bigger than the last, 
but it would be more efficient to read from the JSON file and get the ID from the index number.
As is, whenever the server is restarted (like how nodemon resets whenever a change is made in testing)
the globalID will go back to 0, and new notes could have the same ID as previous notes. 
I don't believe this will be an issue with the live webpage, 
but it's still something I would like to fix in the future.




## User Story

AS A user, I want to be able to write and save notes

I WANT to be able to delete notes I've written before

SO THAT I can organize my thoughts and keep track of tasks I need to complete


