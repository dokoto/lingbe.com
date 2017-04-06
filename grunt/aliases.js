'use strict';

module.exports = function(grunt, options) {
    const buildScripts = {
        native_dev_android: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:dev',
            'create-index',
            'cordovacli:create',
            'cordova-settings',
            'cordovacli:add_android_platforms',
            //'cordovacli:add_plugins',
            'clean:bin_builds_www',
            'copy:android_assets',
            'copy:compiled_sources',
            'cordovacli:build_android'
        ],
        native_prod_android: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:prod',
            'create-index',
            'cordovacli:create',
            'cordova-settings',
            'cordovacli:add_android_platforms',
            //'cordovacli:add_plugins',
            'clean:bin_builds_www',
            'copy:android_assets',
            'copy:compiled_sources',
            'cordovacli:build_android'
        ],
        native_dev_ios: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:dev',
            'create-index',
            'cordovacli:create',
            'cordova-settings',
            'cordovacli:add_ios_platforms',
            //'cordovacli:add_plugins',
            'clean:bin_builds_www',
            'copy:android_assets',
            'copy:compiled_sources',
            'cordovacli:build_ios'
        ],
        native_prod_ois: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:prod',
            'create-index',
            'cordovacli:create',
            'cordova-settings',
            'cordovacli:add_ios_platforms',
            //'cordovacli:add_plugins',
            'clean:bin_builds_www',
            'copy:android_assets',
            'copy:compiled_sources',
            'cordovacli:build_ios'
        ],
        web_dev: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:dev',
            'create-index'
        ],
        web_prod: [
            'copy:constants',
            'jshint',
            'mkdir:builds',
            'clean:builds',
            'copy:constants',
            'webpack:prod',
            'create-index'
        ]
    };

    if (options && options.args) {
        let tasks = {
            'default': ['help'],
            'web': buildScripts['web_' + options.args.mode],
            'native': buildScripts['native_' + options.args.mode + '_' + options.args.os]
        };

        return tasks;
    } else {
        return {
            'default': ['help']
        };
    }
};
