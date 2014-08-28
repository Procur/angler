var
  express = require('express'),
  router = express.Router(),
  formHelper = require('../../helpers/form_helper'),
  nodemailer = require('nodemailer'),
  smtpTransport;

smtpTransport = nodemailer.createTransport({
  service: 'Mandrill',
  auth: {
    user: process.env.MANDRILL_USERNAME || 'app25459603@heroku.com',
    pass: process.env.MANDRILL_APIKEY || '_tko3ueulFUKJ4Grtv9cmQ'
  }
});

router.get('/', getIndex);
router.get('/earlyaccess', getEarlyAccess);
router.get('/features', getFeatures);
router.get('/pricing', getPricing);
router.get('/faq', getFaq);
router.get('/privacy', getPrivacy);
router.get('/termsofservice', getTermsOfService);
router.get('/support', getSupport);
router.get('/contact', getContact);
router.post('/contact', formHelper, postContact);
router.post('/contact/subscribe', formHelper, postSubscribe);
router.get('/thankyou', getThankYou);
router.get('/about', getAbout);

module.exports = router;

function getEarlyAccess(req, res) {
  res.render('main/early_access', { title: 'Wholesale Selling and Sourcing Platform | Procur' });
}

function getIndex(req, res) {
  res.render('main/index', { title: 'B2B Wholesale Marketplace & Platform | Procur' });
}

function getFeatures(req, res) {
  res.render('main/features', { title: 'B2B Sales Solutions for Global Commerce | Procur' });
}

function getPricing(req, res) {
  res.render('main/pricing');
}

function getFaq(req, res) {
  res.render('main/faq');
}

function getPrivacy(req, res) {
  res.render('main/privacy');
}

function getTermsOfService(req, res) {
  res.render('main/terms_of_service');
}

function getSupport(req, res) {
  res.render('main/support');
}

function getContact(req, res) {
  res.render('main/contact');
}

function postContact(req, res) {
  var
    htmlContent,
    textContent,
    mailOptions;

  htmlContent = 'Primary subject: ' +
                (req.formData.subject || '') +
                '<br>' +
                'Secondary subject: ' +
                (req.formData.subSubject || '') +
                '<br>' +
                'Message: ' +
                req.formData.message;
  textContent = htmlContent.replace('<br>', '; ', 'g');
  mailOptions = {
    from: req.formData.email,
    to: 'info@procur.com',
    subject: 'Contact form submission',
    text: textContent,
    html: htmlContent
  };

  smtpTransport.sendMail(mailOptions, onSendMail);

  function onSendMail(err, response) {
    if(err) {
      res.send(500, 'There was an error processing your request. Please try again');
    }
    else {
      res.send(200, { message: 'Message sent! We\'ll get back to you as soon as possible.' });
    }
  }
}

function postSubscribe(req, res) {
  // TODO: subscribe the user to the newsletter via Pardot
  res.send(200, { message: 'Thank you! Please check your inbox for confirmation.' });
}

function getThankYou(req, res) {
  res.render('main/thank_you');
}

function getAbout(req, res) {
  res.render('main/about', { title: 'Product Platform for Responsible Sourcing | Procur' });
}
