#Handle bot !

C'est le repo officiel du handle bot !
Si vous souhaiter le modifier ou l'héberger vous même vous êtes au bonne endroit
***
Le handle bot et un bot dédier à starcitizen, il vous permmet de retrouver un membre ou une organisation ou encore chercher des vaiseau.
Il peut aussi servire de age blanche permettat de retrouver le handle acosier à n'importe quelle membre de votre discord.

Pour en savoirs plus une fois le bot installer faite : `!help` sur discord
***
###Instance public
Vous ne souhaiter pas héberger vous même le bot.
Sa tombe bien car il y a une instance public déjà héberger.

Pour sa cliquer sur le lien d'invitation du bot et le tour et jouer
####Invité le bot :
https://discord.com/oauth2/authorize?client_id=397402496676659201&scope=bot&permissions=27712
***
###Installation
Pour installer le bot vous même il est important de suivre ce petit tuto
####Prérequis
- Serveur postgresql
    - Avec le module `pg_trgm`   
- NodeJS > 11
- Cle de l'api https://starcitizen-api.com/

####Installation de la BDD

1. Crée une nouvelle base de donnée dans postgres sql.
2. Executer le script de création des tables présent dans : *`handlebot/ressources/database/CreateTable.sql`*
3. Executer le script d'insertion des langs présent dans : *`handlebot/ressources/database/InsertLang.sql`*
4. Activer si ce n'est pas déjà fait le module : `pg_trgm`

####Installation du bot

1. Cloner le projet dans sa branche master ou cloner une realse
2. Executer la commande : `npm install` à la racine du projet
3. Remplire le fichier de configuration `.env` avec vos information *(Attention le paramettre lang doit être le noms d'un des fichier qui ce trouve ici : `handlebot/ressources/lang`)*
4. Executer la comande : `npm start`
5. Une fois le bot démarer sur discord effectuer la commande `!ship update` pour inisialiser la BDD
***
###Licence
 GPL-3.0 License © Louis VOLAT