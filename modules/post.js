const fs = require('fs');
const Arys = require('../Arys');
const config = require('../config/config');
const perms = require('../config/perm/perms');
const db = Arys.db;
const wait = Arys.wait;

const line = fs.readFileSync(config.post.file + '.txt').toString().split("\n");

function save(value) {
    fs.writeFile("save.txt", value, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};

function load() {
    return parseInt(fs.writeFile("save.txt", value, function(err) {
        if(err) {
            return console.log(err);
        }
    }.toString()));
};


module.exports = {
    help: 'usage: $post (number of image, the number cant be more than 5 for obvious reasons)',
    func: (client, msg, args, role) => {

        if(perms.check("post.base", role) !== true) {
            msg.channel.sendMessage("You don't have the permission `post.base`");
            return;
        }
        if(msg.channel.id==='275280722531581952' || role === "bot_owner"){
            if (args.length < 1){
                msg.reply("please add the number of image you want (._. )").then(m => {
                    setTimeout(function() {
                        m.delete();
                    }, config.discord.wait+2000);
                });
                return;
            }
            if (args[0] > parseInt(perms.check("post.max", role)) && perms.check("post.force", role) !== true){ //
                msg.reply("don't make me use all of my material you horny fuck !"+"\n" + "Go fap to your girlfriend, Oh wait..").then(m => {
                    setTimeout(function() {
                        m.delete();
                    }, config.discord.wait);
                });
                return;
            }
            if (args.length < 1) return;
            if (args[0] === 'reset' && perms.check("post.reset", role) === true) {
                msg.channel.sendMessage('The list start from the beginning again papi <@245614884786667520>').then(m => {
                    setTimeout(function() {
                        m.delete();
                    }, config.discord.wait);
                });
                save(0);
                return;
            }
            let start = load();
            let end = parseInt(args[0]) + start;

            for (var i = start; i < end; i++) {
                msg.channel.sendMessage('id : ' + i + "\n" + line[i]).then(m => {
                    db.serialize(function () {
                        let stmt = db.prepare("INSERT INTO post VALUES (?,?,?,?)");  // ? --->var.run(i)  // db.run("CREATE TABLE post(id_image smallint, id_message varchar(18), id_file varchar(20))");
                        stmt.run(start, m.id, config.post.file, 0); //id_image, id_message, id_file, report_count
                        start++;
                        stmt.finalize();
                    });
                });
                console.log(start + " " + end + " " + i);
            }
            save(end);
        }
        else{
            msg.reply("why do you use me outside of the NSFW channels you stupid perverted faggot, go back to the shithole you crawled out of before I stab your eyes out with a red-hot spoon!");
            return;
        }
    }
};

module.exports.line = line.length;