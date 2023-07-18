package com.example.sportsspirits.service;

import com.example.sportsspirits.models.dto.ChargeRequest;
import com.stripe.exception.*;
import com.stripe.model.Charge;

public interface PaymentService {

    public Charge charge(ChargeRequest chargeRequest) throws APIConnectionException, APIException, AuthenticationException, InvalidRequestException, CardException;
}
