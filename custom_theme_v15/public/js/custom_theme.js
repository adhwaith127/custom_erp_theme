// simple custom theme JS for toggling variants and exposing an API
(function(){
  window.customTheme = {
    setVariant: function(variant){
      // variants: 'light' (default), 'dark', 'compact', combinations like 'dark compact'
      document.body.classList.remove('theme-variant-dark','theme-variant-compact');
      if(!variant) return;
      variant.split(/\s+/).forEach(function(v){
        if(v === 'dark') document.body.classList.add('theme-variant-dark');
        if(v === 'compact') document.body.classList.add('theme-variant-compact');
      });
    },
    toggleDark: function(){
      document.body.classList.toggle('theme-variant-dark');
    },
    toggleCompact: function(){
      document.body.classList.toggle('theme-variant-compact');
    }
  };

  // try to read a saved preference from localStorage
  try {
    var pref = localStorage.getItem('custom_theme_variant');
    if(pref) window.customTheme.setVariant(pref);
  } catch(e){/* ignore */}
})();
