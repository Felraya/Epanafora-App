# Epanafora App

Web app pour simplifier le calcul de dégats dans le jdr Epanaphora

## Tirage ordre de tour

Lance les dés pour tous les joueurs et tous les mobs, détermine l'ordre en classant par ordre croissant les joueurs

## Attaque

[TYPE_ATTAQUE]  
[DE_PHYSIQUE]  
[DE_ENERGIE]  
[DE_INSTINCT_ADVERSAIRE]  
[TIER_POUVOIR]  
[CHANCE_COUP_CRIT_ARME]  


### 1) Attaque réussi ou non

CHANCE_ECHEC_CRIT_BASE = 5%

Uniquement pour attaque pouvoir et attaque en symbiose : 
 - chance d'échec du pouvoir = [CHANCE_ECHEC_CRIT_BASE]

Pour toutes les types d'attaques :
 - réussi si [DE_PHYSIQUE] >= [DE_INSTINCT_ADVERSAIRE]
 - échec si [DE_PHYSIQUE] < [DE_INSTINCT_ADVERSAIRE]

### 2) Calcul des dégats

CHANCE_COUP_CRIT_BASE = 5%

Attaque sans arme :
 - dégat = [DE_PHYSIQUE] * 0,5
 - chance de crit = [CHANCE_COUP_CRIT_BASE]

Attaque avec arme :
 - dégat = [DE_PHYSIQUE] * [1 + DEGAT_ADDITIONEL_ARME]
 - chance de crit = [CHANCE_COUP_CRIT_BASE] + [CHANCE_COUP_CRIT_ARME]

Attaque pouvoir :
 - dégat = [DE_PHYSIQUE] + (0,5 * [TIER_POUVOIR] * [DE_ENERGIE])
 - chance de crit = [CHANCE_COUP_CRIT_BASE] + (0,1 * [TIER_POUVOIR])

Attaque en symbiose (arme + pouvoir) :
 - dégat = [DE_PHYSIQUE] * (1 + [DEGAT_ADDITIONEL_ARME]) + (0,5 * [TIER_POUVOIR] * [DE_ENERGIE])
 - chance de crit = [CHANCE_COUP_CRIT_BASE]  + [CHANCE_COUP_CRIT_ARME] + (0,1 * [TIER_POUVOIR])
 - conséquence négatif : l'arme perd 1 NP


### TODO

- Indicateur nb explosion
- Esquive et subissement de dégat