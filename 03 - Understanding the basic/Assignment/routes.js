const routesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write('<head> <title> Home </title> </head>')
    res.write("<body>");
    res.write("<h1> Welcome To Assignment 1! </h1>");
    res.write("<form action='/create-user' method='POST'>");
    res.write(
      "<input type='text' id='username' name='username' placeholder='Enter username'>"
    );
    res.write("<button type='submit'> Submit </button>");
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");

    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write('<head> <title> Users </title> </head>')
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>User l</li>");
    res.write("<li>User 2</li>");
    res.write("<li>User 3</li>");
    res.write("</ul>");

    res.write("</body>");
    res.write("</html>");

    return res.end();
  }

  if (url === "/create-user" && method === 'POST') {
    const username = [];
    req.on("data", (chunk) => {
      username.push(chunk);
    });
    req.on("end", () => {
      const parsedUsername = Buffer.concat(username).toString();
      console.log(parsedUsername.split("=")[1]);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

module.exports = routesHandler;
