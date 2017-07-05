/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['tests/**/*Test.js']
            },
            testMysql: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['tests/database/mysql/**/*Test.js']
            },
            testMysqlDbOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['tests/database/mysql/**/db*Test.js']
            },
            testDbOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                src: ['tests/database/**/*Test.js']
            },
            testIndividualTestOnly: {
                options: {
                    reporter: 'spec',
                    //captureFile: 'results.txt', // Optionally capture the reporter output to a file 
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                    clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false) 
                },
                //src: ['tests/webControllers/tokenControllerTest.js']
                //src: ['tests/database/dbTest.js']
                //src: ['tests/database/mysql/dbTest.js']
                //src: ['tests/database/mysql/processors/orderItemProcessorTest.js']
                //src: ['tests/database/mysql/crud/mysqlCrudTest.js']
                src: ['tests/managers/imageManagerTest.js']
               // src: ['tests/managers/customerManagerTest.js']
                //src: ['tests/delegates/credentialsGrantDelegateTest.js']
                //src: ['tests/services/packageServiceTest.js']
                //src: ['tests/oauth2/oauth2Test.js']
                //src: ['tests/proxies/tokenValidationProxyTest.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.registerTask('mocha-test-all', 'mochaTest:test');
    grunt.registerTask('mocha-mysqlTest', 'mochaTest:testMysql');    
    grunt.registerTask('mocha-mysqlDbOnlyTest', 'mochaTest:testMysqlDbOnly');
    grunt.registerTask('mocha-DbOnlyTest', 'mochaTest:testDbOnly');
    grunt.registerTask('mocha-IndividualOnlyTest', 'mochaTest:testIndividualTestOnly');

};
