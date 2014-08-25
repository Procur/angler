var
  express = require('express'),
  router = express.Router();

router.get('/', function index(req, res) {
  res.render('main/index', { title: 'B2B Wholesale Marketplace & Platform | Procur' });
});

router.get('/earlyaccess', function earlyAccess(req, res) {
  res.render('main/early_access', { title: 'Wholesale Selling and Sourcing Platform | Procur' });
});

router.get('/features', function features(req, res) {
  res.render('main/features', { title: 'B2B Sales Solutions for Global Commerce | Procur' });
});

router.get('/pricing', function pricing(req, res) {
  res.render('main/pricing');
});

router.get('/faq', function faq(req, res) {
  res.render('main/faq');
});

router.get('/privacy', function privacy(req, res) {
  res.render('main/privacy');
});

router.get('/termsofservice', function termsOfService(req, res) {
  res.render('main/terms_of_service');
});

router.get('/support', function support(req, res) {
  res.render('main/support');
});

router.get('/contact', function contact(req, res) {
  res.render('main/contact');
});

router.get('/thankyou', function thankYou(req, res) {
  res.render('main/thank_you');
});

router.get('/about', function about(req, res) {
  res.render('main/about', { title: 'Product Platform for Responsible Sourcing | Procur' });
});

module.exports = router;
