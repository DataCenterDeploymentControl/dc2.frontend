function Capitalize() {
  return function(input, all) {
    if (typeof(input) === 'string') {
      return input.charAt(0).toUpperCase() + input.substring(1).toLowerCase();
    }
  }
}

dc2Filters.filter('capitalize', [Capitalize]);
