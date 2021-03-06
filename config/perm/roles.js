const fs = require('fs');
module.exports.id = {
    fresh: "276647021790887937",
    trending: "248176040428437504",
    captain: "244175416460443649",
    op: "280671574321922048",
    oldfag: "288607952468836352",
    hot: "248164589458554883",
    nsfw_god: "276058085641027584", //276058085641027584
    eye: "242971198718345216",
    smurf: "253880732626321418",
    admin: "242684239223455755" //242684239223455755
};
//244175416460443649
module.exports.rolePermBase = {
    fresh: {
        help: {
            base: true
        }
    },
    trending: {
        interaction: {
            all: true
        },
        report: {
            base: true,
        },
        post: {
            base: true,
            max : 5,
        }
    },
    captain: {
    },
    op : {
    },
    oldfag: {
    },
    hot : {
    },
    nsfw_god: {
        post: {
            force: true
        },
        report: {
            force: true
        }
    },
    eye: {
        mod: {
            purge: {
                all: true
            }
        },
    },
    smurf: {
        mod: {
            logout: {
                base: true
            },
            perm: {
                base: true
            }
        }
    },
    admin: {
        mod: {
            reload: {
                base: true,
                command: true
            }
        }
    },
    bot_owner: {
        ping: {
            base: true
        },
        post: {
            reset: true
        },
        init: {
            base: true
        }
    }
};

module.exports.JSON = {
    rolePerm: JSON.parse(fs.readFileSync('./config/perms.json', 'utf8'))
}

module.exports.load = function() {
    let perm = require('./roles').JSON.rolePerm;
    let id = require('./roles').id;
    let assign = require('assign-deep');
    let perms = require('./perms');
    let objectPath = require('object-path');
    //make that every role extand from the one above
    /*assign(perm.trending, perm.fresh);
    assign(perm.captain, perm.trending);
    assign(perm.op, perm.captain);
    assign(perm.oldfag, perm.op);
    assign(perm.hot, perm.oldfag);
    assign(perm.nsfw_god, perm.hot);
    assign(perm.eye, perm.nsfw_god);
    assign(perm.smurf, perm.eye);
    assign(perm.admin, perm.smurf);
    assign(perm.bot_owner, perm.admin);
    perm.fresh.id = id.fresh;
    perm.trending.id = id.trending;
    perm.captain.id = id.captain;
    perm.op.id = id.op;
    perm.oldfag.id = id.oldfag;
    perm.hot.id = id.hot;
    perm.nsfw_god.id = id.nsfw_god;
    perm.eye.id = id.eye;
    perm.smurf.id = id.smurf;
    perm.admin.id = id.admin;*/
    keys = Object.keys(perm);
    for(i = 0; i<keys.length; i++) {
        let a;
        let str;
        for(j = 0; j<perms.check("", keys[i]).length; j++) {
            a = perms.check("", Object.keys(perm)[i])[j];
            if(a.search(".all=true") !== -1) {
                let b = a.split(".");
                for(k = 0; k<b.length; k++) {
                    if(b[k] === "all=true") { //k-1
                        for(l = 1; l<b.length-1; l++) {
                            if(l == 1) {
                                str = b[l];
                            } else {
                                str += "." + b[l];
                            }
                        }
                    }
                }
                let x = perms.check(str);
                for (m = 1; m<x.length; m++) {
                    let y = keys[i] + "." + x[m];
                    let z = y.replace("=false", "");
                    objectPath.set(perm, z, true);
                }
            }
        }
    }

};

/*
 Object.assign(perm.trending, perm.fresh, perm.trending);
 Object.assign(perm.captain, perm.trending, perm.captain);
 Object.assign(perm.op, perm.captain, perm.op);
 Object.assign(perm.oldfag, perm.op, perm.oldfag);
 Object.assign(perm.hot, perm.oldfag, perm.hot);
 Object.assign(perm.nsfw_god, perm.hot, perm.nsfw_god);
 Object.assign(perm.eye, perm.nsfw_god, perm.eye);
 Object.assign(perm.smurf, perm.eye, perm.smurf);
 Object.assign(perm.admin, perm.smurf, perm.admin);
 Object.assign(perm.bot_owner, perm.admin, perm.bot_owner);
 */

//console.log(b + " : " + b.length);
/*for(k = 0; k<b.length; k++) {
 if(b[k] === "all=true") { //k-1
 console.log(b[k-1] + " I AM HERE");
 /*for(l = 0; l<b.length-1; l++) {
 if(l = 0) {
 str = b[l];
 }
 str += b[l] + ".";
 }
 console.log(str);
 }
 }*/