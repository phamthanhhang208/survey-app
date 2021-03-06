# Survey-app

## Requirements

- User can create form. Within the form, user can add questions and answers:
  - A question has 4 types: multiple choice, checkbox, short paragraph and long paragraph
- User can also update the form. The responses of the previous form would still be kept
- User can delete the form and as well as all the form's responses.
- User can view the responses and the application will perform a chart analyzes if needed

### Question:

- Each question has 3 important fields: question, validation and answer
- Base on the type of the question, the answer and validation vary:
  - Short answer:
    - Number : the answer is a number
    - Text : the answer is a text
    - Length: maximum or minimum of character count
  - Pararaph:
    - Length: maximum or minimum of character count
  - Checkboxes:
    - Select at least
    - Select at most
    - Select exactly

### Responses:

- Base on the type of the question, the application provide a different chart to represent the responses.
- User can also view each response

## Technology:

- Frontend : ReactJS
- Backend : Node.JS, Mongoose, Express, Ajv

### To Do:

- Backend:
  - [-] Add more validation for short answer
  - [x] Add image for question and answer
  - [x] Add error code and message
  - [x] Refactor code for better error handling
  - [x] Add analytic API
  - [x] Export to Excel
