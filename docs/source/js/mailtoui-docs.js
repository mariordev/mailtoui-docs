/**
 * Set dark theme CSS class to show the custom styling example.
 */
function setDarkTheme() {
    var darkThemeLink = window.document.getElementById('email-dark');

    darkThemeLink.addEventListener(
        'click',
        function(event) {
            var darkThemeModal = window.document.getElementById('mailtoui-modal');

            darkThemeModal.classList.add('dark-theme');

            darkThemeModal.addEventListener(
                'close',
                function(event) {
                    darkThemeModal.classList.remove('dark-theme');
                },
                false
            );
        },
        false
    );
}

/**
 * Embed version number on docs page.
 */
function embedVersion() {
    const mailtouiPackageJson = require('../../../node_modules/mailtoui/package.json');

    window.document.getElementById('version').innerHTML = mailtouiPackageJson.version;
}

/**
 * Proceed only if the DOM is loaded and ready.
 *
 * @param  {Function}   fn  The function to be executed when DOM is ready.
 */
function domReady(fn) {
    document.addEventListener('DOMContentLoaded', fn);

    // Is the DOM ready now? If so, execute the given function.
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
}

/**
 * Run when DOM is ready.
 */
domReady(function() {
    const Vue = require('../../../node_modules/vue/dist/vue.js');
    const MailtoUI = require('../../../node_modules/mailtoui/dist/mailtoui-min.js');

    // MailtoUI.run();
    // embedVersion();
    // setDarkTheme();

    var app = new Vue({
        el: '#app',
        data: {
            emailSyntax: '{{ email }}',
            email: 'supergirl@example.com',
        },
        computed: {
            mailtoHref: function() {
                return 'mailto:' + this.email;
            },
        },
        mounted() {
            // MailtoUI.run({ autoClose: false });
            MailtoUI.run();
            embedVersion();
            setDarkTheme();
        },
    });
});
