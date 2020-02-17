var Generator  = require('yeoman-generator');
var yosay = require('yosay');
var validate = require('validate-npm-package-name');
var mkdirp = require('mkdirp');
var process = require('process');

module.exports = class extends Generator{

    prompting() {
        this.log(yosay('You are about to create a Sample NodeJs Application!'));
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your application name (Eg: my-application-name): ',
            default: 'nodeapp',
            validate: function (input) {
                if (!validate(input).validForNewPackages) {
                    return 'The name is not a valid npm package name. Please choose a valid name i.e. my-application-name';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'port',
            message: 'Development port of the application: ',
            default: '8080',
            validate: function (input) {
                var portNumber = +input;
                var portNumberValid = portNumber >= 1 && portNumber <= 65535;
                if (!portNumberValid) {
                    return 'This is not a valid HTTP port number. Please choose a valid port i.e. 4300';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'authorname',
            message: 'Author Name (Eg: Praveenkumar): ',
            default: 'author',
            validate: function (input) {
                var validName = /^(?! )((?!  )(?! $)[a-zA-Z0-9 ]){3,64}$/.test(input);
                if (!validName) {
                    return 'Not a valid author name.  Max length is 64 characters.  Trailing or Forward spaces not allowed.';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'version',
            message: 'Version: ',
            default: '0.1.0',
            validate: function (input) {
                var validVersion = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(\-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?(\+[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/.test(input);
                if (!validVersion) {
                    return 'This is not a valid version number.';
                }
                return true;
            }
        }]).then(answers => {
            this.props = answers;
            this.log('Creating application: ' + answers.name);
        });
    }

    writing() {
        this.log('Copying files...');
        mkdirp.sync(this.props.name);
        this.fs.copyTpl(this.templatePath(), this.destinationPath(this.props.name), {
            name: this.props.name,
            port: this.props.port,
            version: this.props.version,
            authorname: this.props.authorname
        });
    }

    install() {
        this.log('Installing dependencies...');
        process.chdir(this.props.name);
        this.npmInstall();
    }

    end() {
        this.log('NodeJs application ' + this.props.name + ' creeated');
        this.log('Source code is located under .\\src.');
        this.log('To run the application: \n cd ' + this.props.name + '\nnpm start');
        this.log('Open browser and hit: http://localhost:' + this.props.port + '/');
        this.log('Open browser and hit: http://localhost:' + this.props.port + '/image/logo.png');
        this.log('Enjoy coding!!!');
    }
};