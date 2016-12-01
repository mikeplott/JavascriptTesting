package com.mike.controllers;

import com.mike.entities.User;
import com.mike.services.UserRepo;
import org.h2.tools.Server;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.SQLException;

/**
 * Created by michaelplott on 11/30/16.
 */
@RestController
public class JSTestController {

    public static final String KEY = "v2PhvEbfdqdQz1UKHssmmpMDWIrFDJ";

    public static final String API_URL = "http://api-public.guidebox.com/v1.43/";

    @Autowired
    UserRepo users;

    Server h2;

    @PostConstruct
    public void init() throws SQLException {
        h2.createWebServer().start();
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User postUser(HttpSession session, HttpServletResponse response, @RequestBody User user) throws IOException {
        User userFromDb = users.findByUsername(user.getUsername());
        if (userFromDb == null) {
            users.save(new User(user.getUsername(), user.getPassword()));
            User theUser = users.findByUsername(user.getUsername());
            session.setAttribute("username", user.getUsername());
            return theUser;
        }
        session.setAttribute("username", user.getUsername());
        return userFromDb;
    }

    @RequestMapping(path = "/user", method = RequestMethod.GET)
    public ResponseEntity<User> getUser(HttpSession session) {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<User>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}
