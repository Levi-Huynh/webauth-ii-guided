##The basic workflow when using a combination of cookies and sessions for authentication is:

client sends credentials.
server verify credentials.
server creates a session for the client.
server produces and sends back cookie.
client stores the cookie.
client sends cookie on every request.
server verifies that cookie is valid.
server provides access to resource.


#its the presence of the key, that opens door..not the presence of the person (like hotel key)


#Common ways to store session data on the server:
memory
    -storing in memory, when server restarts, there is a wipeout of memory including session data
memory cache (like Redis and Memcached)
    -most big companies store sessions here (seperate server for sessions needed for larger number of clients or security)
database
    -persistent data (no wipeout), not optimized for sessions data, slower then memory cache

-libraries normaly take care of sessions clean up



#Cookies
automatically included on every request
unique to each domain + device pair
cannot be sent to a different domain
sent in the cookey header
has a body that can have extra identifying information
max size around 4KB

#Storing session data in memory
data stored in memory is wiped when the server restarts.
causes memory leaks as more and more memory is used as the application continues to store data in session for different clients.
good for development due to its simplicity.


#Using cookes to transfer session data.
a cookie is a small key/value pair data structure that is passed back and forth between client and server and stored in the browser.
the server use it to store information about a particular client/user.
workflow for using cookies as session storage:
the server issues a cookie with an expiration time and sends it with the response.
browsers automatically store the cookie and send it on every request to the same domain.
the server can read the information contained in the cookie (like the username).
the server can make changes to the cookie before sending it back on the response.
rinse and repeat.

#security issues is done on server (client redirect routes is just user experience)

#We can use JSON web tokens (JWTs) to add authentication to a Web API. A JSON web tokens is an industry standard for transferring data between two parties.

JWTs are cryptographically signed, typically using a secret with the HMACSHA-256 algorithm.

#A JWT is a string that has three parts separated by a period (.). Those are:

-The header
-The payload (data you want to keep)
-The signature (server uses signature verifies token hasn't been tampered with)

#Difference between Cookies and JWT when it comes to keep authenticated users information

-in world of sessions server is in charge of holding on the list of logged in user sessions

-for tokens, info about logged in users is kept on token (no sessions in memory. Server not involved. Server just gives user card & checks card, doesn't check server. Trusts in the presence of the token. NO checking other than token. No logout on server/destroying sessions on server since thers no session) 
-now responsiblity is in client to hold token for user data 
-its possible to place cookie in token
-many places like auth0 uses tokens

#Header
the alg key specifies which algorithm was used to create the token, in this case the HMACSHA-256 algorithm was used, and the typ property classifies this token as being of the type JWT.
The header will contain the algorithm with the token type. Typically the header for a JWT will look like this.

Copy
{
  "alg": "HS256",
  "typ": "JWT"
}



#PAYLOD

The payload includes claims (fancy name for things like permissions for the user) information or any other data we’d like to store in the token, which is most likely a user id. There are specific claims defined in the JWT standard, and you can also add your own properties to this object.

An example:

Copy
{
  "sub": "1234567890", // standard - subject, normally the user id
  "name": "John Doe", // custom property
  "iat": 1516239022 // standard - The Date the token was issued, expressed in seconds since epoch.
}

#SIGNATURE 
To create a signature, we must create a string by base64 encoding the header and payload together, and then signing it with a secret.

Combining all three parts, you will get a JWT that looks like this:


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

#review
#common ways of store session data

-memory
-memory cache server
-database server
-client <--> server <--> session store

^-Restarting server wipes memory out, including sessions, so dont have sessions anymore
#Solution to ^ is to persist session data to database instead of memory

#thnk about tools you're using search npm to see what works, & think about if its for production or dev

#responsiblites of client and server

instead of producing cookie, produces toekn


#server
-produce a token and send it back to client
-verif & decode the token
-read the payload and make it available for the server

#Client
-store the token 
-manually send the token on every request 
-destroying the token on logout 



#npx gitignore node (in git command line creates your gitignore file)
^Theres also version for ruby, .net etc

#Truly Learning Things Helps You to feel not burned out!

# Users 1 to many relationship ---> roles

//users *----* roles *----* permissions
//users can have set of permissions and roles at same time
