package com.mike.entities;

import javax.persistence.*;

/**
 * Created by michaelplott on 12/10/16.
 */
@Entity
@Table(name = "avatars")
public class Avatar {
    public enum Race {
        HUMAN;
    }

    @Id
    @GeneratedValue
    int id;

    @Column(nullable = false)
    String fileName;

    @Column(nullable = false)
    Race race;

    public Avatar() {
    }

    public Avatar(String fileName, Race race) {
        this.fileName = fileName;
        this.race = race;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }
}
