package com.mike.services;

import com.mike.entities.Avatar;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

/**
 * Created by michaelplott on 12/10/16.
 */
public interface AvatarRepo extends CrudRepository<Avatar, Integer> {
    ArrayList findByRace(Avatar.Race race);
}
