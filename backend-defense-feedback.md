### Defense 1 Feedback

Vague messages on no token and unauthorized token - _rectified_

When getting all users most information returned is not necessary for a regular user to see; return facing information only - _Made the get all users route an admin access route_

Don't return actual catch block errors - _done_

Update user route has a wrong status code and the message returned on updating other users is inaccurate - _rectified_

Read on how the jwt signature works and how to mitigate id access on the front end; decode the jwt from the backend. _pending_

Get specific user documents - returns other people's private docs - _rectified_

Search: return a descriptive message if doesn't exist, and have object values instead of an array returned - _done_

Same user shouldn't have duplicate docs - _done_

Change status code on trying to delete documents a user doesn't own - _done_

On document search: return title and content only _done_
