## Activer le port série du Raspberry :

1. Ouvrez un terminal sur votre Raspberry Pi
   sudo raspi-config

2. Une fois raspi-config lancé, choisissez Interfacing options, puis Serial :

   1. Répondez No à la partie demandant si vous souhaitez activer un shell via la connexion série,
   2. Répondez Yes à la partie demandant si vous souhaitez activer le port hardware.
   3. Validez, faites Finish, puis dites oui à la question vous demandant si vous souhaitez rebooter le Raspberry Pi.

## Désactiver le bluetooth :

1. echo "dtoverlay=disable-bt" | sudo tee -a /boot/config.txt
2. sudo systemctl disable hciuart
3. sudo reboot

## Vérifier que le port série du Raspberry a bien été activé :

1. Installer Minicom avec les commandes ci-dessous.
   1. sudo apt update -y
   2. sudo apt install minicom -y

## Démarrer Minicom en lui indiquant le port série à utiliser.

1. sudo minicom -b 115000 -o -D /dev/serial0
   sudo minicom -D /dev/serial0

## Vérifier la connexion entre le Raspberry et le SIM808 :

Commande = AT
La reponse doit etre : OK

## Vérifier si la carte SIM est bien présente et utilisable :

Commande = AT+CPIN=1234

Les réponses doivent être :

OK

+CPIN: READY

Call Ready

SMS Ready

## Passer en mode texte pour les SMS :

Commande = AT+CMGF=1

La réponses doit être :

OK

## Configurer un numéro de téléphone.

Commande = AT+CMGS="+2620693336783"

    La réponses doit être : >

Puis entrer le message : TEST DES SMS

Pour envoyer le message, appuier sur : CTRL Z

    La réponses doit être :

    +CMGS: + (un chiffre entre 0 et 255 EX: 33)

    OK

npm i @serialport/bindings
npm i node-pdu
npm i serialport
