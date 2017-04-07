### Defense 1 Feedback

* Vague messages on no token and unauthorized token - _*rectified*_

* When getting all users most information returned is not necessary for a regular user to see; return facing information only - _*Made the get all users route an admin access route*_

* Don't return actual catch block errors - _*done*_

* Update user route has a wrong status code and the message returned on updating other users is inaccurate - _*rectified*_

* Read on how the jwt signature works and how to mitigate id access on the front end; decode the jwt from the backend - _*partly done*_

* Get specific user documents - returns other people's private docs - _*done*_

* Search: return a descriptive message if doesn't exist, and have object values instead of an array returned - _*done*_

* Same user shouldn't have duplicate docs - _*done*_

* Change status code on trying to delete documents a user doesn't own - _*done*_

* On document search: return title and content only - _*done*_


### Defense 2 Feedback

* Never pass passwords to responses - whether to admin or not - _*done*_

* Test that a user cannot delete another user - _*done*_

* Test that the admin can get all users - _*done*_

* Doc spec indentation - line 17 - _*done*_

* Add a test for duplicate documents - _*done*_

* In document searches, test that it goes through both title and content. Use two test cases - search for a unique word in title and the same in content _*pending*_

* In search results test for part-word searches - use contain instead of equal in checking for result _*pending*_

* Test for token expiry. Use iat _*pending*_

* In document tests use count to test for the return of private and public docs _*pending*_
