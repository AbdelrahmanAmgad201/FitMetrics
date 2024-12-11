package com.example.FitMetrics_Server.repositories;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

@Embeddable
public class UserWeightHeightId implements Serializable {

    private long userId;
    private Date date;

    // Getters and Setters
    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    // Override equals() and hashCode() to ensure correct comparison
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserWeightHeightId that = (UserWeightHeightId) o;
        return userId == that.userId && date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, date);
    }
}