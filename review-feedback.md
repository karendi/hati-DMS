### Backend Review Feedback:


##### Thomas Nyambati:

* Code indentation
* Avoid else statements by checking the edge cases in the if statements e.g: 

              if (error) { 
            				console.log('error’)
          				}
          				console.log(`App listening on port ${port}...`) ; 

* Refactor server imports and exports back to es5
* Index files are entry points and they shouldn’t be capitalized
* Refactor repetitive code - DRY
* Return an ‘error’ key value in catch blocks rather than ‘message’
* Consider using res.json({}) over res.send({})
* Figure out how to only update what was updated and reduce the number of queries to the db
* Null option where a limit or offset values haven’t been set may be unnecessary
* Pass doc access checks when checking for a specific document in the query
* When searching documents - make consideration for document access
* Set sanity checks in private methods
* Consider trash options on deletions
* Avoid one-liners for readability sake - break down the response in several lines
* Use descriptive variables
* Understand db errors and handle them in catch blocks
* Avoid unnecessary db queries
* Avoid repetitive if blocks
* Remove the secret key in the codebase
* Find user from the db before verifying token
* Consider importing app into the in the routes files instead



##### Brian Koech:

* Return null password on creating user and listing users
* On invalid login - return a vague enough message e.g. Wrong email/password combination
* Consider trash instead complete deletion
* Test the token expiry
* Bug - it only returns the title error if both doc fields are empty
* Set minimum title and content length
* Add comments
