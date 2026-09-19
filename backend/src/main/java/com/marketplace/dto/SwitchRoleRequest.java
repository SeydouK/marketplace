package com.marketplace.dto;

import lombok.Data;

@Data
public class SwitchRoleRequest {
    /** "ACHETEUR" ou le rôle d'origine ("VENDEUR", "TRANSPORTEUR") */
    private String targetRole;
}
