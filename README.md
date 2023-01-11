# Epanafora-Calculateur

Web app pour simplifier le calcul de dégats dans le jdr Epanaphora

## Tirage ordre de tour

Lance les dés pour tous les joueurs et tous les mobs, détermine l'ordre en classant par ordre croissant les joueurs

## Calcul attaque réussite

Dé physique (attaquant) vs Dé instinct (Défenseur)

CHANCE_ECHEC_CRIT_BASE = 5%

## Calcul des dégats

CHANCE_COUP_CRIT_BASE = 5%

Attaque sans arme :
 - dégat = [DÉ PHYSIQUE] * 0,5
 - chance de crit = [CHANCE_COUP_CRIT_BASE]

Attaque avec arme :
 - dégat = [DÉ PHYSIQUE] * [1 + DEGAT_ADDITIONEL_ARME]
 - chance de crit = [CHANCE_COUP_CRIT_BASE] + [CHANCE_COUP_CRIT_ARME]

Attaque pouvoir :
 - dégat = [DÉ PHYSIQUE] + (0,5 * [TIER_POUVOIR] * [DÉ_ÉNERGIE])
 - chance de crit = [CHANCE_COUP_CRIT_BASE] + (0,1 * [TIER_POUVOIR])

Attaque en symbiose (arme + pouvoir) :
 - dégat = [DÉ PHYSIQUE] * [1 + DEGAT_ADDITIONEL_ARME] + (0,5 * [TIER_POUVOIR] * [DÉ_ÉNERGIE])
 - chance de crit = [CHANCE_COUP_CRIT_BASE]  + [CHANCE_COUP_CRIT_ARME] + (0,1 * [TIER_POUVOIR])
 - conséquence négatif : l'arme perd 1 NP