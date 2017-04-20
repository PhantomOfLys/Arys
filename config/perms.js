module.exports.perm = {
    interaction: {
        all: false,
        trigger: {
            base: false
        },
        pet: {
            base: false
        }
    },
    help: {
        base: false
    },
    ping: {
        base: false
    },
    post: {
        base: false,
        max : 5,
        force: false,
        reset: false
    },
    report: {
        base: false,
        force: false
    },
    mod: {
        all: false,
        reload: {
            base: false,
            command: false
        },
        purge: {
            all: false,
            base: false,
            bypass: false,
            force: false,
            user: {
                base: false,
                force: false
            }
        },
        logout: {
            base: false
        },
        perm: {
            base: false
        }
    },
};
const basePerm = require("./perms").perm;
const perms = require('./perms');
const rolesPerm = require("./roles");

module.exports.getPermission = function (path, source) {
    console.log("I am here, " + rolesPerm.rolePerm.admin.reload.base);
    if (!path)
        return path;

    const pathComponents = path.trim().split(/\./);
    if (source === "role") {
        var base = rolesPerm.rolePerm[pathComponents[0]];
    } else {
        var base = basePerm[pathComponents[0]];
    }

    if (base === undefined) {
        console.error("ERROR: " + pathComponents[0] + " is undefined");
        return -1;
    }

    // Check if only the base is needed
    if (pathComponents.length > 1) {
        for (let i=1; i<pathComponents.length; i++) {
            let component = pathComponents[i];
            let test      = base[component];

            // Error,
            if (test === undefined) {
                console.error("ERROR: " + component + " is undefined")
                return -1;
            }

            // Go to next base
            base = test;
        }
    }

    // Either return list of permissions or a value
    if (base instanceof Object) {
        // Get list of permissions
        const list = [];
        getBase(base, pathComponents.join(".") + ".", list);
        return list;
    } else {
        return base;
    }
};
function getBase(base, path, list) {
    const keys = Object.keys(base);

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let permEntity = base[key];

        if (permEntity instanceof Object) {
            getBase(permEntity, path + key + ".", list);
        } else {
            list.push(path + key + "=" + permEntity);
        }
    }
}
// perm, role
module.exports.check = function (path, role) {
    if(role !== null) {
        let input = role + "." + path;
        console.log(input);
        if(perms.getPermission(input, "role") !== -1) { //input = role + "." + path
            return perms.getPermission(input, "role");
        }
    }
    else if(perms.getPermission(path) !== -1) {
        return perms.getPermission(path);
    }
    else {
        return "wrong permission";
    }
};
