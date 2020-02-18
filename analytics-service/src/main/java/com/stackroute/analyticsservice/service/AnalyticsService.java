package com.stackroute.analyticsservice.service;

import com.stackroute.analyticsservice.domain.UserResponse;
import com.stackroute.analyticsservice.repository.QueryResultResponse;
import com.stackroute.analyticsservice.domain.AnalyticsOutput;

import java.util.List;

public interface AnalyticsService {
    public boolean existsByQuery(String query);
    public void saveQuery(UserResponse userResponse);
    public void updateQuery(UserResponse userResponse);
    public List<QueryResultResponse> getResults();
    public List<QueryResultResponse> getResultsByDomain(String domain);
    public AnalyticsOutput getAnalyticsData();
    public void deleteResponse(QueryResultResponse response);
}
