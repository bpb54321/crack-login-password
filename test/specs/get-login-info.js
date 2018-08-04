const urls = require('./../../login-config').urls;
const username_options = require('./../../login-config').username_options;
const password_options = require('./../../login-config').password_options;


// The login info combintations that this script will figure out for each site
// In CSV format, with column 0: url, column 1: username, column 2: password
let login_info = '';

describe('Login info getter', function() {
  it('should get the login info of a given website', function() {
    for (const site_url of urls) {
      let login_url = site_url + 'admin/users/login';
      browser.url(login_url);

      let $username_input;
      let $password_input;
      let $submit_button;

      // Save the url of page that results from submitting the login form
      let url_after_submitting_login_form = '';

      let successfully_logged_in = false;

      for (const username of username_options) {
        for (const password of password_options) {
          // Get fresh handles each time because of page refresh
          $username_input = $('#username');
          $password_input = $('#password');
          $submit_button = $('#submit');

          // Change values and resubmit form
          $username_input.setValue(username);
          $password_input.setValue(password);
          $submit_button.click();

          // Check whether successfully logged in
          url_after_submitting_login_form = browser.getUrl();
          successfully_logged_in = (url_after_submitting_login_form !== login_url);
          if (successfully_logged_in)  {
            break;
          }
        }
        if (successfully_logged_in) {
          break;
        }
      }

      if (successfully_logged_in) {
        login_info.push(`${site_url}, ${username}, ${password}\n`);
      }
    }
  });
});