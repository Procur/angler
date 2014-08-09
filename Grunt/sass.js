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
      'dist/stylesheets/styles.min.css': 'dist/stylesheets/styles.css'
    }
  }
};