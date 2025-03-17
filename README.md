## Git Commit Message Template

wip: work in progress

feat: The new feature you're adding to a particular application

fix: A bug fix

style: Feature and updates related to styling

refactor: Refactoring a specific section of the codebase

test: Everything related to testing

docs: Everything related to documentation

chore: Regular code maintenance.[ You can also use emojis to represent commit types]

    1. Separate the subject from the body with a blank line

    2. Your commit message should not contain any whitespace errors

    3. Remove unnecessary punctuation marks

    4. Do not end the subject line with a period

    5. Capitalize the subject line and each paragraph

    6. Use the imperative mood in the subject line

    7. Use the body to explain what changes you have made and why you made them.

    8. Do not assume the reviewer understands what the original problem was, ensure you add it.

    9. Do not think your code is self-explanatory

    10. Follow the commit convention defined by your team

Example:

git commit -m "Add user authentication middleware for API routes" -m "Implement JWT-based authentication system to protect private API endpoints from unauthorized access.

The previous implementation lacked proper authentication checks, allowing any user to access sensitive data endpoints. This change:

- Creates a new middleware function that verifies JWT tokens
- Adds token validation on all /api/user/\* routes
- Implements proper error handling for expired or invalid tokens
- Updates tests to include authentication scenarios

This resolves issue #142 and follows our team's security requirements."

---

## JSDOC

https://jsdoc.app

For example, if the function is a constructor for a class, you can indicate this by adding a @constructor tag.

Use a JSDoc tag to describe your code
/\*\*

- Represents a book.
- @constructor
  \*/
  function Book(title, author) {
  }

Adding more information with tags
/\*\*

- Represents a book.
- @constructor
- @param {string} title - The title of the book.
- @param {string} author - The author of the book.
  \*/
  function Book(title, author) {
  }

<Grid container>
    {/* Rendera dynamiskt */}
    <Grid item key={{/*game.id?*/}}>
    <GameCard 
    gameImage={game.image}/>
    </Grid>
</Grid>
