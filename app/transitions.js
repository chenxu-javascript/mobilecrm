export default function() {
  function higher(newval, oldval) {
    return newval && newval > oldval;
  }
  function lower(newval, oldval) {
    return newval && newval < oldval;
  }
  function higherVal(newval, oldval) {
    return newval.val && newval.val > oldval.val;
  }
  function lowerVal(newval, oldval) {
    return newval.val && newval.val < oldval.val;
  }

  function higherIndex(newval, oldval) {
    return newval && oldval && newval > oldval;
  }
  function lowerIndex(newval, oldval) {
    return newval && oldval && newval < oldval;
  }
  var duration = 200;
  this.setDefault({
    duration: 250,
    easing: 'easeOutCubic'
  });
  this.transition(
    this.hasClass('lf-number-container'),
    this.toValue(higherIndex),
    this.use('toLeft', { duration })
  );
  this.transition(
    this.hasClass('lf-number-container'),
    this.toValue(lowerIndex),
    this.use('toRight')
  );
}
