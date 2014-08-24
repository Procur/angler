module.exports = {
  my_procur_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= cssPath %>/my_procur.css': '<%= cssPath %>/my_procur.scss'
    }
  },
  my_procur_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      'public/stylesheets/my_procur.min.css': 'public/stylesheets/my_procur.css'
    }
  },
  main_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= cssPath %>/main.css': '<%= cssPath %>/main.scss'
    }
  },
  main_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      'public/stylesheets/main.min.css': 'public/stylesheets/main.css'
    }
  }
};