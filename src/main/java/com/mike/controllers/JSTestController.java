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
import java.net.URLEncoder;
import javax.annotation.PostConstruct;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.Map;

/**
 * Created by michaelplott on 11/30/16.
 */
@RestController
public class JSTestController {

    public static final String TVDBKEY = "8E58C59B2C5CAAB5";

    public static final String KEY = "rKb2Votbq91OfF7vWvJtcn9Q18QNAUiQ";

    public static final String API_URL = "http://api-public.guidebox.com/v1.43/US/" + KEY;

    public static final String SHOW_SEARCH = API_URL + "/search/title/";

    public static final String SEARCH_ID = API_URL + "/show/";

    public static final String MOVIE_SEARCH = API_URL + "/search/movie/title/";

    public static final String MOVIE_ID_SEARCH = API_URL + "/search/movie/id/";

    @Autowired
    UserRepo users;

    Server h2;

    @PostConstruct
    public void init() throws SQLException {
        h2.createWebServer().start();
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User postUser(HttpSession session, @RequestBody User user) throws IOException {
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

    @RequestMapping(path = "/show-search", method = RequestMethod.GET)
    public ResponseEntity<String> getURL(HttpSession session) {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<String>(SHOW_SEARCH, HttpStatus.OK);
    }

    @RequestMapping(path = "/url-encode", method = RequestMethod.POST)
    public ResponseEntity<String> encodeURL(HttpSession session, @RequestBody Map<String, String> json) throws UnsupportedEncodingException {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        }
        String show = json.get("show");
        String show1 = URLEncoder.encode(show, "UTF-8");
        String show2 = URLEncoder.encode(show1, "UTF-8");
        String show3 = URLEncoder.encode(show2, "UTF-8");
        return new ResponseEntity<String>(show3, HttpStatus.OK);
    }

    @RequestMapping(path = "/search-id", method = RequestMethod.GET)
    public ResponseEntity<String> showId(HttpSession session, int theID) throws UnsupportedEncodingException {
        String id = theID + "";
        String id1 = URLEncoder.encode(id, "UTF-8");
        String id2 = URLEncoder.encode(id1, "UTF-8");
        String id3 = URLEncoder.encode(id2, "UTF-8");
        String call = SEARCH_ID + id3;
        return new ResponseEntity<String>(call, HttpStatus.OK);
    }

    @RequestMapping(path = "/source-search", method = RequestMethod.POST)
    public ResponseEntity<String> getMovieURL(HttpSession session, @RequestBody Map<String, String> json) throws UnsupportedEncodingException {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        }
        String movie = json.get("movie");
        URLEncoder.encode(movie, "UTF-8");
        URLEncoder.encode(movie, "UTF-8");
        URLEncoder.encode(movie, "UTF-8");
        String call = MOVIE_SEARCH + movie;
        return new ResponseEntity<String>(call, HttpStatus.OK);
    }

    @RequestMapping(path = "/movie-id", method = RequestMethod.GET)
    public ResponseEntity<String> getMovieIdUrl(HttpSession session) {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        }
        String theCall = MOVIE_ID_SEARCH;
        return new ResponseEntity<String>(theCall, HttpStatus.OK);
    }

    @RequestMapping(path = "/api-url", method = RequestMethod.GET)
    public ResponseEntity<String> getMovieSourceURL(HttpSession session) {
        String username = (String) session.getAttribute("username");
        User user = users.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<String>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<String>(API_URL, HttpStatus.OK);
    }

}
