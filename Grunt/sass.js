module.exports = {
  dev: {
    options: {
      style: 'expanded'
    },
    files: {
      '<%= cssPath %>/styles.css': '<%= cssPath %>/styles.scss'
    }
  },
  dist: {
    options: {
      style: 'compressed'
    },
    files: {
      'public/stylesheets/styles.min.css': 'public/stylesheets/styles.css'
    }
  }
};