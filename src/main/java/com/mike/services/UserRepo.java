package com.mike.services;

import com.mike.entities.User;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by michaelplott on 11/30/16.
 */
public interface UserRepo extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
