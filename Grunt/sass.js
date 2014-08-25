module.exports = {
  my_procur_dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= pubCssPath %>/my_procur.css': '<%= cssPath %>/my_procur.scss'
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
      '<%= pubCssPath %>/main.css': '<%= cssPath %>/main.scss'
    }
  },
  main_dist: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= pubCssPath %>/main.min.css': '<%= pubCssPath %>/main.css'
    }
  }
};