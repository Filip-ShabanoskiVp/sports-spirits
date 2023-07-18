package com.example.sportsspirits.models.dto;

import lombok.Data;

@Data
public class ChargeRequest {

    private String description;

    private int amount;

    private String currency;

    private String stripeToken;
}
