(function(angular) {

  var
    dependencies = [],
    definitions = [contactFormSubjectDirective];

  angular.module('pc.ContactForm', dependencies)
    .directive('pcContactSubjects', definitions);

  function contactFormSubjectDirective() {

    return {
      restrict: 'A',
      scope: false,
      link: link
    };

    function link(scope, elem, attrs) {
      var
        reasons = {
          'Help & Support': ['Trouble Registering','Trouble Logging In','Error Screen Displayed','Other Problems'],
          'Partnerships': ['General Information','Initiatives','Philanthropy','Other'],
          'Press & Media': ['Professional Contact','Blog/Social Media','Materials','Advertising','Other'],
          'Feedback': ['General','New Feature Request','Issues','Other'],
          'General Inquiries': ['Investment','Membership','Platform/Website','Company','Careers','Other']
        };

      scope.$watch('fields.subject', onParentSelect);

      function onParentSelect(newVal, oldVal) {
        if (newVal && reasons[newVal]) {
          scope.subSubjectOptions = reasons[newVal];
          elem.children()[0].innerHTML = 'Please select a more detailed category:';
          elem.removeAttr('disabled');
        }
      }
    }
  }

})(angular);