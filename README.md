# Locker Manager
A mini project to manage locker usage for saving ID card.

## Tested Running Environment
    * PC with OS windows 10 Pro
    * NodeJs latest v9.5.0
    * npm version 6.9.0

## Installation
    * NodeJS is already install in your PC".
    * Copy code inside root main folder to your desired location.

## How to run
    * Enter the location whihch useed to run the program.
    * Open CMD go to directory path inside the project folder.
    * Type "node index.js".

### Instruction List
    * "init <number_of_maximum_locker>" to Initialize the total number of locker.
    * "status" to show the current data (all in home).
    * "input <ID_card_type> <ID_card_number>" to add new data.
    * "leave <locker_numb>" to empty specified locker.
    * "find <ID_numb>" to find ID by using ID number.
    * "search <ID_type>" to find all ID with the same type it is passed.
    * "exit" to exit from the program.