module.exports = {
  my_procur_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= pubCssPath %>/my_procur.css': '<%= cssPath %>/my_procur/my_procur.scss'
    }
  },
  my_procur_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= pubCssPath %>/my_procur.min.css': '<%= pubCssPath %>/my_procur.css'
    }
  },
  main_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= pubCssPath %>/main.css': '<%= cssPath %>/main/main.scss'
    }
  },
  main_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= pubCssPath %>/main.min.css': '<%= pubCssPath %>/main.css'
    }
  },
  auth_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= pubCssPath %>/auth.css': '<%= cssPath %>/auth/auth.scss'
    }
  },
  auth_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= pubCssPath %>/auth.min.css': '<%= pubCssPath %>/auth.css'
    }
  },
  registration_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= pubCssPath %>/registration.css': '<%= cssPath %>/registration/registration.scss'
    }
  },
  registration_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= pubCssPath %>/registration.min.css': '<%= pubCssPath %>/registration.css'
    }
  }
};