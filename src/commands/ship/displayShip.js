const DiscordPrompt = require("discord.js-prompts");
const { Client,message, MessageEmbed } = require('discord.js')
const rm = require('discord.js-reaction-menu');

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

const componentStringBuilder = (lang,components) =>{
    let str=""
    for (const component of components) {
        str += "```autohotkey" +
            "\n#" +component.name+"#"
            "\n"+lang.trad.manufacturer+" : "+component.manufacturer
        component.details.length>1?
            str +="\n"+lang.trad.detail+" : " +component.details
            :str +=""
        str += "\n"+lang.trad.size+" : "+component.component_size+
            "\n"+lang.trad.mount+" : "+component.mounts+
            "\n"+lang.trad.number+" : "+component.quantity+"```"
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
module.exports = async (message,ship,lang) => {
    let allEmbed = []
    let page1 = funcTemplateEmbed(ship)
    page1.setDescription(ship.description)
    page1.addField(lang.trad.size,"```prolog\n"+capitalize(ship.size)+"```",true)
    page1.addField(lang.trad.manufacturer,"```prolog\n"+ship.manufacturerCode+"```",true)
    page1.addField(lang.trad.focus,"```prolog\n"+ship.focus+"```",true)
    ship.cargoCapacity?
        page1.addField(lang.trad.cargo,"```prolog\n"+ship.cargoCapacity+" SCU```",true)
        :page1.addField(lang.trad.cargo,"```prolog\n"+lang.trad.unknown+"```",true)
    page1.addField(lang.trad.crew,"```prolog\n"+ship.maxCrew+"```",true)
    page1.addField(lang.trad.type,"```prolog\n"+capitalize(ship.type)+"```",true)
    ship.inGamePrice?
        page1.addField(lang.trad.in_game_price,"```prolog\n"+ship.inGamePrice.replace(',00 €',' AUEC')+"```",true)
        :page1.addField(lang.trad.in_game_price,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.price?
        page1.addField(lang.trad.price,"```prolog\n"+ship.price.replace(',00 €',' $')+"```",true)
        :page1.addField(lang.trad.price,"```prolog\n"+lang.trad.unknown+"```",true)
    page1.addField(lang.trad.production_status,"```prolog\n"+capitalize(ship.productionStatus)+"```",true)
    page1.setFooter(lang.trad.page+' 1/6')
    allEmbed.push(page1)

    let page2 = funcTemplateEmbed(ship)
    page2.setTitle(ship.name+' '+lang.trad.specification)
    page2.addField(lang.trad.length,"```prolog\n"+ship.length+" m```",true)
    page2.addField(lang.trad.width,"```prolog\n"+ship.beam+" m```",true)
    page2.addField(lang.trad.height,"```prolog\n"+ship.height+" m```",true)
    ship.pitchMax?
        page2.addField(lang.trad.pitch_max,"```prolog\n"+ship.pitchMax+" deg/s```",true)
        :page2.addField(lang.trad.pitch_max,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.yawMax?
        page2.addField(lang.trad.yaw_max,"```prolog\n"+ship.yawMax+" deg/s```",true)
        :page2.addField(lang.trad.yaw_max,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.rollMax?
        page2.addField(lang.trad.roll_max,"```prolog\n"+ship.rollMax+" deg/s```",true)
        :page2.addField(lang.trad.roll_max,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.xAxisAcceleration?
        page2.addField(lang.trad.x_axis_acceleration,"```prolog\n"+ship.xAxisAcceleration+" m/s²```")
        :page2.addField(lang.trad.x_axis_acceleration,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.yAxisAcceleration?
        page2.addField(lang.trad.y_axis_acceleration,"```prolog\n"+ship.yAxisAcceleration+" m/s²```")
        :page2.addField(lang.trad.y_axis_acceleration,"```prolog\n"+lang.trad.unknown+"```",true)
    ship.zAxisAcceleration?
        page2.addField(lang.trad.z_axis_acceleration,"```prolog\n"+ship.zAxisAcceleration+" m/s²```")
        :page2.addField(lang.trad.z_axis_acceleration,"```prolog\n"+lang.trad.unknown+"```",true)
    page2.setFooter(lang.trad.page+' 2/6')
    allEmbed.push(page2)

    let page3 = funcTemplateEmbed(ship)
    page3.setTitle(ship.name+' : '+lang.trad.system)
    page3.addField(lang.trad.computer,componentStringBuilder(lang,ship.componentJson.RSIAvionic.computers),true)
    page3.addField(lang.trad.radar,componentStringBuilder(lang,ship.componentJson.RSIAvionic.radar),true)
    page3.addField(lang.trad.power_plant,componentStringBuilder(lang,ship.componentJson.RSIModular.power_plants),false)
    page3.addField(lang.trad.cooler,componentStringBuilder(lang,ship.componentJson.RSIModular.coolers),true)
    page3.addField(lang.trad.shield_generators,componentStringBuilder(lang,ship.componentJson.RSIModular.shield_generators),true)
    page3.setFooter(lang.trad.page+' 3/6')
    allEmbed.push(page3)

    let page4 = funcTemplateEmbed(ship)
    page4.setTitle(ship.name+' : '+lang.trad.motorization)
    page4.addField(lang.trad.fuel_intake, componentStringBuilder(lang,ship.componentJson.RSIPropulsion.fuel_intakes),true)
    page4.addField(lang.trad.fuel_take, componentStringBuilder(lang,ship.componentJson.RSIPropulsion.fuel_tanks),true)
    page4.addField(lang.trad.quantum_drive,componentStringBuilder(lang,ship.componentJson.RSIPropulsion.quantum_drives),true)
    page4.addField(lang.trad.quantum_fuel_tanks,componentStringBuilder(lang,ship.componentJson.RSIPropulsion.quantum_fuel_tanks),true)
    page4.setFooter(lang.trad.page+' 4/6')
    allEmbed.push(page4)

    let page5 = funcTemplateEmbed(ship)
    page5.setTitle(ship.name+' : '+lang.trad.thruster)
    page5.addField(lang.trad.main_thrusters, componentStringBuilder(lang,ship.componentJson.RSIThruster.main_thrusters),true)
    page5.addField(lang.trad.maneuvering_thrusters, componentStringBuilder(lang,ship.componentJson.RSIThruster.maneuvering_thrusters),true)
    page5.setFooter(lang.trad.page+' 5/6')
    allEmbed.push(page5)

    let page6 = funcTemplateEmbed(ship)
    page6.setTitle(ship.name+' : '+lang.trad.weapon)
    ship.componentJson.RSIWeapon.missiles.length !==0  ?
        page6.addField(lang.trad.missile,componentStringBuilder(lang,ship.componentJson.RSIWeapon.missiles))
        :null
    ship.componentJson.RSIWeapon.turrets.length !==0 ?
        page6.addField(lang.trad.turrets,componentStringBuilder(lang,ship.componentJson.RSIWeapon.turrets))
        :null
    ship.componentJson.RSIWeapon.weapons.length !==0  ?
        page6.addField(lang.trad.weapon,componentStringBuilder(lang,ship.componentJson.RSIWeapon.weapons))
        :null
    ship.componentJson.RSIWeapon.utility_items.length !==0  ?
        page6.addField(lang.trad.utility_items,componentStringBuilder(lang,ship.componentJson.RSIWeapon.utility_items))
        :null
    page6.setFooter(lang.trad.page+' 6/6')
    allEmbed.push(page6)

    new rm.menu(
        message.channel,
        message.author.id,
        allEmbed,
        604800,
        {back: '◀',stop: '⏹', next: '▶'}
    )
}