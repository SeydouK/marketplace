package com.marketplace.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Une position poussée en temps réel sur le canal de suivi.
 *
 * <p>Plus riche que le simple couple de coordonnées : sans le cap le marqueur ne
 * peut pas s'orienter, et sans la vitesse le client ne peut pas estimer où le
 * véhicule se trouve entre deux relevés. Ce sont ces deux valeurs qui font la
 * différence entre une épingle qui saute et un véhicule qui glisse.
 *
 * <p>Ce DTO ne transporte rien de confidentiel — ni code de remise, ni montant,
 * ni identité — parce qu'il est diffusé aux trois parties de la livraison.
 *
 * @param remiseId    la livraison concernée
 * @param latitude    position, en degrés décimaux
 * @param longitude   position, en degrés décimaux
 * @param vitesseKmh  vitesse instantanée, ou null si le matériel ne la donne pas
 * @param capDegres   direction depuis le nord, ou null à l'arrêt
 * @param precisionM  précision annoncée par le GPS, en mètres
 * @param mesureeLe   horodatage du relevé côté serveur
 */
public record PositionLivreurDTO(
        Long remiseId,
        BigDecimal latitude,
        BigDecimal longitude,
        BigDecimal vitesseKmh,
        BigDecimal capDegres,
        Integer precisionM,
        LocalDateTime mesureeLe
) {}
