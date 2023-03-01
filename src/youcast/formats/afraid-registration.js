/**
 * Special plugin to register the current url at an afraid.org subdomain
 * 
 * @param {*} messageChannel 
 * @listens api
 */
module.exports = function Api(messageChannel) {
    this.name = 'afraid-registration';
    this.shortcode = 'afraid-registration';

   if(process.env.AFRAID_REGISTRATION_URL && fetch){
        fetch(process.env.AFRAID_REGISTRATION_URL);
        console.log('Server IP regiserted with afraid subdomain');
   }
}