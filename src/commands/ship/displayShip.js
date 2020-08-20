const DiscordPrompt = require("discord.js-prompts");
const { Client,message, MessageEmbed } = require('discord.js')
const rm = require('discord.js-reaction-menu');

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const componentStringBuilder = (components) =>{
    let str=""
    for (const component of components) {
        str += "```autohotkey" +
            "\n#" +component.name+"#"
            "\nFabriquant : "+component.manufacturer
        component.details.length>1?
            str +="\nDetail : " +component.details
            :str +=""
        str += "\nTaille : "+component.component_size+
            "\nMonture(s) : "+component.mounts+
            "\nNombre : "+component.quantity+"```"
    }
    return str
}

/**
 *
 * @param message
 * @param {Ship} ship
 * @return {import{"discord.js"}.MessageEmbed}
 */
function funcTemplateEmbed(ship){
    let templateEmbed = new MessageEmbed()
    templateEmbed.setTitle(ship.name)
    templateEmbed.setURL(ship.url)
    templateEmbed.setThumbnail(ship.fleetChartImage)
    templateEmbed.setImage(ship.bannerImage)
    templateEmbed.setAuthor(ship.manufacture.name, ship.manufacture.logoURL)
    switch (ship.productionStatus){
        case 'flight ready':
            templateEmbed.setColor('#33cc33');
            break;
        case 'in concept':
            templateEmbed.setColor('#ff3300');
            break;
        case 'in production':
            templateEmbed.setColor('#ffcc00');
            break;
        case 'ready':
            templateEmbed.setColor('#42f4f4');
            break;
        default :
            templateEmbed.setColor('#ffffff');
    }
    templateEmbed.setTimestamp()
    return templateEmbed
}
module.exports = async (message,ship) => {
    let allEmbed = []
    let page1 = funcTemplateEmbed(ship)
    page1.setDescription(ship.description)
    page1.addField('Taille',"```prolog\n"+capitalize(ship.size)+"```",true)
    page1.addField('Fabriquant',"```prolog\n"+ship.manufacturerCode+"```",true)
    page1.addField('Focus',"```prolog\n"+ship.focus+"```",true)
    ship.cargoCapacity?
        page1.addField('Cargo',"```prolog\n"+ship.cargoCapacity+" SCU```",true)
        :page1.addField('Cargo',"```prolog\nInconnue```",true)
    page1.addField('Equipage',"```prolog\n"+ship.maxCrew+"```",true)
    page1.addField('Type',"```prolog\n"+capitalize(ship.type)+"```",true)
    ship.inGamePrice?
        page1.addField('Prix Ingame',"```prolog\n"+ship.inGamePrice.replace(',00 €',' AUEC')+"```",true)
        :page1.addField('Prix Ingame',"```prolog\nInconnue```",true)
    ship.price?
        page1.addField('Prix',"```prolog\n"+ship.price.replace(',00 €',' $')+"```",true)
        :page1.addField('Prix',"```prolog\nInconnue```",true)
    page1.addField('Statut de production',"```prolog\n"+capitalize(ship.productionStatus)+"```",true)
    page1.setFooter('Page 1/6')
    allEmbed.push(page1)

    let page2 = funcTemplateEmbed(ship)
    page2.setTitle(ship.name+' spécification')
    page2.addField('Longeur',"```prolog\n"+ship.length+" m```",true)
    page2.addField('Largeur',"```prolog\n"+ship.beam+" m```",true)
    page2.addField('Hauteur',"```prolog\n"+ship.height+" m```",true)
    ship.pitchMax?
        page2.addField('Tangage Max',"```prolog\n"+ship.pitchMax+" deg/s```",true)
        :page2.addField('Tangage Max',"```prolog\nInconnue```",true)
    ship.yawMax?
        page2.addField('Lacet Max',"```prolog\n"+ship.yawMax+" deg/s```",true)
        :page2.addField('Lacet Max',"```prolog\nInconnue```",true)
    ship.rollMax?
        page2.addField('Roulis Max',"```prolog\n"+ship.rollMax+" deg/s```",true)
        :page2.addField('Roulis Max',"```prolog\nInconnue```",true)
    ship.xAxisAcceleration?
        page2.addField("Accélération de l'Axe-X","```prolog\n"+ship.xAxisAcceleration+" m/s²```")
        :page2.addField("Accélération de l'Axe-X","```prolog\nInconnue```",true)
    ship.yAxisAcceleration?
        page2.addField("Accélération de l'Axe-Y","```prolog\n"+ship.yAxisAcceleration+" m/s²```")
        :page2.addField("Accélération de l'Axe-Y","```prolog\nInconnue```",true)
    ship.zAxisAcceleration?
        page2.addField("Accélération de l'Axe-Z","```prolog\n"+ship.zAxisAcceleration+" m/s²```")
        :page2.addField("Accélération de l'Axe-Z","```prolog\nInconnue```",true)
    page2.setFooter('Page 2/6')
    allEmbed.push(page2)

    let page3 = funcTemplateEmbed(ship)
    page3.setTitle(ship.name+' : Système')
    page3.addField('Ordinateur',componentStringBuilder(ship.componentJson.RSIAvionic.computers),true)
    page3.addField('Radar',componentStringBuilder(ship.componentJson.RSIAvionic.radar),true)
    page3.addField('Alimentation éléctrique',componentStringBuilder(ship.componentJson.RSIModular.power_plants),false)
    page3.addField('Radiateur',componentStringBuilder(ship.componentJson.RSIModular.coolers),true)
    page3.addField('Générateur de bouclier',componentStringBuilder(ship.componentJson.RSIModular.shield_generators),true)
    page3.setFooter('Page 3/6')
    allEmbed.push(page3)

    let page4 = funcTemplateEmbed(ship)
    page4.setTitle(ship.name+' : Motorisation')
    page4.addField('Admission de Carburant', componentStringBuilder(ship.componentJson.RSIPropulsion.fuel_intakes),true)
    page4.addField('Réservoir de Carburant', componentStringBuilder(ship.componentJson.RSIPropulsion.fuel_tanks),true)
    page4.addField('Moteur Quantique',componentStringBuilder(ship.componentJson.RSIPropulsion.quantum_drives),true)
    page4.addField('Réservoir Quantique',componentStringBuilder(ship.componentJson.RSIPropulsion.quantum_drives),true)
    page4.setFooter('Page 4/6')
    allEmbed.push(page4)

    let page5 = funcTemplateEmbed(ship)
    page5.setTitle(ship.name+' : Proppulsion')
    page5.addField('Propulseur Principal', componentStringBuilder(ship.componentJson.RSIThruster.main_thrusters),true)
    page5.addField('Propulseur de Manœuvre', componentStringBuilder(ship.componentJson.RSIThruster.maneuvering_thrusters),true)
    page5.setFooter('Page 5/6')
    allEmbed.push(page5)

    let page6 = funcTemplateEmbed(ship)
    page6.setTitle(ship.name+' : Armement')
    ship.componentJson.RSIWeapon.missiles.length !==0  ?
        page6.addField('Missile',componentStringBuilder(ship.componentJson.RSIWeapon.missiles))
        :null
    ship.componentJson.RSIWeapon.turrets.length !==0 ?
        page6.addField('Tourelle',componentStringBuilder(ship.componentJson.RSIWeapon.turrets))
        :null
    ship.componentJson.RSIWeapon.weapons.length !==0  ?
        page6.addField('Armement',componentStringBuilder(ship.componentJson.RSIWeapon.weapons))
        :null
    ship.componentJson.RSIWeapon.utility_items.length !==0  ?
        page6.addField('Item Utile',componentStringBuilder(ship.componentJson.RSIWeapon.utility_items))
        :null
    page6.setFooter('Page 6/6')
    allEmbed.push(page6)

    new rm.menu(
        message.channel,
        message.author.id,
        allEmbed,
        604800,
        {back: '◀',stop: '⏹', next: '▶'}
    )
}